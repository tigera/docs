---
title: Configure encryption and authentication to secure Calico Enterprise components
description: Enable TLS authentication and encryption for various Calico Enterprise components.
canonical_url: '/security/comms/crypto-auth'
---

### Connections from {{site.prodname}} components to kube-apiserver (Kubernetes and OpenShift)

We recommend enabling TLS on kube-apiserver, as well as the client certificate and JSON web token (JWT)
authentication modules. This ensures that all of its communications with {{site.prodname}} components occur
over TLS. The {{site.prodname}} components present either an X.509 certificate or a JWT to kube-apiserver
so that kube-apiserver can verify their identities.

### Connections from Node to Typha (Kubernetes)

Operator based installations automatically configure mutual TLS authentication on connections from
Felix to Typha. You may also configure this TLS by providing your own secrets.

#### Configure Node to Typha TLS based on your deployment

For clusters installed using operator, see how to [provide TLS certificates for Typha and Node](typha-node-tls).

For detailed reference information on TLS configuration parameters, refer to:

- **Typha**: [Node-Typha TLS configuration]({{site.baseurl}}/reference/typha/configuration#felix-typha-tls-configuration)

- **Node**: [Node-Typha TLS configuration]({{site.baseurl}}/reference/felix/configuration#felix-typha-tls-configuration)

## {{site.prodname}} Manager connections

Tigera {{site.prodname}} Manager's web interface, run from your browser, uses HTTPS to securely communicate
with the {{site.prodname}} Manager, which in turn, communicates with the Kubernetes and {{site.prodname}} API
servers also using HTTPS. Through the installation steps, secure communication between
{{site.prodname}} components should already be configured, but secure communication through your web
browser of choice may not. To verify if this is properly configured, the web browser
you are using should display `Secure` in the address bar.

Before we set up TLS certificates, it is important to understand the traffic
that we are securing. By default, your web browser of choice communicates with
{{site.prodname}} Manager through a
[`NodePort` service](https://kubernetes.io/docs/tutorials/services/source-ip/#source-ip-for-services-with-typenodeport){:target="_blank"}
over port `30003`. The NodePort service passes through packets without modification.
TLS traffic is [terminated](https://en.wikipedia.org/wiki/TLS_termination_proxy){:target="_blank"}
at the {{site.prodname}} Manager. This means that the TLS certificates used to secure traffic
between your web browser and the {{site.prodname}} Manager do not need to be shared or related
to any other TLS certificates that may be used elsewhere in your cluster or when
configuring {{site.prodname}}. The flow of traffic should look like the following:

![{{site.prodname}} Manager traffic diagram]({{site.baseurl}}/images/cnx-tls-mgr-comms.svg){: width="60%" }

> **Note** the `NodePort` service in the above diagram can be replaced with other
> [Kubernetes services](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services---service-types){:target="_blank"}.
> Configuration will vary if another service, such as a load balancer, is placed between the web
> browser and the {{site.prodname}} Manager.
{: .alert .alert-info}

In order to properly configure TLS in the {{site.prodname}} Manager, you will need
certificates and keys signed by an appropriate Certificate Authority (CA).
For more high level information on certificates, keys, and CAs, see
[this blogpost](http://www.steves-internet-guide.com/ssl-certificates-explained/){:target="_blank"}.

> **Note** It is important when generating your certificates to make sure
> that the Common Name or Subject Alternative Name specified in your certificates
> matches the host name/DNS entry/IP address that is used to access the {{site.prodname}} Manager
> (i.e. what it says in the browser address bar).
{: .alert .alert-info}

### Configuring {{site.prodname}} Manager UI TLS

Configure manager TLS based on how you've deployed {{site.prodname}}
- [Operator deployment](#operator-deployment)
- [Manual/Helm deployment](#manualhelm-deployment)

#### Operator deployment

For clusters installed using the Tigera Operator, see how to [configure manager TLS](manager-tls).

#### Manual/Helm deployment

Once you have the proper server certificates, you will need to add them to the
{{site.prodname}} Manager. During installation of the {{site.prodname}} Manager, you should have run
the following command.

```
sudo kubectl create secret generic cnx-manager-tls --from-file=cert=/etc/kubernetes/pki/apiserver.crt \
--from-file=key=/etc/kubernetes/pki/apiserver.key -n kube-system
```
> **Note** If you are using certificates not from a third party CA,
> you will need to also add your certificates to your web browser.
> See the `Troubleshooting` section for details.

The `.crt` and `.key` files should be the TLS certificate and key respectively
that you are using for securing the traffic with TLS. If you need to replace the
certificates that you specified during installation, rerunning this command while
specifying the correct files will fix the issue. Once the certificates are updated,
you will need to kill the {{site.prodname}} Manager pod so that it is restarted to uptake the new
certificates.

```
kubectl delete pod <cnx-manager-pod-name> -n kube-system
```

### Issues with certificates

If your web browser still does not display `Secure` in the address bar, the most
common reasons and their fixes are listed below.

- **Untrusted Certificate Authority**: Your browser may not display `Secure` because
  it does not know (and therefore trust) the certificate authority (CA) that issued
  the certificates that the {{site.prodname}} Manager is using. This is generally caused by using
  self-signed certificates (either generated by Kubernetes or manually). If you have
  certificates signed by a recognized CA, we recommend that you use them with the {{site.prodname}}
  Manager since the browser will automatically recognize them.

  If you opt to use self-signed certificates you can still configure your browser to
  trust the CA on a per-browser basis by importing the CA certificates into the browser.
  In Google Chrome, this can be achieved by selecting Settings, Advanced, Privacy and security,
  Manage certificates, Authorities, Import. This is not recommended since it requires the CA
  to be imported into every browser you access {{site.prodname}} Manager from.

- **Mismatched Common Name or Subject Alternative Name**: If you are still having issues
  securely accessing {{site.prodname}} Manager with TLS, you may want to make sure that the Common Name
  or Subject Alternative Name specified in your certificates matches the host name/DNS
  entry/IP address that is used to access the {{site.prodname}} Manager (i.e. what it says in the browser
  address bar). In Google Chrome you can check the {{site.prodname}} Manager certificate with Developer Tools
  (Ctrl+Shift+I), Security. If you are issued certificates which do not match,
  you will need to reissue the certificates with the correct Common Name or
  Subject Alternative Name and reconfigure {{site.prodname}} Manager following the steps above.

### Ingress proxies and load balancers

You may wish to configure proxy elements, including hardware or software load balancers, Kubernetes Ingress
proxies etc., between user web browsers and the {{site.prodname}} Manager.  If you do so, configure your proxy
such that {{site.prodname}} Manager receives a HTTPS (TLS) connection, not unencrypted HTTP.

If you require TLS termination at any of these proxy elements, you will need to

  * use a proxy that supports transparent HTTP/2 proxying, for example, [Envoy](https://www.envoyproxy.io/){:target="_blank"}
  * re-originate a TLS connection from your proxy to {{site.prodname}} Manager, as it expects TLS

If you do not require TLS termination, configure your proxy to "pass thru" the TLS to {{site.prodname}} Manager.
