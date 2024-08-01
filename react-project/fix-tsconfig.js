const fs = require('fs');
const path = require('path');
const stripJsonComments = require('strip-json-comments');

const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');
const tsconfigContent = fs.readFileSync(tsconfigPath, 'utf8');
const tsconfig = JSON.parse(stripJsonComments(tsconfigContent));

tsconfig.compilerOptions.jsx = 'react-jsx';

fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2), 'utf8');

console.log('tsconfig.json updated with jsx: "react-jsx"');
