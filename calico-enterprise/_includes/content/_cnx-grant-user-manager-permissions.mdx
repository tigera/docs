{%- if include.usertype == "serviceaccount" %}
  {% assign type = "service account" %}
  {% assign flag = "serviceaccount" %}
  {% assign user = "<NAMESPACE>:<USER>" %}
{% else %}
  {% assign type = "user" %}
  {% assign flag = "user" %}
  {% assign user = "<USER>" %}
{%- endif %}

1. Grant permission to access the {{site.prodname}} Manager to users in your cluster. Issue one of the following
   commands, replacing `{{user}}` with the {{type}} you wish to grant access.

   The ClusterRole `tigera-ui-user` grants permission to use the {{site.prodname}} Manager UI, view flow
   logs, audit logs, network statistics, compliance reports, and access the default policy tier.

   ```
{%- if include.init == "openshift" %}
   oc adm policy add-cluster-role-to-user tigera-ui-user <USER>
{%- else %}
   kubectl create clusterrolebinding <USER>-tigera \
     --clusterrole=tigera-ui-user \
     --{{flag}}={{user}}
{%- endif %}
   ```

   The ClusterRole `tigera-network-admin` grants permission to use the {{site.prodname}} Manager UI, view flow
   logs, audit logs, compliance reports and network statistics, and administer all network policies and tiers, and
   manage compliance report schedules.

   ```
{%- if include.init == "openshift" %}
   oc adm policy add-cluster-role-to-user tigera-network-admin <USER>
{%- else %}
   kubectl create clusterrolebinding <USER>-network-admin \
     --clusterrole=tigera-network-admin \
     --{{flag}}={{user}}
{%- endif %}
   ```

   To grant access to additional tiers, or create your own roles consult the [RBAC documentation]({{site.baseurl}}/security/rbac-tiered-policies){:target="_blank"}.
