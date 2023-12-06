import React from 'react';
import variables from '../../variables';

export default function ReleaseArchiveTable() {
    const releases = variables.releases.map((release) => {
        const tigeraOperatorVersion = release['tigera-operator'].version;
        const releaseArchiveURL = `https://downloads.tigera.io/ee/archives/release-${release.title}-${tigeraOperatorVersion}.tgz`;

        return {
            ...release,
            tigeraOperatorVersion,
            releaseArchiveURL
        };
    });

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Patch version</th>
                    <th>Release archive link</th>
                </tr>
                </thead>
                <tbody>
                {releases.map((release) => (
                    <tr key={release.title}>
                        <td>{release.title}</td>
                        <td>
                            <a href={release.releaseArchiveURL}>{release.releaseArchiveURL}</a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}
