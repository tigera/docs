const path = require("path");
const visit = require("unist-util-visit");

const variables = require(path.resolve("variables"));
const objProp = require(path.resolve("src/utils/objProp"));

const pathPrefixes = {
	cloud: "/calico-cloud/",
	enterprise: "/calico-enterprise/",
	openSource: "/calico/",
};

function variablesPlugin(_options) {
	async function transformer(tree, file) {
		const posixFriendlyPath = convertToPosixFriendlyPath(file.path);
		const productVariables = posixFriendlyPath.includes(pathPrefixes.cloud)
			? variables.cloud
			: posixFriendlyPath.includes(pathPrefixes.enterprise)
				? variables.enterprise
				: posixFriendlyPath.includes(pathPrefixes.openSource)
					? variables.openSource
					: null;

		if (!productVariables) {
			return;
		}

		visit(tree, ["text", "jsx", "code", "link", "inlineCode"], (node) => {
			const valueKey = node.type === "link" ? "url" : "value";

			node[valueKey] = node[valueKey].replaceAll(
				/{{([\w\d.]+)}}/g,
				(match, varName) => {
					const varValue = objProp(productVariables, varName);
					if (!varValue) {
						return match;
					}

					return varValue;
				}
			);
		});
	}

	return transformer;
}

function convertToPosixFriendlyPath(maybeWindowsPath) {
	return maybeWindowsPath.split(path.sep).join(path.posix.sep);
}

module.exports = variablesPlugin;
