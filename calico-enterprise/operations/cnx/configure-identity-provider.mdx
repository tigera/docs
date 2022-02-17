---
title: Configure an external identity provider
description: Configure an external identity provider for user access to Calico Enterprise Manager and Kibana.
canonical_url: '/getting-started/cnx/roles-and-permissions'
---

### Big picture

Configure an external identity provider (IdP), create a user, and log in to {{site.prodname}} Manager UI. 

(If you are just starting out, the quickest way to allow user access is to configure the default, [token authentication]({{site.baseurl}}/getting-started/cnx/authentication-quickstart).)

### Concepts

The {{site.prodname}} authentication method is configured through the [Authentication API resource]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.Authentication) named, `tigera-secure`.

When configuring your cluster, you may be asked for the following inputs:

- **Client Id**: Id for exchanging data that are shared between the IdP and an application.
- **Client Secret**: Secret associated with the `client id` used by server applications for exchanging tokens.
- **Issuer URL**: URL where the IdP can be reached, based on the conventions of OAuth and OIDC.
- **Claims**: Every time your IdP issues a token for a valid user, these claims add metadata about the user. {{site.prodname}} uses this to determine the username.

### Before you begin

**Supported identity providers**

- **OIDC authentication**: User identity is managed outside of the cluster by an OIDC authorization server.
- **Google OIDC authentication**: User identity is managed by Google OIDC. Choose this option if you want to use GSuite groups.
- **OpenShift authentication**: User identity is provided by the OpenShift OAuth server.

**Required**

- [Install {{site.prodname}}]({{site.baseurl}}/getting-started/) 
- [Configure access to Manager UI]({{site.baseurl}}/getting-started/cnx/access-the-manager)

### How to

#### Configure an external identity provider for user authentication


{% tabs %}
  <label:OIDC,active:true>
<%

1. Apply the Authentication CR to your cluster to let the operator configure your login. 
    The following example uses the email claim. The email field from the JWT (created by your IdP), is used as the username for binding privileges.

   ```
   apiVersion: operator.tigera.io/v1
   kind: Authentication
   metadata:
     name: tigera-secure
   spec:
     # This indicates where the Manager UI can be accessed from the browser. Include the port only if the the manager UI is not running on port 443.
     managerDomain: https://<domain-of-manager-ui>
     oidc:
       issuerURL: <your-idp-issuer>
       usernameClaim: email
   ```

1. Apply the secret to your cluster with your OIDC credentials. To get the values, consult the documentation of your provider.

   ```
   apiVersion: v1
   kind: Secret
   metadata:
     name: tigera-oidc-credentials
     namespace: tigera-operator
   data:
     clientID: <your-base64-clientid>
     clientSecret: <your-base64-clientid-secret>
   ```

%>
  '<label:Google OIDC>'

<%
1. Apply the Authentication CR to your cluster to let the operator configure your login. 
    The following example uses the email claim. The email field from the JWT (created by your IdP), is used as the username for binding privileges.

   ```
   apiVersion: operator.tigera.io/v1
   kind: Authentication
   metadata:
     name: tigera-secure
   spec:
     managerDomain: https://<domain-of-manager-ui>
     oidc:
       issuerURL: <your-idp-issuer>
       usernameClaim: email
   ```
