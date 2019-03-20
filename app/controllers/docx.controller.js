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
    const heading = new docx.Paragraph().center().heading1();
    const title = new docx.TextRun("Test Doc");
    const paragraph1 = new docx.Paragraph();
    const textOne = new docx.TextRun("Hello world").bold();
    const paragraph2 = new docx.Paragraph()
    const textTwo = new docx.TextRun("Hello again");
    heading.addRun(title);
    paragraph1.addRun(textOne);
    paragraph2.addRun(textTwo);
    doc.addParagraph(heading);
    doc.addParagraph(paragraph1);
    doc.addParagraph(paragraph2);

    const packer = new docx.Packer();
    packer.toBase64String(doc)
    .then(output => {
        res.setHeader("Content-Disposition", "attachment; filename=Test.docx");
    res.send(Buffer.from(output, "base64"));
    })
}

