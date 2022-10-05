### Node requirements

- x86-64 processor with at least 2 cores, 8.0GB RAM and 20 GB free disk space

- Linux kernel 3.10 or later with [required dependencies](#kernel-dependencies).
  The following distributions have the required kernel, its dependencies, and are
  known to work well with {{site.prodname}} and {{include.orch}}.{% if include.orch == "Kubernetes" or include.orch == "host protection" %}
  - CentOS 8
  - Ubuntu 18.04 and 20.04
  - RHEL 8
  - Debian 10
  {% endif %}{% if include.orch == "OpenShift" %}
  - Red Hat Enterprise Linux CoreOS
  {% endif %}{% if include.orch == "OpenStack" %}
  - Ubuntu 18.04
  - CentOS 8
  {% endif %}

- {{site.prodname}} must be able to manage `cali*` interfaces on the host. When IPIP is
  enabled (the default), {{site.prodname}} also needs to be able to manage `tunl*` interfaces.
  When VXLAN is enabled, {{site.prodname}} also needs to be able to manage the `vxlan.calico` interface.

  > **Note**: Many Linux distributions, such as most of the above, include NetworkManager.
  > By default, NetworkManager does not allow {{site.prodname}} to manage interfaces.
  > If your nodes have NetworkManager, complete the steps in
  > [Preventing NetworkManager from controlling {{site.prodname}} interfaces]({{ site.baseurl }}/maintenance/troubleshoot/troubleshooting#configure-networkmanager)
  > before installing {{site.prodname}}.
  {: .alert .alert-info}
  
- If your Linux distribution comes with installed Firewalld or another iptables manager it should be disabled. 
  These may interfere with rules added by {{site.prodname}} and result in unexpected behavior.
  
  > **Note**: 
  > If a host firewall is needed, it can be configured by {{site.prodname}} HostEndpoint and GlobalNetworkPolicy.
  > More information about configuration at [Security for host]({{ site.baseurl }}/security/hosts).
  {: .alert .alert-info}

- In order to properly run Elasticsearch, nodes must be configured according to the
  [Elasticsearch system configuration documentation.](https://www.elastic.co/guide/en/elasticsearch/reference/current/system-config.html){:target="_blank"}

- The Typha autoscaler requires a minimum number of Linux worker nodes based on total number of schedulable nodes.

  | Total schedulable nodes | Required Linux nodes for Typha replicas |
  |-------------------------|-----------------------------------------|
  | 1                       | 1
  | 2                       | 2
  | 3                       | 3
  | up to 250               | 4
  | up to 500               | 5
  | up to 1000              | 6
  | up to 1500              | 7
  | up to 2000              | 8
  | 2000 or more            | 10

### Datastore requirements

{{site.prodname}} {{page.version}} requires a key/value store accessible by all
{{site.prodname}} components.
{%- if include.orch == "OpenShift" %}
With OpenShift, the Kubernetes API datastore is used for the key/value store.{% endif -%}
{%- if include.orch == "Kubernetes" %}
On Kubernetes, you can configure {{site.prodname}} to access an etcdv3 cluster directly or to
use the Kubernetes API datastore.{% endif -%}
{%- if include.orch == "OpenStack" %}
For production you will likely want multiple
nodes for greater performance and reliability.  If you don't already have an
etcdv3 cluster to connect to, please refer to {% include open-new-window.html text='the upstream etcd
docs' url='https://coreos.com/etcd/' %} for detailed advice and setup.{% endif %}{% if include.orch == "host protection" %}{% endif %}

### Network requirements

Ensure that your hosts and firewalls allow the necessary traffic based on your configuration. See [Component architecture]({{site.baseurl}}/reference/architecture/overview) to view the following components. 

| Configuration                        | Host(s)                                                      | Port/protocol                     |
| ------------------------------------ | ------------------------------------------------------------ | --------------------------------- |
| **{{site.prodname}} networking options** | IP-in-IP (default)                                       | Protocol number 4                 |
|                                      | BGP                                                          | TCP 179                           |
|                                      | VXLAN                                                        | UDP 4789                          |
|                                      | Wireguard                                                    | UDP 51820 (default)               |
|                                      | IPv6 Wireguard                                               | UDP 51821 (default)               |
| **Cluster scaling**                  | Any {{site.prodname}} networking option above with Typha agents enabled | TCP 5473 (default)     |
{%- if include.orch == "Kubernetes" %} 
| **APIs**                             | Kubernetes API (kube-apiserver) to access Kubernetes API datastore  | Often TCP 443 or 6443\*    |
|                                      | {{site.prodname}} API server                                        | TCP 8080 and 5443 (default)|
{%- elsif include.orch == "OpenShift" %}
| **APIs**                             | Kubernetes API (kube-apiserver) to access Kubernetes API datastore  | Often TCP 443 or 8443\*    |
|                                      | {{site.prodname}} API server                                        | TCP 8080 and 5443 (default)|
{%- endif %}
| **Nodes**                            | calico-node (Felix, BIRD, confd)                                    | TCP 9090 (default)         |
| **Component metrics**                | Prometheus metrics                                                  | TCP 9081 (default)         |
|                                      | Prometheus BGP metrics                                              | TCP 9900 (default)         |
|                                      | Prometheus API service                                              | TCP 9090 (default)         |
|                                      | Prometheus Alertmanager                                             | TCP 9093 (default)         |
| **Logs and storage**                 | Elasticsearch with fluentd datastore                                | TCP 9200 (default)         |
|                                      | Elasticssearch for cloud (ECK)                                      | TCP 9443 (default)         |
|                                      | Elasticsearch gateway                                               | TCP 5444 (default)         |
| **Visibility and troubleshooting**   | Kibana                                                              | TCP 5601 (default)         |
|                                      | Packet capture API                                                  | TCP 8444 (default)         |
|                                      | {{site.prodname}} Manager UI                                        | TCP 9443 (default)         |
| **Intrusion Detection System (IDS)** | {{site.prodname}} intrusion detection                               | TCP 5443 (default)         |
| **Compliance**                       | {{site.prodname}} compliance                                        | TCP 5443 (default)         |
| **Multi-cluster management**         | Additional port required for Manager UI                             | TCP 9449                   |

{%- if include.orch == "Kubernetes" or include.orch == "OpenShift" %}

\* _The value passed to kube-apiserver using the `--secure-port` flag. If you cannot locate this, check the `targetPort` value returned by `kubectl get svc kubernetes -o yaml`._
{%- endif %}

{%- if include.orch == "OpenStack" %}
\* _If your compute hosts connect directly and don't use IP-in-IP, you don't need to allow IP-in-IP traffic._
{%- endif %}

### Privilege requirements

Ensure that {{site.prodname}} has the `CAP_SYS_ADMIN` privilege.

The simplest way to provide the necessary privilege is to run {{site.prodname}} as root or in a privileged container.

{%- if include.orch == "Kubernetes" %}
When installed as a Kubernetes daemon set, {{site.prodname}} meets this requirement by running as a
privileged container. This requires that the kubelet be allowed to run privileged
containers. There are two ways this can be achieved.

- Specify `--allow-privileged` on the kubelet (deprecated).
- Use a {% include open-new-window.html text='pod security policy' url='https://kubernetes.io/docs/concepts/policy/pod-security-policy/' %}.
{% endif -%}
