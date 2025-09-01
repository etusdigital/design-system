const fs = require('fs');

// We don't run 'rm -rf' because it's not a cross-platform solution.
const libStat = fs.statSync('./lib', { throwIfNoEntry: false });
if (libStat && libStat.isDirectory()) {
    fs.rmSync('./lib', { recursive: true });
}
