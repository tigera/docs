---
title: Install calicoq
description: Install the CLI for Calico Enterprise.
canonical_url: /maintenance/clis/calicoq/
---

## About installing calicoq

You can run `calicoq` on any host with network access to the
{{site.prodname}} datastore as either a binary or a container.
For step-by-step instructions, refer to the section that
corresponds to your desired deployment.

- [As a binary on a single host](#install-calicoq-as-a-binary-on-a-single-host)
- [As a container on a single host](#install-calicoq-as-a-container-on-a-single-host)

<!--- Change download URL to latest release if user browsing master branch.  --->
{%- if page.version == "master" -%}
{% assign version = "master" %}
{% else %}
{% assign version = site.data.versions.first.title %}
{% endif %}

## Install calicoq as a binary on a single host

1. Log into the host, open a terminal prompt, and navigate to the location where
you want to install the binary.

   > **Tip**: Consider navigating to a location that's in your `PATH`. For example,
   > `/usr/local/bin/`.
   {: .alert .alert-success}

1. Use the following command to download the `calicoq` binary.

{%- if page.version == "master" -%}

   ```
   {{site.url}}/download/binaries/{{ version }}/calicoq
   ```

{% else %}

   ```
   curl -o calicoq -O -L {{site.downloadsurl}}/ee/binaries/{{ version }}/calicoq
   ```

{% endif %}

1. Set the file to be executable.

   ```
   chmod +x calicoq
   ```

   > **Note**: If the location of `calicoq` is not already in your `PATH`, move the file
   > to one that is or add its location to your `PATH`. This will allow you to invoke it
   > without having to prepend its location.
   {: .alert .alert-info}

**Next step**:

[Configure `calicoq` to connect to your datastore]({{site.baseurl}}/maintenance/clis/calicoq/configure/).

## Install calicoq as a container on a single host

1. Ensure that you have the [`config.json` file with the private Tigera registry credentials]({{site.baseurl}}/getting-started/calico-enterprise#get-private-registry-credentials-and-license-key).

1. From a terminal prompt, use the following command to either create or open the `~/.docker/config.json` file.

   ```bash
   vi ~/.docker/config.json
   ```

1. Depending on the existing contents of the file, edit it in one of the following ways.

   - **New file**: Paste in the entire contents of the `config.json` file from Tigera.

   - **Existing file without quay.io object**: Add the following lines from the `config.json` inside the `"auth"` object.

     ```json
     "quay.io": {
       "auth": "<ROBOT-TOKEN-VALUE>",
       "email": ""
     }
     ```

   - **Existing file with quay.io object**: Add the following lines from the `config.json` inside the `"quay.io"` object.

     ```json
     "auth": "<ROBOT-TOKEN-VALUE>",
     "email": ""
     ```

1. Save and close the file.

1. Use the following commands to pull the `calicoq` image from the Tigera
   registry.

   ```bash
   docker pull {{page.registry}}{% include component_image component="calicoq" %}
   ```

1. Confirm that the image has loaded by typing `docker images`.
{%- assign c = site.data.versions.first.components["calicoq"] %}
   ```bash
   REPOSITORY                TAG               IMAGE ID       CREATED         SIZE
   {{ c.image }}    {{ c.version }}            e07d59b0eb8a   2 minutes ago   42MB
   ```
   {: .no-select-button}

**Next step**:

[Configure `calicoq` to connect to your datastore]({{site.baseurl}}/maintenance/clis/calicoq/configure/).
