import React from "react";

import Link from "@docusaurus/Link";

export default function EnterpriseLink(props) {
    return (
        <>
            <img
                src="/img/calico/calico-enterprise-blue-shield-24px.png"
                alt="Calico Enterprise"
                style={{ display: 'inline-block', verticalAlign: 'middle' }}
            />
            <Link href={props.href}>{props.children}</Link>
        </>
    );
}
