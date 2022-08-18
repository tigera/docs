---
title: Filter DNS logs
description: Suppress DNS logs of low significance using filters. 
canonical_url: /visibility/elastic/dns/filtering-dns
---

{{site.prodname}} supports filtering out DNS logs based on user provided
configuration. Use filtering to suppress logs of low significance.

### Configure DNS filtering

DNS log filtering is configured through a ConfigMap in the `tigera-operator`
namespace.

To enable DNS log filtering, follow these steps:

1. Create a `filters` directory with a file named `dns` with the contents of
   your desired filter using [Filter configuration files](#filter-configuration-files).
   If you are also adding [flow filters]({{site.baseurl}}/visibility/elastic/flow/filtering) also add the `flow` file
   to the directory.
1. Create the `fluentd-filters` ConfigMap in the `tigera-operator` namespace
   with the following command.
   ```bash
   kubectl create configmap fluentd-filters -n tigera-operator --from-file=filters
   ```

### Filter configuration files

The filters defined by the ConfigMap are inserted into the fluentd configuration file.
The [upstream fluentd documentation](https://docs.fluentd.org/filter/grep){:target="_blank"}
describes how to write fluentd filters.  The [DNS log schema](dns-logs) can be referred to
for the specification of the various fields you can filter based on.  Remember to ensure
that the config file is properly indented in the ConfigMap.

### Example 1: filter out cluster-internal lookups

This example filters out lookups for domain names ending with ".cluster.local".  More
logs could be filtered by adjusting the regular expression "pattern", or by adding
additional `exclude` blocks.

```
<filter dns>
  @type grep
  <exclude>
    key qname
    pattern /\.cluster\.local$/
  </exclude>
</filter>
```

### Example 2: keep logs only for particular domain names

This example will filter out all logs *except* those for domain names ending `.co.uk`.

```
<filter dns>
  @type grep
  <regexp>
      key qname
      pattern /\.co\.uk$/
  </regexp>
</filter>
```
