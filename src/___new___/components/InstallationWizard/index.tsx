import React, { useState } from 'react';
import { Box, Button, Card, CardBody, Heading, Text, VStack, HStack, useToast, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { wizardStyles, buttonStyles, cardStyles } from './styles';

export type DataplaneType = 'ebpf' | 'iptables' | 'nftables';
export type DeploymentType = 'onprem' | 'cloud' | 'hybrid';
export type CalicoMode = 'cni' | 'policy';

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

const dataplaneStep: WizardStep = {
    id: 'dataplane',
    title: 'Choose your Dataplane type',
    description: 'Calico supports multiple dataplanes for different use cases',
    options: [
        {
            id: 'ebpf',
            title: 'eBPF dataplane',
            description: 'High performance, kube-proxy replacement and DSR support',
            icon: '🐝'
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
            id: 'policy',
            title: 'Just policy',
            description: 'I want to use Calico for network policy only',
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
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedDataplane, setSelectedDataplane] = useState<DataplaneType | null>(null);
    const [selectedDeployment, setSelectedDeployment] = useState<DeploymentType | null>(null);
    const [selectedPath, setSelectedPath] = useState<string | null>(null);
    const [pendingPolicySelection, setPendingPolicySelection] = useState<string | null>(null);
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

    const handleOptionSelect = (stepId: string, optionId: string) => {
        if (stepId === 'dataplane') {
            // Show warning dialog for "Just policy" option
            if (optionId === 'policy') {
                setPendingPolicySelection(optionId);
                onOpen();
            } else {
                setSelectedDataplane(optionId as DataplaneType);
            }
        } else if (stepId === 'deployment') {
            setSelectedDeployment(optionId as DeploymentType);
        } else if (stepId === 'installation') {
            setSelectedPath(optionId);
        }
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Wizard completed - show results
            handleComplete();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const [showResults, setShowResults] = useState(false);

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
        const currentStepData = steps[currentStep];
        if (currentStepData.id === 'dataplane') {
            return selectedDataplane !== null;
        } else if (currentStepData.id === 'deployment') {
            return selectedDeployment !== null;
        } else if (currentStepData.id === 'installation') {
            return selectedPath !== null;
        }
        return false;
    };

    const getSelectedOption = () => {
        const currentStepData = steps[currentStep];
        if (currentStepData.id === 'dataplane') {
            return selectedDataplane;
        } else if (currentStepData.id === 'deployment') {
            return selectedDeployment;
        } else if (currentStepData.id === 'installation') {
            return selectedPath;
        }
        return null;
    };

    const currentStepData = steps[currentStep];

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
                                setCurrentStep(0);
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
                <VStack spacing={6} align="stretch">
                    {/* Progress indicator */}
                    <Box>
                        <Text fontSize="sm" color="gray.600" mb={2}>
                            Step {currentStep + 1} of {steps.length}
                        </Text>
                        <Box display="flex" gap={2}>
                            {steps.map((step, index) => (
                                <Box
                                    key={step.id}
                                    flex={1}
                                    height="4px"
                                    bg={index <= currentStep ? 'blue.500' : 'gray.200'}
                                    borderRadius="2px"
                                />
                            ))}
                        </Box>
                    </Box>

                    {/* Step content */}
                    <Box>
                        <Heading as="h2" size="lg" mb={2}>
                            {currentStepData.title}
                        </Heading>
                        <Text color="gray.600" mb={6}>
                            {currentStepData.description}
                        </Text>

                        <VStack spacing={4} align="stretch">
                            {currentStepData.options.map((option) => (
                                <Card
                                    key={option.id}
                                    sx={{
                                        ...cardStyles,
                                        borderColor: getSelectedOption() === option.id ? 'blue.500' : 'gray.200',
                                        borderWidth: getSelectedOption() === option.id ? '2px' : '1px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        _hover: {
                                            borderColor: 'blue.300',
                                            transform: 'translateY(-1px)',
                                            boxShadow: 'lg'
                                        }
                                    }}
                                    onClick={() => handleOptionSelect(currentStepData.id, option.id)}
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
                                                <Heading as="h3" size="md" mb={2}>
                                                    {option.title}
                                                </Heading>
                                                <Text color="gray.600">
                                                    {option.description}
                                                </Text>
                                            </Box>
                                        </HStack>
                                    </CardBody>
                                </Card>
                            ))}
                        </VStack>
                    </Box>

                    {/* Navigation buttons */}
                    <HStack justify="space-between" pt={4}>
                        <Button
                            leftIcon={<ChevronLeftIcon />}
                            onClick={handleBack}
                            isDisabled={currentStep === 0}
                            variant="outline"
                        >
                            Back
                        </Button>
                        
                        <Button
                            rightIcon={currentStep === steps.length - 1 ? undefined : <ChevronRightIcon />}
                            onClick={handleNext}
                            isDisabled={!canProceed()}
                            colorScheme="blue"
                            sx={buttonStyles}
                        >
                            {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
                        </Button>
                    </HStack>
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