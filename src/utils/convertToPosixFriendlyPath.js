const path = require('path');

function convertToPosixFriendlyPath(maybeWindowsPath) {
  return maybeWindowsPath.split(path.sep).join(path.posix.sep);
}

module.exports = convertToPosixFriendlyPath;
