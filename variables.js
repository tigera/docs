const variables = {
  // This is an example of how to override variables. Bear in mind that 1) the
  // 'docsPathPrefix' is necessary, except for 'global' object. And, 2) the
  // order is important as the first objects listed here will take precedence
  // over the objects listed further down, as long as the paths match.
  //
  // override: {
  // 	docsPathPrefix: ["/docs/calico-cloud/new-folder-example/"],
  // 	nodecontainer: 'cnx-node-override'
  // },
  cloud: {
    prodname: "Calico Cloud",
    prodnamedash: "calico-cloud",
    docsPathPrefix: ["/docs/calico-cloud/", "/docs/_includes/calico-cloud/"],
    prodnameWindows: "Calico Enterprise for Windows",
    rootDirWindows: "C:\\TigeraCalico",
    nodecontainer: "cnx-node",
    noderunning: "calico-node",
    clouddownloadurl: "https://installer.calicocloud.io/manifests/v3.14.1-1",
  },
  enterprise: {
    prodname: "Calico Enterprise",
    prodnamedash: "calico-enterprise",
    docsPathPrefix: [
      "/docs/calico-enterprise/",
      "/docs/_includes/calico-enterprise/",
    ],
    prodnameWindows: "Calico Enterprise for Windows",
    downloadsurl: "https://downloads.tigera.io",
    nodecontainer: "cnx-node",
    noderunning: "calico-node",
    rootDirWindows: "C:\\TigeraCalico",
  },
  openSource: {
    prodname: "Calico",
    prodnamedash: "calico",
    docsPathPrefix: ["/docs/calico/", "/docs/_includes/calico/"],
    prodnameWindows: "Calico for Windows",
    nodecontainer: "calico/node",
    noderunning: "calico-node",
    rootDirWindows: "C:\\CalicoWindows",
  },
  global: {
    orchestrators: {
      All: "All",
      Kubernetes: "Kubernetes",
      OpenShift: "OpenShift",
      OpenStack: "OpenStack",
      HostProtection: "host protection",
      "host protection": "host protection",
    },
  },
};

module.exports = variables;
