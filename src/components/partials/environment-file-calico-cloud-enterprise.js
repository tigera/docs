import React from "react";

import Admonition from "@theme/Admonition";
import CodeBlock from "@theme/CodeBlock";

import Highlight from "../utils/Highlight";
import { EnvironmentFileGuidelines } from "./environment-file-calico";

export default function EnvironmentFileCalicoCloudEnterprise(props) {
    return (
        <>
            <EnvironmentFileGuidelines {...props} />
            <p>For the Kubernetes datastore set the following:</p>
            <table>
                <thead>
                    <tr>
                        <th>Variable</th>
                        <th>Configuration guidance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>KUBECONFIG</td>
                        <td>Path to kubeconfig file to access the Kubernetes API Server</td>
                    </tr>
                </tbody>
            </table>
            {props.install === "container" && (
                <Admonition type="note">
                    If using certificates and keys, you will need to volume mount them into the container at the location specified by the paths mentioned above.
                </Admonition>
            )}
            <p>Sample <Highlight>EnvironmentFile</Highlight> - save to <Highlight>/kubernetes/calico/calico.env</Highlight></p>
            <CodeBlock language="bash">
                {`DATASTORE_TYPE=kubernetes
CALICO_NODENAME=""
NO_DEFAULT_POOLS="true"
CALICO_IP=""
CALICO_IP6=""
CALICO_AS=""
CALICO_NETWORKING_BACKEND=bird`}
            </CodeBlock>
        </>
    );
}
