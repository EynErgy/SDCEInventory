const db = require('../models/models');
const App = db.application;
const Server = db.server;
const MSSQL = db.mssql;
const Oracle = db.oracle;
const Middleware = db.middleware;
const User = db.user;
const Criticality = db.criticality;
const docx = require('docx');

exports.test = (req, res) => {
    const doc = new docx.Document();
    const paragraph = new docx.Paragraph("Test doc");
    const textOne = new docx.TextRun("Hello world").bold();
    const textTwo = new docx.TextRun("Hello again");
    paragraph.addRun(textOne);
    paragraph.addRun(textTwo);
    doc.addParagraph(paragraph);

    const packer = new docx.Packer();
    packer.toBase64String(doc)
    .then(output => {
        res.setHeader("Content-Disposition", "attachment; filename=Test.docx");
    res.send(Buffer.from(output, "base64"));
    })
}

