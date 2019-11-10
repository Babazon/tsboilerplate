const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const AllHtmlEntities = require('html-entities').AllHtmlEntities;
const entities = new AllHtmlEntities();

const rootDir = path.join(__dirname, '..');

function execute(command) {
  const buffer = cp.execSync(command, {
    cwd: rootDir
  });
  const str = buffer.toString('UTF8');
  return str;
}

function getLicensesEscaped() {
  let licenses = execute('yarn licenses generate-disclaimer');

  licenses = licenses.replace(/\\/gm, '\\\\');

  // replace template string character
  licenses = licenses.replace(/`/gm, '\\`');
  licenses = licenses.replace(/´/gm, '\\´');

  // if we render in JSX, we need (AT LEAST) that (to get rid of curly brackets)
  licenses = licenses.replace(/\{/gm, '\\x7b');
  licenses = licenses.replace(/\}/gm, '\\x7d');



  // if we render to HTML this will be needed
  licenses = entities.encode(licenses);


  return licenses;
}


const profileDirectory = path.join(rootDir, 'src', 'container', 'profile');
const templateFile = path.join(profileDirectory, 'LicensesContent.template.ts');
const outputFile = path.join(profileDirectory, 'LicensesContent.ts');

const licensesContent = getLicensesEscaped();

let template = fs.readFileSync(templateFile, 'UTF8');
template = template.replace('@CONTENT', licensesContent)

fs.writeFileSync(outputFile, template);

console.log(`${outputFile} written`);
