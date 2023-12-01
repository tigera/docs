import path from 'path';

function convertToPosixFriendlyPath(maybeWindowsPath) {
  return maybeWindowsPath.split(path.sep).join(path.posix.sep);
}

export default convertToPosixFriendlyPath;
