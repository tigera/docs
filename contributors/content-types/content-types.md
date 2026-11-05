# Content types

Every page in the Calico documentation has one content type.
Pick the type that matches what the reader is trying to do.

## About content types

Readers come to the docs to do something specific.
They might want to learn, finish a task, look something up, or understand how something works.
Each content type serves one of these needs.
A page that tries to serve several needs at once doesn't serve any of them well.
A tutorial that stops to explain design history loses the learner.
A reference page that turns into a procedure is hard to scan.

Start every page from the reader's purpose, not from what we built.
A page that exists to show off a feature broadcasts at the reader.
It doesn't help them.
Before you write, ask who's reading the page and what they need to do or know when they finish.
The answer tells you the content type.

Our content types are based on [Diátaxis](https://diataxis.fr/).
Diátaxis is a framework that sorts documentation into four types, one for each kind of reader need.
We use those four as our core content types.
We also have specialized types that build on the core types for situations that come up often in our docs.

## Content types

### Core content types

| Content type | Reader's need | Question it answers |
|---|---|---|
| Tutorial | Learning | Can you teach me to...? |
| How-to guide | Doing a task | How do I...? |
| Reference | Looking up facts | What is...? |
| Explanation | Understanding | Why...? |

**Tutorial.** A tutorial teaches a new user by walking them through a complete, working example.
The reader is studying, not doing their own work.
The tutorial is responsible for the reader's success, so every step must work as written.
Keep explanation to a minimum and link out to it.
See [Tutorials](https://diataxis.fr/tutorials/).

**How-to guide.** A how-to guide gives a competent user the steps to finish a specific, real-world task.
It assumes the reader already knows what they want to do.
Don't teach in a how-to, and don't go off on tangents.
See [How-to guides](https://diataxis.fr/how-to-guides/).

**Reference.** A reference page describes the product as it is: resources, fields, flags, APIs, and values.
Readers consult it rather than read it from start to finish.
It follows the structure of the product and must be accurate and complete.
It describes; it doesn't instruct or explain.
Pages that describe one API resource follow a fixed structure, so that every resource page reads the same way.
See [Reference](https://diataxis.fr/reference/).

**Explanation.** An explanation page helps the reader understand a topic: how it works, why it's designed that way, and what the trade-offs and alternatives are.
Readers usually read it away from the keyboard.
See [Explanation](https://diataxis.fr/explanation/).

### Specialized content types

**Installation guide.** An installation guide is a how-to guide for installing a product on a specific platform.
It's a separate type because installation is the first task most readers do.
It depends on platform, version, and prerequisites, and it ends with a check that the install worked.

**Troubleshooting.** A troubleshooting page is a how-to guide that starts from a symptom rather than a goal.
The reader has a problem, and the page helps them find the cause and fix it.
Each symptom can have more than one cause, and each cause has its own fix.
When problems happen only while the reader follows one procedure, cover them in a Troubleshooting section of that how-to guide instead.

**Release notes.** Release notes are a sub-type of reference, scoped to a single release.
The reader wants to know what changed and whether it affects them: new features, fixed bugs, known issues, and anything they must do before or after they upgrade.
Lead with changes that need the reader to act, such as breaking changes and deprecations.
