const PDFDocument = require('pdfkit');
const fs = require('fs');

let pdfDoc = new PDFDocument;
pdfDoc.pipe(fs.createWriteStream('new.pdf'));

let innerList = ['Data1', 'Data2'];
let nestedArrayOfItems = ['Example of a pdf', innerList];

pdfDoc.list(nestedArrayOfItems);

pdfDoc.end();