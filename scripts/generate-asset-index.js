#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const os = require('os');

const arr = ['.'];

const result = [];

if(process.argv.length > 2){
  console.log('Starting directory: ' + process.cwd());
  process.chdir(process.argv[2]);
  console.log('New directory: ' + process.cwd());
}

// gather files
while (arr.length > 0) {

    const current = arr.shift();
    console.log(current);
    const stats = fs.statSync(current);
    if (stats.isDirectory()) {
        const entries = fs.readdirSync(current);
        arr.push(...entries.map(x => './' + path.join(current, x)));
    }
    else if (stats.isFile()) {
        if (/index\.(t|j)sx?$/.test(current)) {
            continue;
        }
        if (current.indexOf('@') > -1) {
            continue;
        }
        result.push(current);
    }
}


const lines = [];
result.forEach(file => {

    const variable = file
        .substr(2)
        .replace(/\//g, '_')
        .replace(/@/g, '_')
        .replace(/\-/g, '_')
        .replace(/\./g, '_');

    lines.push(`${variable}: require('${file}')`);
});

const inner = lines.join(',' + os.EOL + '  ');
const outer = `
export const Assets = {
  ${inner}
};
`;

fs.writeFileSync('index.ts', outer, 'UTF8');
