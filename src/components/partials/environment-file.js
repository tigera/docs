import React from "react";

import EnvironmentFileCalico from "./environment-file-calico";
import EnvironmentFileCalicoCloudEnterprise from "./environment-file-calico-cloud-enterprise";

export default function EnvironmentFile(props) {
	switch (props.prodname) {
        case "Calico": return <EnvironmentFileCalico {...props} />;
        default: return <EnvironmentFileCalicoCloudEnterprise {...props} />;
    }
}
