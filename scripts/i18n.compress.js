/*
*   Locize CLI downloads each namespace/language combination as a seperate file
*   To ease all further steps we want to package it into one JSON structure,
*   like mentioned here https://www.i18next.com/how-to/add-or-load-translations (Init)
*/

const path = require('path');
const fs = require('fs');

const rootDir = path.join(__dirname, '..');

const i18nDirectory = path.resolve(rootDir, 'src', 'i18n');

const result = {};
const resultFile = path.join(i18nDirectory, 'all.json');

/*
input directory structure is like this:

* en
* * auth.json
* * common.json
* de
* * auth.json
* * common.json
*/

const languageDirectories = fs.readdirSync(i18nDirectory)
  .map(x => {
    return {
      // target json key is the name of the language directory, e.g. 'en'
      key: x,
      // the absolute path
      path: path.join(i18nDirectory, x),
      // the stats object to filter for directories
      stat: fs.statSync(path.join(i18nDirectory, x))
    }
  })
  // only take directories
  .filter(x => x.stat.isDirectory());

if (languageDirectories.length === 0) {
  console.error('Cannot find at least one input language.');
  console.error('Did you execute "yarn locize:download" before?')
  process.exit(1);
}

for (const languageDirectory of languageDirectories) {

  // get all files within a language directory
  const languageFiles = fs.readdirSync(languageDirectory.path)
    .map(x => {
      return {
        // remove the .json for the target key
        key: x.substr(0, x.indexOf('.')),
        // the full path
        path: path.join(languageDirectory.path, x),
        // load the file as JSON
        content: JSON.parse(fs.readFileSync(path.join(languageDirectory.path, x), 'UTF8'))
      }
    });

  if (languageFiles.length === 0) {
    console.error('Cannot find at least one file for language "' + languageDirectory.key + '"');
    console.error('Maybe execute "yarn locize:download" again?')
    process.exit(2);
  }

  for (const languageFile of languageFiles) {

    result[languageDirectory.key] = result[languageDirectory.key] || {};
    result[languageDirectory.key][languageFile.key] = languageFile.content;
  }
}

fs.writeFileSync(resultFile, JSON.stringify(result, null, 2), 'UTF8');
console.log('File has been written to ' + resultFile);
