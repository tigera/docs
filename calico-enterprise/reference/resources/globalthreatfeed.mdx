---
title: Global threat feed
description: API for this Calico Enterprise resource. 
---

A global threat feed resource (GlobalThreatFeed) represents a feed of threat intelligence used for
security purposes.

{{site.prodname}} supports threat feeds that give either

 * a set of IP addresses or IP prefixes, with content type IPSet, or
 * a set of domain names, with content type DomainNameSet

For each IPSet threat feed, {{site.prodname}} automatically monitors flow logs for members of the set.
IPSet threat feeds can also be configured to be synchronized to a [global network set](./globalnetworkset),
allowing you to use them as a dynamically-updating deny-list by incorporating the global network set into network policy.

For each DomainNameSet threat feed, {{site.prodname}} automatically monitors DNS logs for queries (QNAME) or answers (RR NAME or RDATA) that contain members of the set.

For `kubectl` [commands](https://kubernetes.io/docs/reference/kubectl/overview/){:target="_blank"}, the following case-insensitive aliases
may be used to specify the resource type on the CLI:
`globalthreatfeed.projectcalico.org`, `globalthreatfeeds.projectcalico.org` and abbreviations such as
`globalthreatfeed.p` and `globalthreatfeeds.p`.

### Sample YAML

```yaml
apiVersion: projectcalico.org/v3
kind: GlobalThreatFeed
metadata:
  name: sample-global-threat-feed
spec:
  content: IPSet
  mode: Enabled
  description: "This is the sample global threat feed"
  feedType: Custom
  globalNetworkSet:
    # labels to set on the GNS
    labels:
      level: high
  pull:
    # accepts time in golang duration format
    period: 24h
    http:
      format:
        newlineDelimited: {}
      url: https://an.example.threat.feed/deny-list
      headers:
        - name: "Accept"
          value: "text/plain"
        - name: "APIKey"
          valueFrom:
            # secrets selected must be in the "tigera-intrusion-detection" namespace in order to be used
            secretKeyRef:
              name: "globalthreatfeed-sample-global-threat-feed-example"
              key: "apikey"
```

### Push or Pull
You can configure {{site.prodname}} to pull updates from your threat feed using a [`pull`](#pull) stanza in
the global threat feed spec.

Alternately, you can have your threat feed push updates directly.  Leave out the `pull` stanza, and configure
your threat feed to create or update the Elasticsearch document that corresponds to the global threat
feed object.

For IPSet threat feeds, this Elasticsearch document will be in the index `.tigera.ipset.<cluster_name>` and must have the ID set
to the name of the global threat feed object. The doc should have a single field called `ips`, containing
a list of IP prefixes.

For example:

```
PUT .tigera.ipset.cluster01/_doc/sample-global-threat-feed
{
    "ips" : ["99.99.99.99/32", "100.100.100.0/24"]
}
```

For DomainNameSet threat feeds, this Elasticsearch document will be in the index `.tigera.domainnameset.<cluster_name>` and must
have the ID set to the name of the global threat feed object. The doc should have a single field called `domains`, containing
a list of domain names.

For example:

```
PUT .tigera.domainnameset.cluster01/_doc/example-global-threat-feed
{
    "domains" : ["malware.badstuff", "hackers.r.us"]
}
```

Refer to the [Elasticsearch document APIs][elastic-document-apis] for more information on how to
create and update documents in Elasticsearch.

### GlobalThreatFeed Definition

#### Metadata

| Field       | Description                                   | Accepted Values   | Schema  |
|-------------|-----------------------------------------------|-------------------|---------|
| name        | The name of this threat feed.                 | Lower-case alphanumeric with optional `-`  | string  |
| labels      | A set of labels to apply to this threat feed. |                   | map     |

#### Spec

| Field            | Description                                          | Accepted Values        | Schema                                        | Default |
|------------------|------------------------------------------------------|------------------------|-----------------------------------------------|---------|
| content          | What kind of threat intelligence is provided         | IPSet, DomainNameSet   | string                                        | IPSet   |
| mode             | Determines if the threat feed is Enabled or Disabled | Enabled, Disabled      | string                                        | Enabled |
| description      | Human-readable description of the template           | Maximum 256 characters | string                                        |         |
| feedType         | Distinguishes Builtin threat feeds from Custom feeds | Builtin, Custom        | string                                        | Custom  |
| globalNetworkSet | Include to sync with a global network set            |                        | [GlobalNetworkSetSync](#globalnetworksetsync) |         |
| pull             | Configure periodic pull of threat feed updates       |                        | [Pull](#pull)                                 |         |

#### Status

The `status` is read-only for users and updated by the `intrusion-detection-controller` component as
it processes global threat feeds.

| Field                | Description                                                                      |
|----------------------|----------------------------------------------------------------------------------|
| lastSuccessfulSync   | Timestamp of the last successful update to the threat intelligence from the feed |
| lastSuccessfulSearch | Timestamp of the last successful search of logs for threats                      |
| errorConditions      | List of errors preventing operation of the updates or search                     |

#### GlobalNetworkSetSync

When you include a `globalNetworkSet` stanza in a global threat feed, it triggers synchronization
with a [global network set](./globalnetworkset). This global network set will have the name `threatfeed.<threat feed name>`
where `<threat feed name>` is the name of the global threat feed it is synced with. This is only supported for
threat feeds of type IPSet.

> **NOTE**: A `globalNetworkSet` stanza only works for `IPSet` threat feeds, and you must also include a `pull` stanza.
{: .alert .alert-info}

| Field  | Description                                               | Accepted Values | Schema |
|--------|-----------------------------------------------------------|-----------------|--------|
| labels | A set of labels to apply to the synced global network set |                 | map    |

#### Pull

When you include a `pull` stanza in a global threat feed, it triggers a periodic pull of new data. On successful
pull and update to the data store, we update the `status.lastSuccessfulSync` timestamp.

If you do not include a `pull` stanza, you must configure your system to [push](#push-or-pull) updates.

| Field  | Description                           | Accepted Values | Schema                            | Default |
|--------|---------------------------------------|-----------------|-----------------------------------|---------|
| period | How often to pull an update           | >= 5m           | [Duration string][parse-duration] | 24h     |
| http   | Pull the update from an HTTP endpoint |                 | [HTTPPull](#httppull)             |         |

#### HTTPPull

Pull updates from the threat feed by doing an HTTP GET against the given URL.

| Field   | Description                                               | Accepted Values | Schema                    |
|---------|-----------------------------------------------------------|-----------------|---------------------------|
| format  | Format of the data the threat feed returns                |                 | [Format](#format)         |
| url     | The URL to query                                          |                 | string                    |
| headers | List of additional HTTP Headers to include on the request |                 | [HTTPHeader](#httpheader) |

IPSet threat feeds must contain IP addresses or IP prefixes. For example:

```
# This is an IP Prefix
100.100.100.0/24
# This is an address
99.99.99.99
```

DomainNameSet threat feeds must contain domain names. For example:

```
# Suspicious domains
malware.badstuff
hackers.r.us
```

Internationalized domain names (IDNA) may be encoded either as Unicode in UTF-8 format, or as
ASCII-Compatible Encoding (ACE) according to [RFC 5890][idna].

#### Format

Several different feed formats are supported. The default,
`newlineDelimited`, expects a text file containing entries separated by
newline characters. It may also include comments prefixed by `#`.
`json` uses a [jsonpath] to extract the desired information from a
JSON document. `csv` extracts one column from CSV-formatted data.

| Field            | Description                 | Schema        |
|------------------|-----------------------------|---------------|
| newlineDelimited | Newline-delimited text file | Empty object  |
| json             | JSON object                 | [JSON](#json) |
| csv              | CSV file                    | [CSV](#csv)   |

##### JSON

| Field | Description                  | Schema |
|-------|------------------------------|--------|
| path | [jsonpath] to extract values. | string |

Values can be extracted from the document using any [jsonpath]
expression, subject to the limitations mentioned below, that evaluates
to a list of strings. For example: `$.` is valid for `["a", "b", "c"]`,
and `$.a` is valid for `{"a": ["b", "c"]}`.

> **LIMITATIONS**: No support for subexpressions and filters. Strings in
brackets must use double quotes. It cannot operate on JSON decoded
struct fields.

##### CSV

| Field                       | Description                                                               | Schema  |
|-----------------------------|---------------------------------------------------------------------------|---------|
| fieldNum                    | Number of column containing values. Mutually exclusive with `fieldName`.  | int     |
| fieldName                   | Name of column containing values, requires `header: true`.                | string  |
| header                      | Whether or not the document contains a header row.                        | bool    |
| columnDelimiter             | An alternative delimiter character, such as <code>&#124;</code>.          | string  |
| commentDelimiter            | Lines beginning with this character are skipped. `#` is common.           | string  |
| recordSize                  | The number of columns expected in the document. Auto detected if omitted. | int     |
| disableRecordSizeValidation | Disable row size checking. Mutually exclusive with `recordSize`.          | bool    |

#### HTTPHeader

| Field     | Description                                               | Schema                                |
|-----------|-----------------------------------------------------------|---------------------------------------|
| name      | Header name                                               | string                                |
| value     | Literal value                                             | string                                |
| valueFrom | Include to retrieve the value from a config map or secret | [HTTPHeaderSource](#httpheadersource) |

> **NOTE**: You must include either `value` or `valueFrom`, but not both.
{: .alert .alert-info}

#### HTTPHeaderSource

| Field           | Description                     | Schema            |
|-----------------|---------------------------------|-------------------|
| configMapKeyRef | Get the value from a config map | [KeyRef](#keyref) |
| secretKeyRef    | Get the value from a secret     | [KeyRef](#keyref) |

#### KeyRef

KeyRef tells {{site.prodname}} where to get the value for a header.  The referenced Kubernetes object
(either a config map or a secret) must be in the `tigera-intrusion-detection` namespace. The referenced
Kubernetes object should have a name with following prefix format: `globalthreatfeed-<GlobalThreatFeed.Name>-`.

| Field    | Description                                               | Accepted Values | Schema | Default |
|----------|-----------------------------------------------------------|-----------------|--------|---------|
| name     | The name of the config map or secret                      |                 | string |         |
| key      | The key within the config map or secret                   |                 | string |         |
| optional | Whether the pull can proceed without the referenced value | If the referenced value does not exist, `true` means omit the header. `false` means abort the entire pull until it exists | bool | `false`

[elastic-document-apis]: https://www.elastic.co/guide/en/elasticsearch/reference/6.4/docs-update.html
[parse-duration]: https://golang.org/pkg/time/#ParseDuration
[idna]: https://tools.ietf.org/html/rfc5890
[jsonpath]: https://goessner.net/articles/JsonPath/
