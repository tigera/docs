// This file imports the config from docusaurus.config.js and adds the 'current' version to
// onlyIncludeVersions, so that the 'next' version is available when running
// 'make start-next' locally.

// TODO: Replace this line with the one below it when upgrading to docusaurus v3
let config = require('../docusaurus.config.js');
//import { config } from '../docusaurus.config.js';

for (let i = 0; i < config['plugins'].length; i++) {
    let onlyIncludeVersions = config['plugins'][i][1].onlyIncludeVersions;
    if (onlyIncludeVersions !== undefined) {
        if (!config['plugins'][i][1].onlyIncludeVersions.includes('current')) {
            config['plugins'][i][1].onlyIncludeVersions = ['current', ...onlyIncludeVersions];
            console.log(config['plugins'][i][1].onlyIncludeVersions);
        }
    }
}

// TODO: Replace this line with the one below it when upgrading to docusaurus v3
module.exports = config;
//export { config };
