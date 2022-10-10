---
title: Authentication quickstart
description: Use default token authentication to log in to Calico Enterprise Manager UI and Kibana. 
canonical_url: '/getting-started/cnx/authentication-quickstart'
---

### Big picture

Get started quickly with our default token authentication to log in to {{site.prodname}} Manager UI and Kibana.

### Concepts

#### Authentication defaults

Token authentication is the default authentication option for {{site.prodname}} Manager. When a service account is created, an 
associated secret is created that contains a signed bearer token for that service account. Just copy the token for the service 
account in to the Manager UI and log in.

Use basic login for the default Kibana root user.

The default login methods are always available at:
- **{{site.prodname}} Manager:** `https://<host>:<port>/login/token`. 
- **Kibana:** `https://<host>:<port>/tigera-kibana/login`. 

### Before you begin

Make sure you have installed {{site.prodname}} using one of the [installation guides]({{site.baseurl}}/getting-started/) and have set up [access to the Manager UI]({{site.baseurl}}/getting-started/cnx/access-the-manager).

### How to

>**Note**: For OpenShift, replace `kubectl` with `oc` in the following commands.
{: .alert .alert-info}

**Log in to {{site.prodname}} Manager**

First, create a service account in the desired namespace:

```bash
kubectl create sa <user> -n <namespace>
```

Give the service account permissions to access the {{site.prodname}} Manager UI, and a {{site.prodname}} cluster role:

```bash
kubectl create clusterrolebinding <binding_name> --clusterrole <role_name> --serviceaccount <namespace>:<service_account>
```

where:
- **binding_name** is a descriptive name for the rolebinding.
- **role_name** is one of the default cluster roles (or a custom cluster role) specifying {{site.prodname}} UI permissions.
- **namespace** is the service account's namespace.
- **service_account** is the service account that the permissions are being associated with.

For example, the following command gives the service account, `jane` in the default namespace network admin permissions:

```bash
kubectl create clusterrolebinding jane-access --clusterrole tigera-network-admin --serviceaccount default:jane
```

Next, create a login token for the service account. 

Using the running example of a service account named, `jane` in the default namespace:

```bash
kubectl create token jane --duration=24h
```

> **Note**: The token created above will expire after 24 hours.
{: .alert .alert-info}

Now that you have the token, log in to the {{site.prodname}} UI and submit the token.

`https://<host>:<port>/login/token`

  
**Log in to Kibana**

Connect to Kibana with the `elastic` username. Use the following command to decode the password:	

{% raw %}
```	
kubectl -n tigera-elasticsearch get secret tigera-secure-es-elastic-user -o go-template='{{.data.elastic | base64decode}}' && echo
```
{% endraw %}

Once logged in, you can configure users and their privileges from the settings page.

### Above and beyond

- [Configure user roles and permissions]({{site.baseurl}}/getting-started/cnx/roles-and-permissions)
- [Configure an external identity provider]({{site.baseurl}}/getting-started/cnx/configure-identity-provider)
- [Configure RBAC for tiered policies]({{site.baseurl}}/security/rbac-tiered-policies)
- [Configure RBAC for Elasticsearch]({{site.baseurl}}/visibility/elastic/rbac-elasticsearch)
