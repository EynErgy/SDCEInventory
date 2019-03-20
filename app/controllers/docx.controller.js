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

exports.sdce = (req, res) => {

    const doc = new docx.Document();

    // content App portion
    doc.createParagraph("SDCE Daimler . Application questionnaire for managed services");
    doc.createParagraph("Introduction");
    doc.createParagraph("Purpose of this document is to document the mapping and interconnection between application and underlying instances in the SDCE Daimler environment. In addition to enclose details about any used specific configuration on the MW/OS/DB level.");
    doc.createParagraph("Details about application group");
    doc.createParagraph("Application name:");
    doc.createParagraph("Application owner (Daimler):");
    doc.createParagraph("Application support contact details:");
    doc.createParagraph("Purpose of the application:");
    doc.createParagraph("Location of application users:");
    doc.createParagraph("Criticality:");
    doc.createParagraph("Business impact description:");
    doc.createParagraph("Technical description of the application:");
    doc.createParagraph("List of servers from application bundle:");

    const packer = new docx.Packer();
    packer.toBase64String(doc)
        .then(output => {
            res.setHeader("Content-Disposition", "attachment; filename=Test.docx");
            res.send(Buffer.from(output, "base64"));
        })
}
