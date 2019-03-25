const db = require('../models/models');
const App = db.application;
const Server = db.server;
const MSSQL = db.mssql;
const Oracle = db.oracle;
const Middleware = db.middleware;
const User = db.user;
const Criticality = db.criticality;
const JSZip = require('jszip');
const DocxTemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');

exports.test = (req, res) => {
    
}

exports.sdce = (req, res) => {
    console.log('Start generating doc')
    const template = fs.readFileSync(path.resolve(__dirname,'../../templates/','SDCE-Template-V2.docx'));
    var zip = new JSZip(template);
    var doc = new DocxTemplater();
    doc.loadZip(zip);
    const appId = req.params.appId;
    console.log("App id: " + req.params.appId);
    App.findOne({ where: { id: appId } })
        .then(app => {
            console.log("App: " + app.appName);
            doc.setData({
                App_Name: app.appName,
                App_Purpose: app.purpose,
                App_UsersLocation: app.usersLocation,
                App_BusinessImpact: app.businessImpact,
                App_TechnicalDetails: app.technicalDetails
            });
            try {
                doc.render();
            }
            catch (error) {
                console.log(error);
                throw error;
            }
            return doc.getZip()
            .generate({type: 'base64'})
        })
        .then(buf => {
            res.setHeader("Content-Disposition", "attachment; filename=Test.docx");
    res.send(Buffer.from(buf, "base64"));
        })
}   
/*
    const appId = req.params.appId;
    console.log("App id: " + req.params.appId);
    App.findOne({ where: { id: appId } })
        .then(app => {
            console.log("App: " + app.appName);
            return createSDCEDoc(app)
        })
        .then(doc => {
            const packer = new docx.Packer();
            packer.toBase64String(doc)
                .then(output => {
                    res.setHeader("Content-Disposition", "attachment; filename=Test.docx");
                    res.send(Buffer.from(output, "base64"));
                })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "error"
            })
        })
}

function createSDCEDoc(app) {
    const doc = new docx.Document({
        creator: "Nicolas Rosa",
        description: "SDCE Application Questionaire V2.0",
        title: "Application " + app.appName
    });

    //  style
    doc.Styles.createParagraphStyle("Title", "TS Title Style")
        .basedOn("Normal")
        .next("Normal")
        .color("E20074")
        .size(56)
        .font("Tele-GroteskNor")

    doc.Styles.createParagraphStyle("Heading1", "TS Heading1 Style")
        .basedOn("Normal")
        .next("Normal")
        .color("E20074")
        .size(38)
        .font("Tele-GroteskNor")
        .bold()

    doc.Styles.createParagraphStyle("Normal", "TS Normal Style")
        .basedOn("Normal")
        .next("Normal")
        .size(22)
        .font("Calibri")
        .spacing({ line: 276 })

    // content App portion
    doc.createParagraph("SDCE Daimler - Application questionnaire for managed services").title();
    doc.createParagraph("Introduction").heading1();
    const tabText = new docx.TextRun("Purpose of this document is to document the mapping and interconnection between application and underlying instances in the SDCE Daimler environment. In addition to enclose details about any used specific configuration on the MW/OS/DB level.").tab();
    const tabpara = new docx.Paragraph().leftTabStop(1000);
    tabpara.addRun(tabText);
    doc.addParagraph(tabpara);
    doc.createParagraph("Details about application group").heading1();
    doc.createParagraph("Application name:");
    doc.createTable(2, 2)
        .getCell(1, 1)
        .addContent(new docx.Paragraph(app.appName))
    doc.createParagraph("Application owner (Daimler):");
    doc.createParagraph("Application support contact details:");
    doc.createParagraph("Purpose of the application:");
    doc.createParagraph("Location of application users:");
    doc.createParagraph("Criticality:");
    doc.createParagraph("Business impact description:");
    doc.createParagraph("Technical description of the application:");
    doc.createParagraph("List of servers from application bundle:");
    return doc;
}
*/
