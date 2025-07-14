import React, { useState } from 'react';
import { Box, Button, Card, CardBody, Heading, Text, VStack, HStack, useToast } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { wizardStyles, buttonStyles, cardStyles } from './styles';

export type DataplaneType = 'ebpf' | 'iptables';
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
            description: 'High performance with DSR, PSR, GSR support',
            icon: '🐝'
        },
        {
            id: 'iptables',
            title: 'iptables dataplane',
            description: 'Traditional dataplane with broad compatibility',
            icon: '🐧'
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

const calicoModeStep: WizardStep = {
    id: 'calico-mode',
    title: 'Choose Calico mode',
    description: 'Select how you want to use Calico in your cluster',
    options: [
        {
            id: 'cni',
            title: 'Calico as CNI',
            description: 'Use Calico for both networking and network policy',
            docId: 'getting-started/kubernetes/quickstart'
        },
        {
            id: 'policy',
            title: 'Calico as Policy Engine',
            description: 'Use Calico for network policy with existing CNI',
            docId: 'getting-started/kubernetes/flannel/install-for-flannel'
        }
    ]
};

const getInstallationPaths = (dataplane: DataplaneType, deployment: DeploymentType, mode: CalicoMode) => {
    const paths: { [key: string]: { title: string; description: string; docId: string }[] } = {
        'ebpf-onprem-cni': [
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
        'ebpf-onprem-policy': [
            {
                title: 'Flannel with Calico eBPF policy',
                description: 'Use Flannel for networking and Calico eBPF for policy',
                docId: 'getting-started/kubernetes/flannel/install-for-flannel'
            }
        ],
        'ebpf-cloud-cni': [
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
        'ebpf-cloud-policy': [
            {
                title: 'Cloud with eBPF policy',
                description: 'Use Calico eBPF policy with cloud provider CNI',
                docId: 'getting-started/kubernetes/flannel/install-for-flannel'
            }
        ],
        'ebpf-hybrid-cni': [
            {
                title: 'Hybrid deployment with eBPF',
                description: 'Install Calico with eBPF dataplane across on-premises and cloud',
                docId: 'getting-started/kubernetes/self-managed-public-cloud/aws'
            }
        ],
        'ebpf-hybrid-policy': [
            {
                title: 'Hybrid with eBPF policy',
                description: 'Use Calico eBPF policy in hybrid environment',
                docId: 'getting-started/kubernetes/flannel/install-for-flannel'
            }
        ],
        'iptables-onprem-cni': [
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
        'iptables-onprem-policy': [
            {
                title: 'Flannel with Calico iptables policy',
                description: 'Use Flannel for networking and Calico iptables for policy',
                docId: 'getting-started/kubernetes/flannel/install-for-flannel'
            }
        ],
        'iptables-cloud-cni': [
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
        'iptables-cloud-policy': [
            {
                title: 'Cloud with iptables policy',
                description: 'Use Calico iptables policy with cloud provider CNI',
                docId: 'getting-started/kubernetes/flannel/install-for-flannel'
            }
        ],
        'iptables-hybrid-cni': [
            {
                title: 'Hybrid deployment with iptables',
                description: 'Install Calico with iptables dataplane across on-premises and cloud',
                docId: 'getting-started/kubernetes/self-managed-public-cloud/aws'
            }
        ],
        'iptables-hybrid-policy': [
            {
                title: 'Hybrid with iptables policy',
                description: 'Use Calico iptables policy in hybrid environment',
                docId: 'getting-started/kubernetes/flannel/install-for-flannel'
            }
        ]
    };
    
    return paths[`${dataplane}-${deployment}-${mode}`] || [];
};

const InstallationWizard: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedDataplane, setSelectedDataplane] = useState<DataplaneType | null>(null);
    const [selectedDeployment, setSelectedDeployment] = useState<DeploymentType | null>(null);
    const [selectedMode, setSelectedMode] = useState<CalicoMode | null>(null);
    const [selectedPath, setSelectedPath] = useState<string | null>(null);
    const toast = useToast();

    const installationPaths = selectedDataplane && selectedDeployment && selectedMode 
        ? getInstallationPaths(selectedDataplane, selectedDeployment, selectedMode)
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

    const steps = [dataplaneStep, deploymentStep, calicoModeStep, installationStep];

    const handleOptionSelect = (stepId: string, optionId: string) => {
        if (stepId === 'dataplane') {
            setSelectedDataplane(optionId as DataplaneType);
        } else if (stepId === 'deployment') {
            setSelectedDeployment(optionId as DeploymentType);
        } else if (stepId === 'calico-mode') {
            setSelectedMode(optionId as CalicoMode);
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
        } else if (currentStepData.id === 'calico-mode') {
            return selectedMode !== null;
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
        } else if (currentStepData.id === 'calico-mode') {
            return selectedMode;
        } else if (currentStepData.id === 'installation') {
            return selectedPath;
        }
        return null;
    };

    const currentStepData = steps[currentStep];

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
                            Based on your selections: {selectedDataplane} dataplane, {selectedDeployment} deployment, {selectedMode} mode
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
                                setSelectedMode(null);
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
                                            <Text fontSize="2xl">{option.icon}</Text>
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
    );
};

export default InstallationWizard; 