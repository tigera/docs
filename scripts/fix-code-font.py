#!/usr/bin/env python3
"""
Parse vale-lint-report.md for terms marked 'Code font', then wrap them
in backticks across all listed files. Also wraps sibling identifier-like
values in the same table column when a flagged term is found.

Usage:
    python3 scripts/fix-code-font.py [--dry-run] [--verbose]
"""

import re
import sys
import os
from collections import defaultdict
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
REPORT = REPO_ROOT / "vale-lint-report.md"

# Regex to identify bare identifiers (camelCase, snake_case, dotted.names, etc.)
IDENTIFIER_RE = re.compile(r'^[a-zA-Z_][a-zA-Z0-9_.\-]*$')

# Patterns we never wrap
IMAGE_ALT_RE = re.compile(r'!\[([^\]]*)\]\([^)]*\)')
INLINE_CODE_RE = re.compile(r'`[^`]+`')
LINK_RE = re.compile(r'\[([^\]]*)\]\([^)]*\)')


def parse_report(report_path):
    """Parse the report and return {term: [file_paths]} for Code font entries."""
    text = report_path.read_text()

    # Split into entries by ### headers
    entries = re.split(r'(?=(?:🟢|🟡|🔴)\s*###\s)', text)

    term_files = {}

    for entry in entries:
        # Extract term from header
        header_match = re.search(r'###\s+\d+\.\s+`([^`]+)`', entry)
        if not header_match:
            continue
        term = header_match.group(1)

        # Check if Code font is selected
        if not re.search(r'\[x\s*\]\s+\*\*Code font\*\*', entry):
            continue

        # Extract file paths from details block
        files = []
        details_match = re.search(r'<details>.*?</details>', entry, re.DOTALL)
        if details_match:
            details = details_match.group()
            # Match file paths (with or without line numbers)
            for m in re.finditer(r'- `([^`]+\.mdx)(?::\d+)?`', details):
                files.append(m.group(1))

        if files:
            term_files[term] = list(dict.fromkeys(files))  # dedupe preserving order

    return term_files


def invert_mapping(term_files):
    """Convert {term: [files]} to {file: [terms]}."""
    file_terms = defaultdict(set)
    for term, files in term_files.items():
        for f in files:
            file_terms[f].add(term)
    return file_terms


def protect_zones(line):
    """Find character ranges to protect (image alts, inline code, link text URLs)."""
    protected = []
    # Protect inline code
    for m in INLINE_CODE_RE.finditer(line):
        protected.append((m.start(), m.end()))
    # Protect image alt text
    for m in IMAGE_ALT_RE.finditer(line):
        protected.append((m.start(), m.end()))
    return protected


def is_protected(pos, end, protected):
    """Check if a position falls within a protected zone."""
    for pstart, pend in protected:
        if pos >= pstart and end <= pend:
            return True
        if pos < pend and end > pstart:  # overlapping
            return True
    return False


def wrap_term_in_line(line, term, protected):
    """Wrap a term in backticks in a prose line, respecting protected zones."""
    result = []
    last_end = 0
    # Word boundary match for the term
    pattern = re.compile(r'(?<![`\w])' + re.escape(term) + r'(?![`\w])')

    for m in pattern.finditer(line):
        if is_protected(m.start(), m.end(), protected):
            continue
        # Check if already wrapped in backticks (adjacent backticks)
        before = line[max(0, m.start()-1):m.start()]
        after = line[m.end():m.end()+1]
        if before == '`' or after == '`':
            continue
        result.append(line[last_end:m.start()])
        result.append(f'`{term}`')
        last_end = m.end()

    if not result:
        return line
    result.append(line[last_end:])
    return ''.join(result)


def parse_table_row(line):
    """Split a markdown table row into cells."""
    if not line.strip().startswith('|'):
        return None
    # Split by | but handle escaped pipes
    cells = line.split('|')
    # First and last are empty (before first | and after last |)
    if len(cells) >= 3:
        return cells[1:-1]  # interior cells
    return None


def is_separator_row(line):
    """Check if a line is a table separator (| --- | --- |)."""
    return bool(re.match(r'^\s*\|[\s\-:|]+\|\s*$', line))


