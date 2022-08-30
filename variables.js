const variables = {
	cloud: {
		prodname: "Calico Cloud",
		prodnamedash: "calico-cloud",
		prodnameWindows: "Calico Enterprise for Windows",
		rootDirWindows: "C:TigeraCalico",
		nodecontainer: "cnx-node",
		noderunning: "calico-node",
		clouddownloadurl: "https://installer.calicocloud.io/manifests/v3.14.1-1",
	},
	enterprise: {
		prodname: "Calico Enterprise",
		prodnamedash: "calico-enterprise",
		prodnameWindows: "Calico Enterprise for Windows",
		downloadsurl: "https://downloads.tigera.io",
		nodecontainer: "cnx-node",
		noderunning: "calico-node",
		rootDirWindows: "C:\TigeraCalico",
	},
	openSource: {
		prodname: "Calico",
		prodnamedash: "calico",
		prodnameWindows: "Calico for Windows",
		nodecontainer: "calico/node",
		noderunning: "calico-node",
		rootDirWindows: "C:\CalicoWindows",
	},
	orchestrators: {
		All: 'All',
		Kubernetes: 'Kubernetes',
		OpenShift: 'OpenShift',
		OpenStack: 'OpenStack',
		HostProtection: 'host protection',
		'host protection': 'host protection',
	},
};

module.exports = variables;
