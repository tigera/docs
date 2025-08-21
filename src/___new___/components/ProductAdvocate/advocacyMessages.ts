export interface AdvocacyMessage {
  id: string;
  title: string;
  description: string;
  socialProof: string;
  imageUrl: string;
  imageAlt: string;
  overlayBadge: string;
  link: string;
  bgGradient?: string;
}

export const advocacyMessages: AdvocacyMessage[] = [
  {
    id: "security-first",
    title: "Zero Trust Network Security for Kubernetes",
    description: "Implement zero-trust security principles with Calico's advanced network policies. Protect your workloads with micro-segmentation and threat detection that adapts to your environment.",
    socialProof: "🔐 Securing 50M+ containers globally",
    imageUrl: "https://www.tigera.io/app/uploads/2023/02/tutorial-observability-troubleshooting-532x200-1.png",
    imageAlt: "Cybersecurity and network protection concept",
    overlayBadge: "🛡️ Zero Trust",
    link: "https://www.tigera.io/learn/guides/security/zero-trust/",
  },
  {
    id: "observability",
    title: "Real-time Network Visibility & Monitoring with Calico Whisker",
    description: "Gain complete visibility into your network traffic with Calico's advanced observability tools. Monitor, analyze, and troubleshoot network issues with powerful dashboards and alerts.",
    socialProof: "📈 99.9% uptime guarantee",
    imageUrl: "https://www.tigera.io/app/uploads/2025/05/tutorial-Kubernetes-with-Whisker-532x200-1.png",
    imageAlt: "Data analytics and monitoring dashboard",
    overlayBadge: "📊 Live Monitoring",
    link: "https://www.tigera.io/tigera-products/calico-enterprise/observability/",
  },
  {
    id: "vmware-migration",
    title: "VM migration using Kubevirt and Calico",
    description: "Learn how to run virtual machines in a Kubernetes environment",
    socialProof: "🎓 Interactive course in your browser!",
    imageUrl: "https://www.tigera.io/app/uploads/2023/01/tutorial-VM-migration-Kubevirt-Calico-532x200-1.png",
    imageAlt: "Team collaboration and support",
    overlayBadge: "🎓 Free Course",
    link: "https://www.tigera.io/tutorials/?_sf_s=VM%20migration%20using%20Kubevirt%20and%20Calico",
    bgGradient: "linear(to-r, cyan.500, blue.500)"
  }
];