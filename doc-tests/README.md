# Doc tests

[Doc Detective](https://doc-detective.com) specs that follow a documentation page step by step and check each expected output.

| Spec | Page |
| --- | --- |
| `calico/3.33/quickstart.spec.yaml` | `calico_versioned_docs/version-3.33/getting-started/kubernetes/quickstart.mdx` |

The specs copy commands and expected output from the page.
When you change the page, change the spec to match.

## Run the tests

You need Docker, `kind` v0.31.0 or later, `kubectl`, `curl`, and Node.js.

```bash
cd doc-tests
npx doc-detective@4.38.1 -c .doc-detective.json
```

A run takes about 4 minutes.
It creates a kind cluster named `calico-cluster` and deletes it at the end.
If a cluster with that name already exists, the run fails at the first step and leaves the existing cluster alone.
kubectl uses `/tmp/calico-quickstart/kubeconfig`, so the run doesn't change your current kubectl context.

Results go to `doc-tests/results/`, which git ignores.
