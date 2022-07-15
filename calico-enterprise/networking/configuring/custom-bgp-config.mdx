---
title: Custom BGP Configuration
canonical_url: /networking/custom-bgp-config
feature_name: feature_generic_all
---

### Big picture

Use customized BIRD configuration files to enable specialized use-cases.

### Concepts

In {{site.prodname}}, BGP is handled by [BIRD](https://github.com/projectcalico/bird){:target="_blank"}.
The BIRD configurations are templated out through [confd](https://github.com/projectcalico/confd){:target="_blank"}.
You can modify the BIRD configuration to use BIRD features which are not typically exposed using the
default configuration provided with {{site.prodname}}.

Customization of BGP templates should be done only with the help of your Tigera Support representative.

### Before you begin

**Required**

- Calico CNI

### How to

- [Update BGP configuration](#update-bgp-configuration)
- [Apply BGP customizations](#apply-bgp-customizations) based on how you've deployed {{site.prodname}}:

#### Update BGP configuration

Using the directions provided with the templates, set the correct values 
for the BGP configuration using these resources:

- [BGP Configuration]({{site.baseurl}}/reference/resources/bgpconfig)
- [BGP Peer]({{site.baseurl}}/reference/resources/bgppeer)
- [calicoctl]({{site.baseurl}}/reference/calicoctl)

#### Apply BGP Customizations

1. Create your confd templates.
1. Create a ConfigMap from the templates.

  ```
  kubectl create configmap bird-templates -n tigera-operator --from-file=<path to directory of templates>
  ``` 

  The created config map will be used to populate the {{site.prodname}} BIRD configuration file templates. If a template with the same name already exists within the node container, it will be overwritten with the contents from the config map.
