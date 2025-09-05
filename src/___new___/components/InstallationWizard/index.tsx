import React, { useState } from 'react';
import { Box, Button, Card, CardBody, Heading, Text, VStack, HStack, useToast, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { wizardStyles, buttonStyles, cardStyles } from './styles';

export type DataplaneType = 'ebpf' | 'iptables' | 'nftables' | 'vpp' | 'hns' | 'policy';
export type DeploymentType = 'onprem' | 'cloud' | 'hybrid';

export type WizardStep = {
    id: string;
    title: string;
    description: string;
    options: WizardOption[];
};

export type WizardOption = {
    id: string;
    title: string;
    description: string;
    icon?: string;
    docId?: string;
};

export type PredefinedConfig = {
    id: string;
    title: string;
    description: string;
    icon: string;
    dataplane: DataplaneType;
    deployment: DeploymentType;
    color: string;
};

const predefinedConfigs: PredefinedConfig[] = [
    {
        id: 'performance',
        title: 'Performance',
        description: 'High-performance networking with eBPF dataplane',
        icon: '⚡',
        dataplane: 'ebpf',
        deployment: 'onprem',
        color: 'orange'
    },
    {
        id: 'security',
        title: 'Security',
        description: 'Enhanced security with policy enforcement',
        icon: '🛡️',
        dataplane: 'policy',
        deployment: 'onprem',
        color: 'red'
    },
    {
        id: 'cloud-native',
        title: 'Cloud Native',
        description: 'Optimized for managed Kubernetes services',
        icon: '☁️',
        dataplane: 'iptables',
        deployment: 'cloud',
        color: 'blue'
    },
    {
        id: 'hybrid',
        title: 'Hybrid',
        description: 'Mixed on-premises and cloud infrastructure',
        icon: '🔗',
        dataplane: 'iptables',
        deployment: 'hybrid',
        color: 'purple'
    },
    {
        id: 'enterprise',
        title: 'Enterprise',
        description: 'Enterprise-grade with comprehensive features',
        icon: '🏢',
        dataplane: 'ebpf',
        deployment: 'onprem',
        color: 'green'
    }
];

const dataplaneStep: WizardStep = {
    id: 'dataplane',
    title: 'Choose your Dataplane type',
    description: 'Calico supports multiple dataplanes for different use cases',
    options: [
        {
            id: 'ebpf',
            title: 'eBPF dataplane',
            description: 'High performance, kube-proxy replacement and DSR support',
            icon: '/img/brands/ebpf_logo.svg'
        },
        {
            id: 'nftables',
            title: 'Nftables dataplane',
            description: 'Nftables-based dataplane for modern Linux kernels',
            icon: '🔥'
        }
        ,{
            id: 'iptables',
            title: 'iptables dataplane',
            description: 'Standard Linux dataplane with broad compatibility',
            icon: '🐧'
        },
        {
            id: 'hns',
            title: 'Windows HNS dataplane',
            description: 'Windows Host Network Service (HNS) for clusters with Windows nodes',
            icon: '/img/brands/Microsoft_logo.svg'
        },
        {
            id: 'vpp',
            title: 'VPP dataplane',
            description: 'VPP-based dataplane for high-performance networking',
            icon: '/img/brands/fdio.svg'
        },
        {
            id: 'policy',
            title: 'Just policy',
            description: 'I want to use Calico for policy enforcement only',
            icon: '🛡️',
        }
    ]
};

const deploymentStep: WizardStep = {
    id: 'deployment',
    title: 'Choose your deployment type',
    description: 'Select the environment where you want to install Calico',
    options: [
        {
            id: 'onprem',
            title: 'On-Premises',
            description: 'Self-managed infrastructure in your own data center',
            icon: '🏢'
        },
        {
            id: 'cloud',
            title: 'Cloud',
            description: 'Managed Kubernetes services (EKS, GKE, AKS, etc.)',
            icon: '☁️'
        },
        {
            id: 'hybrid',
            title: 'Hybrid',
            description: 'Mixed on-premises and cloud infrastructure',
            icon: '🔗'
        }
    ]
};


const getInstallationPaths = (dataplane: DataplaneType, deployment: DeploymentType) => {
    const paths: { [key: string]: { title: string; description: string; docId: string }[] } = {
        'ebpf-onprem': [
            {
                title: 'Self-managed on-premises (eBPF)',
                description: 'Install Calico with eBPF dataplane on your own infrastructure',
                docId: 'getting-started/kubernetes/self-managed-onprem/onpremises'
            },
            {
                title: 'OpenShift with eBPF',
                description: 'Install Calico with eBPF dataplane on OpenShift clusters',
                docId: 'getting-started/kubernetes/openshift/installation'
            },
            {
                title: 'Rancher with eBPF',
                description: 'Install Calico with eBPF dataplane and Rancher',
                docId: 'getting-started/kubernetes/rancher'
            }
        ],
        'ebpf-cloud': [
            {
                title: 'Amazon EKS with eBPF',
                description: 'Install Calico with eBPF dataplane on Amazon EKS',
                docId: 'getting-started/kubernetes/managed-public-cloud/eks'
            },
            {
                title: 'Google GKE with eBPF',
                description: 'Install Calico with eBPF dataplane on Google GKE',
                docId: 'getting-started/kubernetes/managed-public-cloud/gke'
            },
            {
                title: 'Azure AKS with eBPF',
                description: 'Install Calico with eBPF dataplane on Azure AKS',
                docId: 'getting-started/kubernetes/managed-public-cloud/aks'
            }
        ],
        'ebpf-hybrid': [
            {
                title: 'Hybrid deployment with eBPF',
                description: 'Install Calico with eBPF dataplane across on-premises and cloud',
                docId: 'getting-started/kubernetes/self-managed-public-cloud/aws'
            }
        ],
        'iptables-onprem': [
            {
                title: 'Self-managed on-premises (iptables)',
                description: 'Install Calico with iptables dataplane on your own infrastructure',
                docId: 'getting-started/kubernetes/self-managed-onprem/onpremises'
            },
            {
                title: 'OpenShift with iptables',
                description: 'Install Calico with iptables dataplane on OpenShift clusters',
                docId: 'getting-started/kubernetes/openshift/installation'
            },
            {
                title: 'Rancher with iptables',
                description: 'Install Calico with iptables dataplane and Rancher',
                docId: 'getting-started/kubernetes/rancher'
            }
        ],
        'iptables-cloud': [
            {
                title: 'Amazon EKS with iptables',
                description: 'Install Calico with iptables dataplane on Amazon EKS',
                docId: 'getting-started/kubernetes/managed-public-cloud/eks'
            },
            {
                title: 'Google GKE with iptables',
                description: 'Install Calico with iptables dataplane on Google GKE',
                docId: 'getting-started/kubernetes/managed-public-cloud/gke'
            },
            {
                title: 'Azure AKS with iptables',
                description: 'Install Calico with iptables dataplane on Azure AKS',
                docId: 'getting-started/kubernetes/managed-public-cloud/aks'
            },
            {
                title: 'IBM Cloud with iptables',
                description: 'Install Calico with iptables dataplane on IBM Cloud',
                docId: 'getting-started/kubernetes/managed-public-cloud/iks'
            }
        ],
        'iptables-hybrid': [
            {
                title: 'Hybrid deployment with iptables',
                description: 'Install Calico with iptables dataplane across on-premises and cloud',
                docId: 'getting-started/kubernetes/self-managed-public-cloud/aws'
            }
        ]
    };
    
    return paths[`${dataplane}-${deployment}`] || [];
};

const InstallationWizard: React.FC = () => {
    const [selectedDataplane, setSelectedDataplane] = useState<DataplaneType | null>(null);
    const [selectedDeployment, setSelectedDeployment] = useState<DeploymentType | null>(null);
    const [selectedPath, setSelectedPath] = useState<string | null>(null);
    const [pendingPolicySelection, setPendingPolicySelection] = useState<string | null>(null);
    const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const installationPaths = selectedDataplane && selectedDeployment 
        ? getInstallationPaths(selectedDataplane, selectedDeployment)
        : [];

    const installationStep: WizardStep = {
        id: 'installation',
        title: 'Choose your installation path',
        description: 'Select the specific installation guide for your setup',
        options: installationPaths.map(path => ({
            id: path.docId,
            title: path.title,
            description: path.description,
            docId: path.docId
        }))
    };

    const steps = [dataplaneStep, deploymentStep, installationStep];

    const handlePresetSelect = (preset: PredefinedConfig) => {
        setSelectedPreset(preset.id);
        setSelectedDataplane(preset.dataplane);
        setSelectedDeployment(preset.deployment);
        setSelectedPath(null); // Clear installation path when preset changes
        
        toast({
            title: `${preset.title} configuration selected`,
            description: `Dataplane: ${preset.dataplane}, Deployment: ${preset.deployment}`,
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleOptionSelect = (stepId: string, optionId: string) => {
        // Clear preset selection when user manually selects options
        if (selectedPreset) {
            setSelectedPreset(null);
        }

        if (stepId === 'dataplane') {
            // Show warning dialog for "Just policy" option
            if (optionId === 'policy') {
                setPendingPolicySelection(optionId);
                onOpen();
            } else {
                setSelectedDataplane(optionId as DataplaneType);
                // Clear deployment selection if it becomes incompatible
                if (selectedDeployment && (optionId === 'vpp' && (selectedDeployment === 'cloud' || selectedDeployment === 'hybrid'))) {
                    setSelectedDeployment(null);
                }
            }
        } else if (stepId === 'deployment') {
            // Check if the option should be disabled for vpp
            if (selectedDataplane === 'vpp' && (optionId === 'cloud' || optionId === 'hybrid')) {
                return; // Don't allow selection of disabled options
            }
            setSelectedDeployment(optionId as DeploymentType);
        } else if (stepId === 'installation') {
            setSelectedPath(optionId);
        }
    };

    const handleComplete = () => {
        setShowResults(true);
    };

    const handlePathClick = (docId: string) => {
        // In a real implementation, you would navigate to the selected doc
        console.log(`Navigate to: ${docId}`);
        toast({
            title: 'Installation guide selected!',
            description: `Redirecting to installation guide...`,
            status: 'info',
            duration: 3000,
            isClosable: true,
        });
    };

    const canProceed = () => {
        return selectedDataplane !== null && selectedDeployment !== null && selectedPath !== null;
    };

    const getSelectedOption = (stepId: string) => {
        if (stepId === 'dataplane') {
            return selectedDataplane;
        } else if (stepId === 'deployment') {
            return selectedDeployment;
        } else if (stepId === 'installation') {
            return selectedPath;
        }
        return null;
    };

    // Helper function to check if an option should be disabled
    const isOptionDisabled = (stepId: string, optionId: string) => {
        if (stepId === 'deployment') {
            return selectedDataplane === 'vpp' && (optionId === 'cloud' || optionId === 'hybrid');
        }
        return false;
    };

    const handlePolicyConfirm = () => {
        if (pendingPolicySelection) {
            setSelectedDataplane(pendingPolicySelection as DataplaneType);
            setPendingPolicySelection(null);
            onClose();
        }
    };

    const handlePolicyCancel = () => {
        setPendingPolicySelection(null);
        onClose();
    };

    const [showResults, setShowResults] = useState(false);

    if (showResults) {
        return (
            <Box sx={wizardStyles}>
                <VStack spacing={6} align="stretch">
                    {/* Results Header */}
                    <Box textAlign="center">
                        <Heading as="h2" size="lg" mb={2}>
                            Installation Paths Available
                        </Heading>
                        <Text color="gray.600">
                            Based on your selections: {selectedDataplane} dataplane, {selectedDeployment} deployment
                        </Text>
                    </Box>

                    {/* Installation Paths */}
                    <VStack spacing={4} align="stretch">
                        {installationPaths.map((path) => (
                            <Card
                                key={path.docId}
                                sx={{
                                    ...cardStyles,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    _hover: {
                                        borderColor: 'blue.300',
                                        transform: 'translateY(-2px)',
                                        boxShadow: 'xl'
                                    }
                                }}
                                onClick={() => handlePathClick(path.docId)}
                            >
                                <CardBody>
                                    <HStack spacing={4} justify="space-between">
                                        <Box flex={1}>
                                            <Heading as="h3" size="md" mb={2}>
                                                {path.title}
                                            </Heading>
                                            <Text color="gray.600" mb={3}>
                                                {path.description}
                                            </Text>
                                            <Text fontSize="sm" color="blue.600" fontWeight="medium">
                                                Click to view installation guide →
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text fontSize="2xl">📖</Text>
                                        </Box>
                                    </HStack>
                                </CardBody>
                            </Card>
                        ))}
                    </VStack>

                    {/* Restart Button */}
                    <Box textAlign="center" pt={4}>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowResults(false);
                                setSelectedDataplane(null);
                                setSelectedDeployment(null);
                                setSelectedPath(null);
                            }}
                        >
                            Start Over
                        </Button>
                    </Box>
                </VStack>
            </Box>
        );
    }

    return (
        <>
            <Box sx={wizardStyles}>
                <VStack spacing={8} align="stretch">
                    {/* Header */}
                    <Box textAlign="center">
                        <Heading as="h2" size="lg" mb={2}>
                            Installation Wizard
                        </Heading>
                        <Text color="gray.600">
                            Configure your Calico installation by selecting options for each step
                        </Text>
                    </Box>

                    {/* Predefined Configurations */}
                    <Box>
                        <Heading as="h3" size="md" mb={4}>
                            Quick Start Configurations
                        </Heading>
                        <Text color="gray.600" mb={4}>
                            Choose a predefined configuration or customize your own
                        </Text>
                        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
                            {predefinedConfigs.map((preset) => {
                                const isSelected = selectedPreset === preset.id;
                                const isActive = selectedDataplane === preset.dataplane && selectedDeployment === preset.deployment;
                                
                                return (
                                    <Card
                                        key={preset.id}
                                        sx={{
                                            ...cardStyles,
                                            borderColor: isSelected || isActive ? `${preset.color}.500` : 'gray.200',
                                            borderWidth: isSelected || isActive ? '2px' : '1px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            _hover: {
                                                borderColor: `${preset.color}.300`,
                                                transform: 'translateY(-2px)',
                                                boxShadow: 'lg'
                                            }
                                        }}
                                        onClick={() => handlePresetSelect(preset)}
                                    >
                                        <CardBody>
                                            <VStack spacing={3} align="center" textAlign="center">
                                                <Text fontSize="3xl">{preset.icon}</Text>
                                                <Heading as="h4" size="sm">
                                                    {preset.title}
                                                </Heading>
                                                <Text color="gray.600" fontSize="sm">
                                                    {preset.description}
                                                </Text>
                                                {(isSelected || isActive) && (
                                                    <Text fontSize="xs" color={`${preset.color}.600`} fontWeight="medium">
                                                        ✓ Selected
                                                    </Text>
                                                )}
                                            </VStack>
                                        </CardBody>
                                    </Card>
                                );
                            })}
                        </Box>
                    </Box>

                    {/* All Steps */}
                    {steps.map((step, stepIndex) => (
                        <Box key={step.id}>
                            <Box mb={4}>
                                <Heading as="h3" size="md" mb={2}>
                                    Step {stepIndex + 1}: {step.title}
                                </Heading>
                                <Text color="gray.600" mb={4}>
                                    {step.description}
                                </Text>
                            </Box>

                            <VStack spacing={4} align="stretch">
                                {step.options.map((option) => {
                                    const isDisabled = isOptionDisabled(step.id, option.id);
                                    const isSelected = getSelectedOption(step.id) === option.id;
                                    
                                    return (
                                        <Card
                                            key={option.id}
                                            sx={{
                                                ...cardStyles,
                                                borderColor: isSelected ? 'blue.500' : 'gray.200',
                                                borderWidth: isSelected ? '2px' : '1px',
                                                cursor: isDisabled ? 'not-allowed' : 'pointer',
                                                opacity: isDisabled ? 0.5 : 1,
                                                transition: 'all 0.2s',
                                                _hover: isDisabled ? {} : {
                                                    borderColor: 'blue.300',
                                                    transform: 'translateY(-1px)',
                                                    boxShadow: 'lg'
                                                }
                                            }}
                                            onClick={() => !isDisabled && handleOptionSelect(step.id, option.id)}
                                        >
                                            <CardBody>
                                                <HStack spacing={4}>
                                                    {option.icon && (
                                                        option.icon.startsWith('http') || option.icon.startsWith('/') ? (
                                                            <Image 
                                                                src={option.icon} 
                                                                alt={option.title}
                                                                w="32px"
                                                                h="32px"
                                                                objectFit="contain"
                                                            />
                                                        ) : (
                                                            <Text fontSize="2xl">{option.icon}</Text>
                                                        )
                                                    )}
                                                    <Box flex={1}>
                                                        <Heading as="h4" size="sm" mb={2}>
                                                            {option.title}
                                                            {isDisabled && (
                                                                <Text as="span" fontSize="sm" color="gray.500" ml={2}>
                                                                    (Not available with {selectedDataplane} dataplane)
                                                                </Text>
                                                            )}
                                                        </Heading>
                                                        <Text color="gray.600" fontSize="sm">
                                                            {option.description}
                                                        </Text>
                                                    </Box>
                                                    {isSelected && (
                                                        <Box>
                                                            <Text fontSize="lg" color="blue.500">✓</Text>
                                                        </Box>
                                                    )}
                                                </HStack>
                                            </CardBody>
                                        </Card>
                                    );
                                })}
                            </VStack>
                        </Box>
                    ))}

                    {/* Complete Button */}
                    <Box textAlign="center" pt={6}>
                        <Button
                            onClick={handleComplete}
                            isDisabled={!canProceed()}
                            colorScheme="blue"
                            size="lg"
                            sx={buttonStyles}
                        >
                            View Installation Paths
                        </Button>
                    </Box>
                </VStack>
            </Box>

            {/* Warning Modal for Policy Selection */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>⚠️ Warning</ModalHeader>
                    <ModalBody>
                        <Text>
                            Calico CNI has a lot of advanced features that other CNIs do not provide. 
                            Are you sure you want to proceed with just the policy option?
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="outline" mr={3} onClick={handlePolicyCancel}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue" onClick={handlePolicyConfirm}>
                            Continue
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default InstallationWizard; 