
require('reflect-metadata');
require('react-native');
require('jest-enzyme');

const httpAdapter = require('axios/lib/adapters/http');
const axios = require('axios');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

global.FormData = require('form-data');

axios.defaults.adapter = httpAdapter;

Enzyme.configure({adapter: new Adapter()});