def process_table(table_lines, terms, protected_by_line=None):
    """Process a table block, wrapping flagged terms and their sibling identifiers."""
    if len(table_lines) < 2:
        return table_lines

    # Parse rows into cells
    parsed = []
    for line in table_lines:
        cells = parse_table_row(line)
        if cells is not None:
            parsed.append(cells)
        else:
            parsed.append(None)

    # Find separator row index
    sep_idx = None
    for i, line in enumerate(table_lines):
        if is_separator_row(line):
            sep_idx = i
            break

    if sep_idx is None or len(parsed) < 3:
        # Not a proper table, just do term replacement on each line
        result = []
        for line in table_lines:
            protected = protect_zones(line)
            for term in terms:
                line = wrap_term_in_line(line, term, protected)
                protected = protect_zones(line)  # recalc after changes
            result.append(line)
        return result

    # Determine number of columns
    ncols = min(len(row) for row in parsed if row is not None)

    # For each column, check if any data cell contains a flagged term
    cols_with_flagged = set()
    for col_idx in range(ncols):
        for row_idx, row in enumerate(parsed):
            if row is None or row_idx == sep_idx:
                continue
            if row_idx == 0:  # header row - skip for flagging detection but we'll still process it
                continue
            cell = row[col_idx].strip()
            # Strip existing formatting
            bare = re.sub(r'[`*\[\]()]', '', cell).strip()
            if bare in terms:
                cols_with_flagged.add(col_idx)

    # Now process each row
    result_lines = []
    for row_idx, line in enumerate(table_lines):
        if is_separator_row(line) or parsed[row_idx] is None:
            result_lines.append(line)
            continue

        cells = parsed[row_idx]
        new_cells = []
        for col_idx, cell in enumerate(cells):
            stripped = cell.strip()
            bare = re.sub(r'`([^`]*)`', r'\1', stripped)  # remove existing backticks for comparison

            if col_idx in cols_with_flagged and row_idx != 0:
                # This column has flagged terms - wrap bare identifiers
                if (IDENTIFIER_RE.match(bare) and
                    '`' not in stripped and
                    not stripped.startswith('*') and
                    len(bare) > 1):
                    # Wrap in backticks, preserving surrounding whitespace
                    leading = len(cell) - len(cell.lstrip())
                    trailing = len(cell) - len(cell.rstrip())
                    ws_before = cell[:leading] if leading else ' '
                    ws_after = cell[len(cell)-trailing:] if trailing else ' '
                    cell = f'{ws_before}`{bare}`{ws_after}'

            # Also do normal term replacement for all columns
            protected = protect_zones(cell)
            for term in terms:
                cell = wrap_term_in_line(cell, term, protected)
                protected = protect_zones(cell)

            new_cells.append(cell)

        result_lines.append('|' + '|'.join(new_cells) + '|')

    return result_lines


def process_file(filepath, terms, dry_run=False, verbose=False):
    """Process a single file, wrapping terms in backticks."""
    full_path = REPO_ROOT / filepath
    if not full_path.exists():
        if verbose:
            print(f"  SKIP (not found): {filepath}")
        return False

    content = full_path.read_text()
    lines = content.split('\n')

    in_code_fence = False
    in_jsx_block = False
    table_buffer = []
    result = []
    changed = False

    def flush_table():
        nonlocal changed
        if not table_buffer:
            return
        processed = process_table(table_buffer, terms)
        for orig, new in zip(table_buffer, processed):
            if orig != new:
                changed = True
        result.extend(processed)
        table_buffer.clear()

    for line in lines:
        stripped = line.strip()

        # Track code fences
        if stripped.startswith('```'):
            flush_table()
            in_code_fence = not in_code_fence
            result.append(line)
            continue

        if in_code_fence:
            result.append(line)
            continue

        # Track JSX blocks (like <Tabs>, <TabItem>, imports)
        # We still process content inside these, just skip import lines
        if stripped.startswith('import '):
            flush_table()
            result.append(line)
            continue

        # Table detection
        if stripped.startswith('|'):
            table_buffer.append(line)
            continue
        else:
            flush_table()

        # Prose line - wrap terms
        protected = protect_zones(line)
        new_line = line
        for term in terms:
            new_line = wrap_term_in_line(new_line, term, protected)
            protected = protect_zones(new_line)

        if new_line != line:
            changed = True
        result.append(new_line)

    # Flush any remaining table
    flush_table()

    if changed:
        new_content = '\n'.join(result)
        if not dry_run:
            full_path.write_text(new_content)
        if verbose:
            print(f"  MODIFIED: {filepath}")
        return True
    else:
        if verbose:
            print(f"  unchanged: {filepath}")
        return False


def main():
    dry_run = '--dry-run' in sys.argv
    verbose = '--verbose' in sys.argv or '-v' in sys.argv

    if dry_run:
        print("DRY RUN — no files will be modified\n")

    print("Parsing report...")
    term_files = parse_report(REPORT)
    print(f"Found {len(term_files)} terms marked for code font")

    file_terms = invert_mapping(term_files)
    print(f"Affecting {len(file_terms)} unique files\n")

    modified = 0
    skipped = 0

    for filepath in sorted(file_terms.keys()):
        terms = file_terms[filepath]
        if verbose:
            print(f"Processing {filepath} ({len(terms)} terms)...")
        if process_file(filepath, terms, dry_run=dry_run, verbose=verbose):
            modified += 1
        else:
            skipped += 1

    print(f"\nDone. Modified: {modified}, Unchanged: {skipped}")
    if dry_run:
        print("(dry run — no files were actually changed)")


if __name__ == '__main__':
    main()
