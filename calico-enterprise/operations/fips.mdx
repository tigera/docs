---
title: FIPS Mode
description: Run Calico Enterprise using FIPS validated cryptography.
canonical_url: '/maintenance/fips'
---

### Big picture

Run {{site.prodname}} in [FIPS 140-2](https://csrc.nist.gov/publications/detail/fips/140/2/final) compliant mode.

### Value 

When running in FIPS compliant mode, {{site.prodname}} uses FIPS-approved cryptographic algorithms and NIST-validated cryptographic modules.

### Concepts

The Federal Information Processing Standards (FIPS) are publicly announced standards developed by 
the National Institute of Standards and Technology for use in computer systems by government 
agencies and government contractors. {{site.prodname}} FIPS mode is enabled during installation by:
- Switching the cryptographic modules for the golang-based applications to use the FIPS-140-2 validated {% include open-new-window.html text='Tigera Cryptographic Module' url='https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4095' %}
- Configuring TLS servers and other cryptographic functions to use FIPS 140-2 approved cryptographic algorithms
- Leveraging third-party cryptographic modules for other applications:
  - Elasticsearch is built using the {% include open-new-window.html text='Bouncy Castle cryptographic APIs' url='https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/3514' %} (BC-FIPS version 1.0.2.3,  BCTLS version 1.0.11) and is configured with the recommended FIPS settings
  - Fluentd is built using {% include open-new-window.html text='Red Hat Enterprise Linux 8 OpenSSL Cryptographic Module' url='https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/3842' %}

### Before you begin

**Required**
- A Kubernetes distribution and cluster that run in FIPS mode
- The hosts must run Linux x86_64 distributions
- {{site.prodname}} contains programs that run directly on the host that use dynamic linking of c libraries. For this reason,
  it is a requirement for host systems to contain the following libraries:
  - ld-linux-x86-64.so.2
  - libpthread.so.0
  - libc.so.6
- An [Elasticsearch Platinum license](https://www.elastic.co/subscriptions) for Elasticsearch to run in FIPS mode

**Unsupported**

- The following features are disabled and are not allowed to be used:
  - Kibana
  - Anomaly Detection
  - Application Layer API
  - BGP password
  - WireGuard
  - Curator: Curator is a job that deletes the oldest Elasticsearch data when your cluster is approaching full capacity.
- Switching FIPS mode off and then on again is not supported as this may break hashes and other cryptographic settings.

### How To

To install {{site.prodname}} in FIPS mode follow these steps.

1. Follow [the installation steps]({{site.baseurl}}/getting-started/kubernetes/) for your platform. 

   - In the step for installing custom resources, edit `custom-resources.yaml` and enable FIPS mode in the installation spec.

   ```yaml
    apiVersion: operator.tigera.io/v1
    kind: Installation
    metadata:
      name: default
    spec:
      fipsMode: Enabled
    ```
   
   - For more information on configuration options available in this manifest, see [the installation reference]({{site.baseurl}}/reference/installation/api). 
      We strongly recommend that you [adjust log storage]({{site.baseurl}}/maintenance/logstorage/adjust-log-storage-size) according to the example.

2.  Upgrade to the required Elasticsearch Platinum license to run FIPS mode.

   - Get the password for the `elastic` privileged user:
   
     ```bash
     {% raw %}export PASSWORD=$(kubectl -n tigera-elasticsearch get secret tigera-secure-es-elastic-user -o go-template='{{.data.elastic | base64decode}}'){% endraw %}
     ```
   
   - Port-forward Elasticsearch so you can send requests.

     ```bash
     kubectl port-forward -n tigera-elasticsearch svc/tigera-secure-es-http 9200
     ```

   - Apply an Elasticsearch Platinum license to prevent the trial from expiring. See the 
   [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/update-license.html) 
   for more details.
   
     ```bash
     curl -X PUT -u "elastic:$PASSWORD" "https://localhost:9200/_license?pretty" -H 'Content-Type: application/json' -d'  {"licenses": [ <your license> ]}'
     ```

As soon as the Platinum license is applied, FIPS mode is fully operational.
