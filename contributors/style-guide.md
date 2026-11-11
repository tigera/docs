# Style guide

Writing conventions for Tigera documentation, published at <https://docs.tigera.io>.

## How to use this guide

We use these references, in this order:

1. **This guide.** Our house style.
2. **[Google developer documentation style guide](https://developers.google.com/style).** Most answers are here. Start with the [highlights](https://developers.google.com/style/highlights) and the [word list](https://developers.google.com/style/word-list).
3. **The Chicago Manual of Style, 17th edition.** Usage questions that neither guide answers.

For spelling, use [Merriam-Webster](https://www.merriam-webster.com/).
For Kubernetes terms, use the [Kubernetes documentation style guide](https://kubernetes.io/docs/contribute/style/style-guide/).

Google's own guide also lists the Microsoft Writing Style Guide as a fallback.
We don't use it.

These are guidelines, not laws.
Depart from them when that makes a page clearer, and stay consistent within the page.

To change this guide, open a pull request.
When you add a word-list entry, add the matching Vale rule or vocabulary line in the same pull request, so the guide and the linter agree.

## The short version

If you read nothing else, follow these rules.
The sections below explain the house rules in full.

**Voice**

- Write to the reader as *you*. Don't use *we* to mean the reader. <!-- Google: https://developers.google.com/style/person -->
- Prefer the active voice. The passive is fine when the actor doesn't matter or the object is the point: "The pod is deleted after 30 seconds." <!-- Google: https://developers.google.com/style/voice -->
- Use the present tense. Use the future only for something that really happens later: "The node will be drained the next time the upgrade runs." <!-- Google: https://developers.google.com/style/tense -->
- Be conversational, not frivolous. Contractions are fine. <!-- Google: https://developers.google.com/style/tone and https://developers.google.com/style/contractions -->
- Don't use *please*, *simply*, *easily*, *just*, or *via*. <!-- Google: https://developers.google.com/style/word-list -->
- Don't use *e.g.*, *i.e.*, or *etc.* Write *for example* or *that is*, and end a list with a complete example. <!-- Google: https://developers.google.com/style/word-list -->
- Don't announce future features. <!-- Google: https://developers.google.com/style/future -->

**Grammar**

- Use American spelling. <!-- Google: https://developers.google.com/style/word-list -->
- Use the serial comma. <!-- Google: https://developers.google.com/style/commas -->
- Put the condition before the instruction: "If the node is running, restart it." <!-- Google: https://developers.google.com/style/sentence-structure -->
- Spell out an abbreviation the first time you use it on a page. <!-- Google: https://developers.google.com/style/abbreviations -->

**Headings and titles**

- Use sentence case for every title and heading. <!-- Google: https://developers.google.com/style/capitalization -->
- Start a task heading with a bare verb: "Configure BGP peering", not "Configuring BGP peering". <!-- Google: https://developers.google.com/style/headings -->
- Use a noun phrase for a concept heading: "Host endpoints", not "Understanding host endpoints". <!-- Google: https://developers.google.com/style/headings -->
- Pick the title pattern for the page's content type. See [Page structure](#page-structure).

**Formatting**

- Put UI labels in bold: click **Connect Cluster**. <!-- Google: https://developers.google.com/style/ui-elements -->
- Put filenames, commands, flags, field names, and values in code font. <!-- Google: https://developers.google.com/style/code-in-text -->
- Use italics for a term you're defining and for emphasis. Don't use bold for emphasis. <!-- Google: https://developers.google.com/style/text-formatting -->
- Write link text that says where the link goes. Never *here* or *this page*. <!-- Google: https://developers.google.com/style/cross-references -->
- Use a numbered list for steps, a bulleted list for everything else. <!-- Google: https://developers.google.com/style/lists -->
- Give every image alt text. <!-- Google: https://developers.google.com/style/images -->

**Code and commands**

- Write placeholders as `<lowercase-hyphenated>` and explain each one. See [Placeholders](#placeholders).
- Don't show a shell prompt. Put output in its own block. See [Commands and output](#commands-and-output).
- Use `$[prodname]` and the other variables in body text. See [Variables and partials](#variables-and-partials).
- Write ventilated prose: one sentence per line in the source. See [Source formatting](#source-formatting).

**Admonitions**

- Use `:::note`, `:::tip`, `:::caution`, and `:::warning`, and only when the body text can't do the job. Never two in a row. See [Admonitions](#admonitions).
- Never write a tech preview or deprecation notice by hand. See [Feature lifecycle wording](#feature-lifecycle-wording).

## Where we differ from Google

Everything not in this table follows Google.
If you find a conflict that isn't here, this guide is wrong or incomplete, so fix it.

| Topic | Google says | We say | Why |
|---|---|---|---|
| [Placeholders](https://developers.google.com/style/placeholders) | `UPPER_SNAKE`, no brackets | `<lowercase-hyphenated>`, in angle brackets | Our docs are full of real environment variables such as `FELIX_LOGSEVERITYSCREEN`. Brackets make a placeholder unmistakable, and the form matches kubectl and Helm documentation. |
| [Shell prompt](https://developers.google.com/style/code-syntax) | `$` is optional for one line and required for several | Never show a prompt | Commands must paste cleanly. |
| [Closing section](https://developers.google.com/style/procedures) | "What's next" | "Next steps", then "Additional resources" | Set by the [templates](content-types/templates/). |
| [Numbered headings](https://developers.google.com/style/headings) | Don't number headings | Tutorials use "Step 1: Verb object" | Learners need to know how far they are. Set by the [tutorial template](content-types/templates/tutorial.mdx). |
| [Notices](https://developers.google.com/style/notices) | Note, Caution, Warning, Success | Docusaurus `note`, `tip`, `caution`, `warning` | Docusaurus has no Success type, and `tip` is useful for optional shortcuts. |
| [Product names](https://developers.google.com/style/product-names) | Write the name | `$[prodname]` in body text | Pages are shared across three products. |
| [Kubernetes API kinds](https://developers.google.com/style/product-names) | Follow the project's capitalization | UpperCamelCase for the kind, lowercase for the generic noun, no code font | The Kubernetes style guide rule, stated once so nobody re-derives it. |
| [Prerequisites](https://developers.google.com/style/procedures) | "Before you begin" | "Before you begin", and leave out obvious prerequisites | Nobody needs to be told they need a cluster. |
| Source line wrapping | Not covered | Ventilated prose: one sentence per line | Reviewable diffs. |
| Third-party fallback | Microsoft Writing Style Guide | Not used | One technical guide is enough. |

Some things look like exceptions but aren't.
Sentence-case headings, imperative task titles, the serial comma, American spelling, bold UI labels, and descriptive link text are all plain Google style.
So is avoiding *e.g.*, *via*, and *please*, and so is using contractions.
The older pages that break these rules are drift, not policy.

## Page structure

Every page has one content type, and the type decides the title pattern and the sections.
Read [Content types](content-types/content-types.md) and start a new page from its [template](content-types/templates/).

| Content type | Title pattern |
|---|---|
| How-to guide | Verb and object: "Configure BGP peering" |
| Installation guide | "Install $[prodname] on [platform]" |
| Tutorial | What the reader builds, with no "Tutorial:" prefix |
| Explanation | "About [topic]", or a noun phrase |
| Reference | The name of the thing, as it appears in the product |
| Troubleshooting | "Troubleshoot [feature or area]" |

Use these section names, and no others for the same job:

- **Before you begin**, never "Prerequisites". List only what the reader can't guess.
- **Verify** or **Verify the installation**, for the check at the end of a procedure.
- **Troubleshooting**, for problems that happen only while following the page.
- **Next steps**, for one to three links to what the reader does next.
- **Additional resources**, for related reading.

Give every section a line or two under its heading that says what it covers.
Don't leave a heading followed directly by another heading.

Number the steps when a procedure has two or more.
Write a single step as a sentence.
Put the condition first: "If the value isn't `Multus`, set it."
One action per step.
When a procedure passes about ten steps, split it or consider a tutorial.

Don't restructure an existing page to fit a template unless that's the task.
Copy the structure when you copy a page to another product.

## Source formatting

Write ventilated prose: one sentence per line.

The main reason is review.
A diff then shows the sentence that changed, not the whole paragraph.
Ventilated prose is harder to read in the source.
That's an acceptable trade-off, because we don't publish the source.
These files aren't a collection of README files.
The reader sees the rendered page, where line breaks inside a paragraph don't show.

The rule applies to prose and to list items.
Leave fenced code blocks, table rows, headings, and `:::` markers alone.

Don't reflow paragraphs you didn't write.
A pull request that changes the line breaks in an unrelated paragraph is hard to review.
When you edit an existing page, apply the rule to the lines you add or change.

Prettier formats JSX and JavaScript in this repository: single quotes, two-space indent, 120-character lines.
It doesn't run on Markdown prose.

MDX comments look like `{/* ... */}`.
A page can carry a user-story comment between the front matter and the H1.
That comment can stay.

## Variables and partials

The build replaces `$[name]` tokens with values from the product's `variables.js`.
Use them in body text so that one page can serve several products and versions.

| Use | Variable |
|---|---|
| Product name | `$[prodname]` |
| Product name for Windows | `$[prodnameWindows]` |
| Release version | `$[version]` |
| Container image registry | `$[registry]` |
| The node container | `$[nodecontainer]` |
| Manifest and tutorial file URLs | `$[manifestsUrl]`, `$[filesUrl]`, `$[tutorialFilesURL]` |

The full list is in `calico/variables.js`, `calico-enterprise/variables.js`, and `calico-cloud/variables.js`.

Spell the product name out, with no variable, in these places:

- Front matter. The `description` and `title` fields are read by search engines and by the build before variables are replaced.
- Lifecycle front matter, such as `lifecycle_feature`.
- Any text that's copied out of the docs, such as a link title shared in Slack.

Don't repeat the product name in every sentence.
Once the page has said what it's about, say *it*.

Shared text lives in partials under `_includes/`, and shared components are registered in `src/theme/MDXComponents.js`.
Use a partial when three or more pages need the same paragraph.
Don't use one to hide a paragraph that only one page needs.

## Placeholders

A placeholder stands in for a value the reader supplies.
Write it in lowercase with hyphens, inside angle brackets, in code font: `<cluster-name>`, `<node-name>`, `<namespace>`.

- Make the name say what the value is. Never `<xxx>`, `<value>`, or `<string>`.
- Don't put *your* or *my* in the name. `<api-key>`, not `<your-api-key>`.
- Don't use `$VARIABLE`, `{name}`, or `UPPER_SNAKE` for a placeholder. Those forms mean a real shell variable or environment variable in our docs.
- Don't write `INSERT_VALUE_HERE` or any other instruction inside the brackets.
- Keep the brackets inside the code font: `<cluster-name>`, not <`cluster-name`>.

Explain every placeholder the first time it appears on the page.

For one placeholder, say what it is in the sentence that introduces the command:

> Replace `<node-name>` with the name of the node you want to inspect.

For two or more, list them after the command:

````markdown
```bash
kubectl get pod <pod-name> -n <namespace> -o yaml
```

Replace the following:

- `<pod-name>`: the name of the pod to inspect.
- `<namespace>`: the namespace the pod runs in, such as `calico-system`.
````

In a long page, repeat the explanation when the same placeholder reappears far from its first use.

Placeholders that appear in output follow the same rule.
Introduce them with "This output includes the following values:".

## Commands and output

Don't show a shell prompt.
Readers copy commands, and a `$` breaks the paste.

```bash
kubectl get pods -n calico-system
```

Put output in its own code block, after a sentence that says what it is:

> The output is similar to the following:

When output is long, show the lines that matter and put `...` on its own line for the rest.
Show output only when the reader needs it to copy a value or to check their work.

Break a long command before an option, with a space and a backslash at the end of the line, and indent the continuation by four spaces.

```bash
kubectl patch installation default --type=merge \
    -p '{"spec":{"calicoNetwork":{"bgp":"Disabled"}}}'
```

Use `bash` as the language for shell commands and `yaml` for manifests.
Use the `title` attribute when the reader is meant to save the block as a file: ```` ```yaml title="bgp-peer.yaml" ````.

For commands that the reader runs as a step, write the step first, then the command, then any output:

> 1. Check that all nodes are ready:
>
>    ```bash
>    kubectl get nodes
>    ```

## Admonitions

Use an admonition only when the body text can't do the job.
If you can say it another way, you probably should.

Use the Docusaurus admonition types this way:

| Type | Use it for |
|---|---|
| `:::note` | Something relevant that the reader doesn't need right now |
| `:::tip` | A shortcut or a better way that's optional |
| `:::caution` | An action that can go wrong in a way the reader can recover from |
| `:::warning` | An action that can lose data or break a cluster, or a deprecation |

Don't use `:::info`, `:::important`, or `:::danger`.
The one exception is the release status notice at the top of release notes, which the [release notes template](../calico-enterprise/release-notes/_template.mdx) sets.

Give an admonition a title when the type alone doesn't say what it's about.
Write the title in sentence case, in square brackets, with no period:

```markdown
:::caution[VXLAN port conflict]

Text.

:::
```

Put a blank line after the opening marker and before the closing one.

Never put two admonitions back to back.
Two in a row is a sign that the content belongs in the body text.
Don't put a prerequisite, a step, or an expected result in an admonition.
Those belong in the flow of the page.

## Product and company names

| Name | Use |
|---|---|
| Calico | The project and the open source product, when the context makes clear which. |
| Calico Open Source | The open source product when it stands beside the other two. |
| Calico Enterprise | The self-managed commercial product. |
| Calico Cloud | The SaaS product. |
| Tigera Lynx | The governance platform for AI agents. *Lynx* after the first mention. Its docs are at <https://docs.tigera.io/lynx/>, in another repository, and follow this guide. |
| Tigera | The company. Not the product. |
| Tigera Operator | The operator. Say "the Tigera Operator". |

Don't put *the* before a product name: "Calico Enterprise supports", not "the Calico Enterprise supports".
Do put *the* before a tool or component name: "the Tigera Operator", "the calicoctl CLI", "the web console".

Don't use a product name as a verb.
Feature names are lowercase unless the web console capitalizes them, and then only when you name the UI element.

In front matter and in text that's copied out of the docs, write the full product name, not *Calico*.

## Kubernetes and Calico terms

When you name an API kind, use its UpperCamelCase name, without code font: a NetworkPolicy, the ConfigMap, an IPPool, a BGPPeer.
When you mean the thing in general, use the lowercase noun: pods, nodes, namespaces, services.

> Every pod in the namespace gets an IP address from the IPPool.

Put the names of fields, values, labels, and specific resources in code font: `spec.cidr`, `Disabled`, `k8s-app`, the `default` IPPool.

Component and tool names are lowercase and stay that way, even at the start of a sentence: calicoctl, kubectl, kube-proxy, etcd, containerd.
Reword a sentence rather than start it with one.
Use code font for the tool when you mean the command you type, and plain text when you mean the tool: "Install calicoctl, then run `calicoctl get ippools`."

Component names that are proper nouns keep their capitals: Felix, Typha, Dikastes, Goldmane, Voltron, Whisker.
The Vale vocabulary files hold the current list.

Write *Kubernetes*, never *k8s*, except in labels and names where it appears literally.

## Front matter

Front matter fields, in this order:

```yaml
---
description: One sentence of 130 to 160 characters with the full product name.
title: Only when the H1 is longer than about 40 characters.
sidebar_label: Rarely. Only when the sidebar needs a shorter name than the title.
content_type: how-to
lifecycle_status: tech-preview
lifecycle_feature: Gateway WAF
lifecycle_id: gateway-waf
---
```

The description is the page's search result.
Write it as one complete sentence, in the active voice, with the full product name and no variables.
Don't start with "This page" or "Learn how to".
Don't repeat it in the first paragraph.

Quote a value that contains a colon.

The `lifecycle_*` fields are described in [Feature status](feature-status.md).
Set them rather than writing a notice by hand.

## Feature lifecycle wording

| Status | In body text | In a notice or table |
|---|---|---|
| Not yet supported for production | tech preview | Technology preview |
| Supported | generally available | GA |
| Scheduled for removal | deprecated | Deprecated |
| Gone | removed | Removed |

Never write *technical preview* or *beta*.
Write *GA* and *TP* only in table cells, with a legend.

A tech preview or deprecation notice is generated from the `lifecycle_*` front matter, or from the `<LifecycleNotice>` component for part of a page.
Don't copy one from another page.
[Feature status](feature-status.md) explains how to mark a feature and what to update when its status changes.

## Release notes

Start from the [release notes template](../calico-enterprise/release-notes/_template.mdx).
It sets the section order, the empty-state lines, and the lifecycle tables.

Two wording rules that apply beyond the template:

- Write a bug fix in the past tense: "Fixed an issue where...".
- Write a feature heading as a noun phrase that names the capability. Not "Introducing X", and not "X is now GA".

## Word list

Terms where we have made a choice, in alphabetical order.
For anything not here, use the [Google word list](https://developers.google.com/style/word-list), then Merriam-Webster.
A *Vale* tag means the linter enforces it.

- **allowlist, denylist.** Not *whitelist* or *blacklist*. Vale.
- **calicoctl.** Lowercase. Code font for the command, plain text for the tool.
- **credential.** Singular when you mean one set of credentials for one client.
- **data plane.** Two words. The one-word form is correct only inside code identifiers such as `linuxDataplane`. Vale.
- **datastore.** One word.
- **e.g., i.e., etc.** Don't use. Write *for example* or *that is*, and end a list with a complete example.
- **early preview.** The status of a Calico Enterprise minor before GA. Lowercase in text.
- **Felix, Typha, Dikastes, Goldmane, Voltron, Whisker.** Capitalized component names.
- **GA.** Only in table cells. Write *generally available* in text.
- **hostname.** One word.
- **k8s.** Don't use. Write *Kubernetes*.
- **kube-proxy.** Lowercase, hyphenated.
- **kubectl.** Lowercase. Code font for the command.
- **log in, log out.** Verb forms, two words. *Login* is the noun and the adjective. Not *sign in*, because the web console says *Log in*.
- **microsegmentation.** One word.
- **multi-cluster.** Hyphenated, as in the Google word list. Not *multicluster*. Vale.
- **nftables, iptables.** Lowercase, always.
- **please.** Don't use.
- **quickstart.** One word. Vale.
- **rule set.** Two words, as in the OWASP Core Rule Set. Not *ruleset*. Vale.
- **set up, setup.** *Set up* is the verb. *Setup* is the noun.
- **tech preview.** Lowercase in text. *Technology preview* in notice titles and table headings. Never *technical preview*. Vale.
- **Tigera Operator.** Both words capitalized. "the Tigera Operator". Vale.
- **via.** Don't use. Write *through*, *by using*, or *with*.
- **walk through.** Needs an object: "walks you through". Or write *covers*, *describes*, *explains*. Vale.
- **web console.** Lowercase. The Calico Cloud and Calico Enterprise user interface. Not *Manager*, *Manager UI*, or *Calico Cloud Manager*.
- **WireGuard, OpenShift, NGINX, KubeVirt, MetalLB, GitHub.** Brand capitalization. Vale.

## Changelog

| Date | Change |
|---|---|
| 2026-11-06 | First version. Replaces the 2022 and 2024 Google Docs drafts. |
