// Package main is small functionality to pre-process versions.yaml for docs.
package main

import (
	"fmt"
	"io"
	"log"
	"os"
	"strings"

	"gopkg.in/yaml.v3"
)

var imageNameMaps = map[string]string{
	"cnx-kube-controllers":        "kube-controllers",
	"csi-node-driver-registrar":   "node-driver-registrar",
	"elastic-tsee-installer":      "intrusion-detection-job-installer",
	"elasticsearch-operator":      "eck-operator",
	"flexvol":                     "pod2daemon-flexvol",
	"gateway-api-envoy-gateway":   "envoy-gateway",
	"gateway-api-envoy-proxy":     "envoy-proxy",
	"gateway-api-envoy-ratelimit": "envoy-ratelimit",
	"tigera-cni-windows":          "cni-windows",
	"tigera-cni":                  "cni",
	"tigera-prometheus-service":   "prometheus-service",
}

var componentsToPrune = []string{
	"calico-private",
}

var componentsToRename = map[string]string{
	"upstream-fluentd": "coreos-fluentd",
}

// TigeraOperator represents the tigera-operator configuration
type TigeraOperator struct {
	Version  string `yaml:"version" json:"version"`
	Image    string `yaml:"image" json:"image"`
	Registry string `yaml:"registry" json:"registry"`
}

// Component represents a single component with version information
type Component struct {
	Version string `yaml:"version" json:"version"`
	Image   string `yaml:"image,omitempty" json:"image"`
}

// Components represents all the components in the versions file
type Components map[string]*Component

// revalidate ensures that the appropriate keys are specified for each component
func (c Components) revalidate() {

	// Rename c[oldname] to c[newname] for cases where our keys don't match the docs keys
	for oldName, newName := range componentsToRename {
		entry, ok := c[oldName]
		if ok {
			c[newName] = entry
			delete(c, oldName)
		}
	}

	// Remove these components
	for _, img := range componentsToPrune {
		delete(c, img)
	}

	// Filter the remaining components to ensure their versions and image names are correct
	for componentName, component := range c {
		// We specify coreos and ECK components, even though they don't have images
		// for those components. The actual images are listed under separate components.
		if strings.HasPrefix(componentName, "coreos-") || strings.HasPrefix(componentName, "eck-") {
			continue
		}

		// For each component, ensure that we set a default image path if one does not exist
		if component.Image == "" {
			val, ok := imageNameMaps[componentName]
			if ok {
				component.Image = fmt.Sprintf("tigera/%s", val)
			} else {
				component.Image = fmt.Sprintf("tigera/%s", componentName)
			}
		}
	}
}

// Calico represents the calico configuration
type Calico struct {
	MinorVersion string `yaml:"minor_version" json:"minor_version"`
	ArchivePath  string `yaml:"archive_path" json:"archive_path"`
}

// Versions represents the complete structure of the versions.yaml file
type Versions struct {
	Title          string         `yaml:"title" json:"title"`
	ReleaseName    string         `yaml:"release_name" json:"release_name"`
	Note           string         `yaml:"note" json:"note"`
	FullHash       string         `yaml:"full_hash" json:"full_hash"`
	TigeraOperator TigeraOperator `yaml:"tigera-operator" json:"tigera-operator"`
	Components     Components     `yaml:"components" json:"components"`
	HelmRelease    string         `yaml:"helmRelease" json:"helmRelease"`
	Calico         Calico         `yaml:"calico" json:"calico"`
}

func main() {
	// Read the YAML file
	// yamlData, err := os.ReadFile("versions.yaml")
	yamlData, err := io.ReadAll(os.Stdin)
	if err != nil {
		log.Fatalf("Error reading YAML file from stdin: %v", err)
	}

	// Parse YAML into the Versions struct
	var versions Versions
	err = yaml.Unmarshal(yamlData, &versions)
	if err != nil {
		log.Fatalf("Error parsing YAML: %v", err)
	}

	versions.Components.revalidate()

	newYamlData, err := yaml.Marshal(versions)
	if err != nil {
		panic(err)
	}
	fmt.Print(string(newYamlData))

}
