# Test Vale Changes

This is a test file to demonstrate that Vale now runs only on changed files in the PR.

## Some mistakes that Vale should catch

1. This sentance has a spelling mistake. <!-- sentance -> sentence -->

2. I want to use dataplane instead of data plane to test substitution rules. <!-- should suggest "data plane" -->

3. I'm going to reference kubernetes instead of Kubernetes. <!-- should suggest proper capitalization -->

4. Lets test some more ebpf functionality. <!-- should suggest "eBPF" -->

5. This file is designed to trigger Vale linting errors so we can see that the action works correctly on only the changed files.

6. We're making a quick start guide. <!-- should suggest "quickstart" -->

7. Mispelled words like recieve should be caught. <!-- recieve -> receive -->

8. There may be grammer issues in this sentance too. <!-- grammer -> grammar, sentance -> sentence -->

## Valid Content

This section has correct spelling and follows the style guide properly:

- Kubernetes is properly capitalized
- Data plane is correctly written as two words  
- eBPF uses the proper casing
- Quickstart is written as one word
- All sentences have proper grammar and spelling