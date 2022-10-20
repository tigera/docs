---
title: Install calicoctl
description: Install the CLI for Calico.
canonical_url: '/maintenance/clis/calicoctl/install'
---

### Big picture

`calicoctl` allows you to create, read, update, and delete {{site.prodname}} objects
from the command line. These objects represent the networking and policy
of your cluster.

You should limit access to `calicoctl` and your {{site.prodname}} datastore to
trusted administrators. We discuss methods of limiting access to the
{{site.prodname}} datastore in the [configuration section](configure).

You can run `calicoctl` on any host with network access to the
{{site.prodname}} datastore as either a binary or a container.
As a binary on a single host, you can also run it as a kubectl plugin.

<!--- Change download URL to latest release if user browsing master branch.  --->
{%- if page.version == "master" -%}
{% assign version = "master" %}
{% else %}
{% assign version = site.data.versions.first.title %}
{% endif %}

### How to

> **Note**: Make sure you always install the version of `calicoctl` that matches the version of {{site.prodname}} running on your cluster.
{: .alert .alert-info}

- [Install calicoctl as a binary on a single host](#install-calicoctl-as-a-binary-on-a-single-host)
- [Install calicoctl as a kubectl plugin on a single host](#install-calicoctl-as-a-kubectl-plugin-on-a-single-host)
- [Install calicoctl as a container on a single host](#install-calicoctl-as-a-container-on-a-single-host)
- [Install calicoctl as a Kubernetes pod](#install-calicoctl-as-a-kubernetes-pod)

#### Install calicoctl as a binary on a single host

{% tabs %}
<label:Linux,active:true>
<%

   Log into the host, open a terminal prompt, and navigate to the location where you want to install the binary. 

   > **Tip**: Consider navigating to a location that's in your `PATH`. For example, `/usr/local/bin/`. 
   {: .alert .alert-info}

   Use the following command to download the `calicoctl` binary.    


      {% if page.version == "master" %}
   ```bash
curl -o calicoctl -O -L {{site.url}}/download/binaries/{{version}}/calicoctl
   ```
      {% else %}
   ```bash
curl -o calicoctl -O -L {{site.downloadsurl}}/ee/binaries/{{version}}/calicoctl
   ```
      {% endif %}

   Set the file to be executable.

   ```bash
chmod +x calicoctl
   ```

   > **Note**: If the location of `calicoctl` is not already in your `PATH`, move the file to one that is or add its location to your `PATH`. This will allow you to invoke it without having to prepend its location.
   {: .alert .alert-info}

%>
<label:Mac OSX>
<%

   Log into the host, open a terminal prompt, and navigate to the location where you want to install the binary.

   > **Tip**: Consider navigating to a location that's in your `PATH`. For example, `/usr/local/bin/`.
   {: .alert .alert-info}

   Use the following command to download the `calicoctl` binary.    


      {% if page.version == "master" %}
   ```bash
curl -o calicoctl -O -L  {{site.url}}/download/binaries/{{ version }}/calicoctl-darwin-amd64
   ```
      {% else %}
   ```bash
curl -o calicoctl -O -L  {{site.downloadsurl}}/ee/binaries/{{ version }}/calicoctl-darwin-amd64
   ```
      {% endif %}

   Set the file to be executable.

   ```bash
chmod +x calicoctl
   ```
   
   > **Note**: If you get the error, `cannot be opened because the developer cannot be verified` when using `caicoctl` for the first time, go to `Applicaitons > System Prefences > Security & Privacy` in the `General` tab at the bottom of the window click `Allow anyway`.
   {: .alert .alert-info}

   > **Notes**: If the location of `calicoctl` is not already in your `PATH`, move the file to one that is or add its location to your `PATH`. This will allow you to invoke it without having to prepend its location.
   {: .alert .alert-info}

%>

<label:Windows>
<%

   Use the following PowerShell command to download the `calicoctl` binary.      

   > **Tip**: Consider running PowerShell as administrator and navigating
   > to a location that's in your `PATH`. For example, `C:\Windows`.
   {: .alert .alert-success}


      {% if page.version == "master" %}
   ```bash
Invoke-WebRequest -Uri "{{site.url}}/download/binaries/{{ version }}/calicoctl-windows-amd64.exe" -OutFile "calicocttl.exe"
   ```
      {% else %}
   ```bash
Invoke-WebRequest -Uri "{{site.downloadsurl}}/ee/binaries/{{ version }}/calicoctl-windows-amd64.exe" -OutFile "calicocttl.exe"
   ```
      {% endif %}

%>
{% endtabs %}

#### Install calicoctl as a kubectl plugin on a single host

{% tabs %}
<label:Linux,active:true>
<%

   Log into the host, open a terminal prompt, and navigate to the location where you want to install the binary.

   > **Tip**: Consider navigating to a location that's in your `PATH`. For example, `/usr/local/bin/`.
   {: .alert .alert-info}

   Use the following command to download the `calicoctl` binary.  


      {% if page.version == "master" %}
   ```bash
curl -o kubectl-calico -O -L {{site.url}}/download/binaries/{{ version }}/calicoctl
   ```
     {% else %}
   ```bash
curl -o kubectl-calico -O -L  {{site.downloadsurl}}/ee/binaries/{{ version }}/calicoctl
   ```
   
     {% endif %}

   Set the file to be executable.

   ```bash
chmod +x kubectl-calico
   ```

   > **Note**: If the location of `kubectl-calico` is not already in your `PATH`, move the file to one that is or add its location to your `PATH`. This is required for kubectl to detect the plugin and allow you to use it.
   {: .alert .alert-info}

%> 

<label:Mac OSX>
<%

   Log into the host, open a terminal prompt, and navigate to the location where you want to install the binary.

   > **Tip**: Consider navigating to a location that's in your `PATH`. For example, `/usr/local/bin/`.
   {: .alert .alert-info}

   Use the following command to download the `calicoctl` binary.  


      {% if page.version == "master" %}
   ```bash
curl -o kubectl-calico -O -L {{site.url}}/download/binaries/{{ version }}/calicoctl-darwin-amd64
   ```
      {% else %}
   ```bash
curl -o kubectl-calico -O -L  {{site.downloadsurl}}/ee/binaries/{{ version }}/calicoctl-darwin-amd64
   ```
      {% endif %}

   Set the file to be executable.

   ```bash
chmod +x kubectl-calico
   ```

   > **Note**: If you get the error, "cannot be opened because the developer cannot be verified" when using `calicoctl` for the first time, go to Applications > System Prefences > Security & Privacy in the **General** tab at the bottom of the window click `Allow anyway`.
   {: .alert .alert-info}

   > **Notes**: If the location of `kubectl-calico` is not already in your `PATH`, move the file to one that is or add its location to your `PATH`. This is required for `kubectl` to detect the plugin.
   {: .alert .alert-info}

%> 

<label:Windows>
<%

   Use the following PowerShell command to download the `calicoctl` binary.

   > **Tip**: Consider running PowerShell as administrator and navigating
   > to a location that's in your `PATH`. For example, `C:\Windows`.
   {: .alert .alert-success}
   
      {% if page.version == "master" %}
   ```bash
Invoke-WebRequest -Uri "{{site.url}}/download/binaries/{{ version }}/calicoctl-windows-amd64.exe" -OutFile "kubectl-calico.exe"
   ```
      {% else %}
   ```bash
Invoke-WebRequest -Uri "{{site.downloadsurl}}/ee/binaries/{{ version }}/calicoctl-windows-amd64.exe" -OutFile "kubectl-calico.exe"
   ``` 
      {% endif %}
   
%>
{% endtabs %}

Verify the plugin works.

   ```bash
kubectl calico -h
   ```

You can now run any `calicoctl` subcommands through `kubectl calico`.

> **Note**: If you run these commands from your local machine (instead of a host node), some of the node related subcommands will not work (like node status).
{: .alert .alert-info}

#### Install calicoctl as a container on a single host

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

1. Use the following commands to pull the `calicoctl` image from the Tigera
   registry.

   ```bash
   docker pull {{page.registry}}{% include component_image component="calicoctl" %}
   ```

1. Confirm that the image has loaded by typing `docker images`.
{%- assign c = site.data.versions.first.components["calicoctl"] %}

   ```bash
   REPOSITORY                TAG               IMAGE ID       CREATED         SIZE
   {{ c.image }}    {{ c.version }}            e07d59b0eb8a   2 minutes ago   42MB
   ```
   {: .no-select-button}

**Next step**:

[Configure calicoctl to connect to your datastore]({{site.baseurl}}/maintenance/clis/calicoctl/configure).

#### Install calicoctl as a Kubernetes pod

Run the following to deploy the `calicoctl` container to your nodes.

```bash
kubectl apply -f {{ "/manifests/calicoctl.yaml" | absolute_url }}
```
> **Note**: You can also {% include open-new-window.html text='view the YAML in a new tab' url='/manifests/calicoctl.yaml' %}.
{: .alert .alert-info}

You can then run commands using kubectl as shown below.

```bash
kubectl exec -ti -n kube-system calicoctl -- /calicoctl get profiles -o wide
```

An example response follows.

```
NAME                 TAGS
kns.default          kns.default
kns.kube-system      kns.kube-system
```
{: .no-select-button}

We recommend setting an alias as follows.

```bash
alias calicoctl="kubectl exec -i -n kube-system calicoctl -- /calicoctl"
```

> **Note**: In order to use the `calicoctl` alias when reading manifests, redirect the file into stdin, for example: ```bash calicoctl create -f - < my_manifest.yaml.```
{: .alert .alert-info}
