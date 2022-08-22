---
title: Restrict access to Calico Enterprise components within the cluster 
description: Outlines minimum required pod security policy for each component in Calico Enterprise
---

### Big picture

Use fine-grain authorization to restrict access to {{site.prodname}} components within the cluster using pod security policies.

> **Note:** Pod security policies have been [deprecated as of Kubernetes v1.21][deprecated], and are removed entirely in Kubernetes v1.25. 
{: .alert .alert-info}

### Value

Kubernetes recommends using {% include open-new-window.html text='pod security policy' url='https://kubernetes.io/docs/concepts/policy/pod-security-policy/' %} (PSP) for fine-grained authorization of pod creation and updates to reduce pod attacks. 
Because {{site.prodname}} components run in the pod container, security teams can use PSP to control permissions to the 
{{site.prodname}} component images. 


### Concepts

**PSP admission controller**

Admission controllers in Kubernetes intercept requests to the Kubernetes API and either accepts or rejects them. The PSP admission controller allows or rejects pods into the cluster based on security context, and the available pod security policy. The policy acts only when a pod is created or updated, so existing pods are affected only after they are updated.

{{site.prodname}} provides a PSP for each {{site.prodname}} component used during installation. You can update the permissions before or after installation. A few components are required to run as root. 


### How to

#### Control permissions to {{site.prodname}} components using pod security policies


1. Enable the {% include open-new-window.html text='pod security policy admission controller' url='https://kubernetes.io/docs/concepts/policy/pod-security-policy/#enabling-pod-security-policies' %} in your cluster.

2. Review the default or existing PSPs for your {{site.prodname}} standard installation. 

    **Standard install PSPs**
    
    ```bash
    curl -O {{ "/manifests/tigera-psp.yaml" | absolute_url }}
    ```
    
    **Additional PSPs if using multi-cluster management**
    
    ```bash
    curl -O {{ "/manifests/psp-guardian.yaml" | absolute_url }}
    ```

    **PSPs if using [L7 log collection](https://docs.tigera.io/visibility/elastic/l7/configure){:target="_blank"}** . 
    > **Note:** Please edit this file to include the namespace and service account referencing the application pod you are monitoring. 
    > This will need to be done for every application pod with a different namespace and service account you want to monitor.
    {: .alert .alert-info}

    > **Note:** You may need to add additional privileges to the pod security policy depending on the needs of your application pod.
    {: .alert .alert-info}
    
   ```bash
    curl -O {{ "/manifests/psp-l7-collector.yaml" | absolute_url }}
    ```
    
    **PSPs for the third-party [ingress controller](https://docs.tigera.io/security/advanced-policy){:target="_blank"}**
    ```bash
    curl -O {{ "/manifests/psp-ingress-collector.yaml" | absolute_url }}
    ```

3. Review the following table and adjust permissions, ensuring that each {{site.prodname}} component has the minimum permissions to run.

    |   					|privileged	|allowPrivilegeEscalation	|volumes	|hostNetwork	|runAsUser 	|allowedCapabilities   	|hostPID|
    |:-                     |:-:		|:-:						|:-:		|:-:			|:-:		|:-:					|:-:	|
    |calico-node 			|true		|true   					|hostPath   | true  		|root		| -			  			|   -	|
    |dikastes   			|   -		|   		-				|flexVolume | -     		|root   	|NET_ADMIN				| -  	|
    |prometheus     		|   -		|   		-				|   -		| - 			|root   	| -  					| -  	|
    |prometheus-operator    |   -		|   		-				|   -		| - 			|-      	| -  					| -  	|
    |tigera-apiserver		|true*      |true*   					|hostPath   |  -			|root   	| -      				| - 	|
    |compliance-server		|  - 		|  - 						| -  		|  - 			| -   		| -  					| -  	|
    |compliance-controller	|  - 		|  -						| - 	   	|  -			| -   		|   					| - 	|
    |compliance-reporter	|true*    	|true* 						|hostPath   |  -			|root  		| -  					| -  	|
    |compliance-snapshotter	|  - 		|  - 						| -  		|  - 			| -  		| -  					| -  	|
    |compliance-benchmarker	|  -		|  -     					|hostPath   |  -			|root   	| -  					| true  |
    |elastic-operator		|  - 		|  - 						| -  		|  - 			| -  		| -  					| -  	|
    |elastic-cluster		|true  		|true 						| -  		|  - 			|root   	|CAP_CHOWN   			| -  	|
    |kibana 				|  - 		|  - 						| -  		|  -     		| -  		| -  					| -  	|
    |guardian				|  - 		|  - 						| -  		|  - 			| -  		| -  					| -  	|
    |ids-controller   		|  -  		|  - 						| - 		|  -			| -  		| -  					| -  	|
    |ingress-collector    	|  -  		|true 						|flexVolume |  -			|root  		|NET_BIND_SERVICE  		| -  	|
    |kube-controllers   	|  -  		|  - 						| - 		|  -			| -  		| -  					| -  	|
    |elastic-curator   		|  -  		|  - 						| - 		|  -			| -  		| -  					| -  	|
    |tigera-fluentd   		|true*   	|true* 						|hostPath 	|  -			|root  		|CAP_CHOWN  			| -  	|
    |tigera-operator   		|  -  		|  - 						| - 		|  true			| -  		| -  					| -  	|
    |typha   				|  -  		|  - 						| - 		|  true			| -  		| -  					| -  	|
    |tigera-manager   		|  -  		|  - 						| - 		|  -			| -  		| -  					| -  	|
    |voltron   				|  -  		|  - 						| - 		|  -			| -  		| -  					| -  	|
    |l7-collector			|  -  		|  - 						|flexVolume |  -			| -  		| -  					| -  	|
    |envoy-init 			|  -  		|  - 						|-          |  -			|root  		|NET_ADMIN, NET_RAW		| -  	|

    ``*`` on all platforms for {{site.prodname}} v3.0.0, only on OpenShift platform for {{site.prodname}} v3.0.1 and above

4. Create or update your PSPs to control access to {{site.prodname}} components. Pod security policies will take effect only after pods are created or updated

[deprecated]: https://kubernetes.io/blog/2021/04/06/podsecuritypolicy-deprecation-past-present-and-future/
