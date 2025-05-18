const fs = require('fs');
const path = require('path')
const openApiDocument = require('./swagger/openapi')

var outputPath = path.join(__dirname,'swagger.json');

fs.writeFileSync('./swagger.json', JSON.stringify(openApiDocument,null,2))