/*
*
* Executes all yarn targets which are prefixed with "postinstall:" in alphabetical order
*
*/

const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const rootDir = path.join(__dirname, '..');
const packageJsonFile = path.join(rootDir, 'package.json');

const packageJson = JSON.parse(fs.readFileSync(packageJsonFile, 'UTF8'));

const keys = Object.keys(packageJson.scripts)
  .filter(x => x.indexOf('postinstall:') > -1)
  .sort((a, b) => a.localeCompare(b))

keys.forEach((key) => {
  console.log(`⚙️  Executing target ${key}`);
  cp.execSync(`yarn ${key}`, {
    cwd: rootDir,
    stdio: 'inherit'
  });
});