1. (Optional) Google OIDC does not support the groups claim. However, {{site.prodname}} leverages [Dex IdP](https://dexidp.io/docs/connectors/google/) to add groups if you configure a service account.
   This account needs Domain-Wide Delegation and permission to access the `https://www.googleapis.com/auth/admin.directory.group.readonly` API scope.
   To get group fetching set up:
   - Follow the [instructions](https://developers.google.com/admin-sdk/directory/v1/guides/delegation) to set up a service account with Domain-Wide Delegation
       - During service account creation, a JSON key file will be created that contains authentication information for the service account.
       - When delegating the API scopes to the service account, delegate the `https://www.googleapis.com/auth/admin.directory.group.readonly` scope and **only this scope**.
   - Enable the [Admin SDK](https://console.developers.google.com/apis/library/admin.googleapis.com/) 
   - Use the `serviceAccountSecret` and `adminEmail` configuration options in the next step.
        - The contents of the JSON key file should be used as the `serviceAccountSecret`
        - For `adminEmail` choose a G Suite super user. The service account will impersonate this user when making calls to the admin API.

1. Apply the secret to your cluster with your OIDC credentials. 

   ```
   apiVersion: v1
   kind: Secret
   metadata:
     name: tigera-oidc-credentials
     namespace: tigera-operator
   data:
     clientID: <your-base64-clientid>
     clientSecret: <your-base64-clientid-secret>
     # If you created a service account in the previous step, include the following two fields.
     serviceAccountSecret: <your-base64-json-contents>
     adminEmail: <your-base64-gsuite-user>
   ```

%>
  '<label:OpenShift>'

<%

1. Install the [Openshift CLI (oc)](https://docs.okd.io/4.9/cli_reference/openshift_cli/getting-started-cli.html).

1. Create values for some required variables. `MANAGER_URL` is the URL where {{site.prodname}} Manager will be accessed,
   `CLUSTER_DOMAIN` is the domain (excl. port) where your OpenShift cluster is accessed (run `oc status` to get it) and `CLIENT_SECRET` is a value of your choosing.
   ```bash
   # This indicates where the Manager UI can be accessed from the browser. Include the port only if the the manager UI is not running on port 443.
   MANAGER_URL=<manager-host>:<port>
   CLUSTER_DOMAIN=<domain-of-your-ocp-cluster>
   CLIENT_SECRET=<clientSecret>
   ```

1. Add an OAuthClient to your OpenShift cluster.

   ```bash
   oc apply -f - <<EOF
   kind: OAuthClient
   apiVersion: oauth.openshift.io/v1
   metadata:
     # The name is used as the clientID by Dex.
     name: tigera-dex
   # The secret is used as the clientSecret by Dex
   secret: $CLIENT_SECRET
   # List of valid addresses for the callback. 
   redirectURIs:
    - "$MANAGER_URL/dex/callback" 
   grantMethod: prompt
   EOF
   ```

1. Apply the Authentication CR to your cluster to let the operator configure your login.

   ```bash
   oc apply -f - <<EOF
   apiVersion: operator.tigera.io/v1
   kind: Authentication
   metadata:
     name: tigera-secure
   spec:
     # This indicates where the Manager UI can be accessed from the browser. Include the port only if the the manager UI is not running on port 443.
     managerDomain: $MANAGER_URL
     openshift:
       issuerURL: https://api.$CLUSTER_DOMAIN:6443
   EOF
   ```

1. Get the certificates that are used to connect with OpenShift and store them in a file called `dex.pem`.
   ```bash
   echo | openssl s_client -servername oauth-openshift.apps.$CLUSTER_DOMAIN -connect oauth-openshift.apps.$CLUSTER_DOMAIN:443 |  sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > dex.pem
   echo | openssl s_client -servername api.$CLUSTER_DOMAIN -connect api.$CLUSTER_DOMAIN:6443 |  sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' >> dex.pem
   ```
   Alternatively, you can use the root CA of your cluster and store it in `dex.pem`.

1. Apply a secret to your cluster with your OpenShift credentials.

   ```bash
   oc create secret generic tigera-openshift-credentials -n tigera-operator --from-file=rootCA=dex.pem --from-literal=clientID=tigera-dex --from-literal=clientSecret=$CLIENT_SECRET
   ```
   
%>

  '<label:LDAP>'

<%

1. Apply the Authentication CR to your cluster to let the operator configure your login. 


   ```
   apiVersion: operator.tigera.io/v1
   kind: Authentication
   metadata:
     name: tigera-secure
   spec:
     # This indicates where the Manager UI can be accessed from the browser. Include the port only if the the manager UI is not running on port 443.
     managerDomain: https://<manager-host>:<port>
     ldap:
       # The host and port of the LDAP server. Example: ad.example.com:636.
       host: <ldap-host>:<ldap-port>
       # (optional) StartTLS whether to enable the startTLS feature for establishing TLS on an existing LDAP session.
       # If true, the ldap protocol is used and then issues a StartTLS command, otherwise, connections will use
       # the ldaps: protocol.
       startTLS: true

       # User entry search configuration.   
       userSearch: 
         # To start the user search from. Example: "cn=users,dc=example,dc=com".
         baseDN: <base-dn>

         # Optional filter to apply when searching the directory. Example: "(objectClass=posixAccount)"
         filter: <filter>

         # A mapping of attributes to the username. This value can be used for applying RBAC to a user.
         # Default: uid
         nameAttribute: <name-attribute>

       # (Optional) Group search configuration. This value can be used to apply RBAC to a user group.
       groupSearch:

         # BaseDN to start the search from. Example: "cn=groups,dc=example,dc=com".
         baseDN: <base-dn>

         # Optional filter to apply when searching the directory. Example: "(objectClass=posixGroup)"
         filter: <filter>

         # A mapping of attributes to the group name. This value can be used for applying RBAC to a user group. Example: "cn".
         nameAttribute: <name-attribute>

         # Following list contains field pairs that are used to match a user to a group. It adds an additional
         # requirement to the filter that an attribute in the group must match the user's attribute value.
         userMatchers:
           - userAttribute: <user-attribute>
             groupAttribute: <group-attribute>
   ```

1. Apply the secret to your cluster with your LDAP credentials. To obtain the values, consult the documentation of your provider.

   ```
   apiVersion: v1
   kind: Secret
   metadata:
     name: tigera-ldap-credentials
     namespace: tigera-operator
   data:
     bindDN: <your-base64-bind-dn>
     bindPW: <your-base64-bind-password>
     rootCA: <your-base64-ca-cert-pem>
   ```
   
%>

{% endtabs %}

#### Grant user login privileges

>**Note**: For OpenShift users, replace `kubectl` with `oc` in the following commands, or apply cluster roles from the OpenShift console: **User Management**, **users**.
{: .alert .alert-info}

For admin users, apply this cluster role.
  ```bash
  kubectl create clusterrolebinding <user>-tigera-network-admin --user=<user> --clusterrole=tigera-network-admin
  ```

For basic users with view-only permissions, apply this role.
  ```bash
  kubectl create clusterrolebinding <user>-tigera-ui-user --user=<user> --clusterrole=tigera-ui-user
  ```

Or use the groups flag to assign cluster role to a group of users.
  ```bash
  kubectl create clusterrolebinding all-developers-tigera-ui-user --group=<group> --clusterrole=tigera-ui-user
  ```

#### (Optional) Allow {{site.prodname}} URIs in your IdP

Most IdPs require redirect URIs to be allowed to redirect users at the end of the OAuth flow to the {{site.prodname}} Manager or to Kibana. Consult your IdP documentation for authorizing your domain for the respective origins and destinations.

**Authorized redirect URIs**
- `https://<host><port>/dex/callback`

### Troubleshooting
- ManagerDomain `localhost` and `127.0.0.1` are not the same. If you configure `localhost:9443` as your managerDomain, while navigating to `https://127.0.0.1:9443`, the OIDC security checks will deny you access.
- Omit the port from `managerURL` if it is listening on the standard port (`:443`) for HTTPS.
- When your `usernameClaim` is not `email` and `usernamePrefix` is omitted, we have implemented a default prefix identical to how Kubernetes has for their kube-apiserver, see the [oidc-username-claim documentation](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver).
- When you encounter problems while configuring your IdP, we encourage you to use the network tab of the browser dev tools to inspect requests with error codes and to decode authorization headers of the HTTP requests.
- If you would like to bring a self-signed certificate for your IdP and are using OIDC, you can do so by adding the field `rootCA` to secret `tigera-oidc-credentials`. The value for this field should contain the certificate in PEM format.
- If logging into Kibana fails with a `cookie not present` error, update the browser settings to allow third-party cookies, as {{site.prodname}} Manager UI uses Kibana's cookies during login.

### Above and beyond

- [Configure user roles and permissions]({{site.baseurl}}/getting-started/cnx/roles-and-permissions)
- [Configure RBAC for tiered policies]({{site.baseurl}}/security/rbac-tiered-policies)
- [Configure RBAC for Elasticsearch]({{site.baseurl}}/visibility/elastic/rbac-elasticsearch)
