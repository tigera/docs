# Agent instructions

This file is for AI coding agents working in this repository.
For the build, the product directories, and other repository conventions, read [.github/copilot-instructions.md](.github/copilot-instructions.md).
For writing conventions, such as placeholders, admonitions, headings, and the word list, follow the [style guide](contributors/style-guide.md).

## Writing a new page

Follow this section only when you create a new documentation page: a new `.md` or `.mdx` file under `calico/`, `calico-enterprise/`, `calico-cloud/`, or `use-cases/`.

It doesn't apply when you:

- Edit, correct, or add to an existing page.
- Copy an existing page to another product or version.
- Move or rename a page.
- Create a partial, such as a file whose name starts with `_`.

In those cases, keep the page's existing title, headings, and structure.
Don't restructure an existing page to fit a content type unless the person asks you to.

### Choose a content type

Every new page has one content type, chosen for what the reader is trying to do.
Read [content-types.md](contributors/content-types/content-types.md) and choose a type from the ones it defines.
If the request covers more than one type, such as steps plus a long explanation of how a feature works, suggest separate pages and ask before you write them.
If you can't tell which type fits, ask.

### Start from the template

Copy the template for that type from [contributors/content-types/templates/](contributors/content-types/templates/), and fill it in.

- Keep every section marked REQUIRED.
  Include RECOMMENDED sections unless there's nothing to say, and OPTIONAL sections only when they help the reader.
- Follow the guidance in each comment, then delete the comment.
  You can keep the user story comment.
- Keep the `content_type` value that the template sets in the front matter.
- Check the page against the reviewer checklist at the end of the template, then delete the checklist.

When you finish, tell the person which content type you used and why.
