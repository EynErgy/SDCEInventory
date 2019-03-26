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
    App.findOne({ where: { id: appId } ,
        include: [
            {model: Criticality},
            {model: Middleware, as: 'Middlewares', include: [Server]},
            {model: MSSQL, as: 'MSSQLs', include: [Server]},
            {model: Oracle, as: 'Oracles', include: [Server]},
            {model: User, as: 'Owners'},
            {model: User, as: 'Supports'}
        ]
    })
        .then(app => {
            console.log("App: " + app.appName);
        var servers = [];
        var owners = [];
        var supports = [];
		app.Middlewares.forEach(middleware => {
            if (servers.find(server => {return server.Server_Name === middleware.server.serverName})){
                console.log('mw server allreday present ' + middleware.server.serverName)
        	 for (var i = 0; i < servers.length; i++){
                        if (servers[i].Server_Name === middleware.server.serverName){
                                console.log("add property");
                                servers[i].isTest = true;
                        }
                } 
	   } else {
			servers.push({
				Server_Name: middleware.server.serverName,
				ServerDescription: 'not implemented',
				Server_Functionality: 'not implemented',
				Server_Environment: middleware.server.environment,
				Server_VLAN: middleware.server.vlanID,
				Server_StartUp: 'not implemented',
				Server_IP: middleware.server.ipAddress,
				Server_Platform: middleware.server.platform,
				isMiddleware: true
			});
	}
        });
        app.MSSQLs.forEach(mssql => {
            if (servers.find(server => {return server.Server_Name === mssql.server.serverName})){
                console.log('mssql server allreday present ' + mssql.server.serverName)
        	 for (var i = 0; i < servers.length; i++){
                        if (servers[i].Server_Name === mssql.server.serverName){
                                console.log("add property");
                                servers[i].isTest = true;
                        }
                } 
	   } else {
			servers.push({
				Server_Name: mssql.server.serverName,
				ServerDescription: 'not implemented',
				Server_Functionality: 'not implemented',
				Server_Environment: mssql.server.environment,
				Server_VLAN: mssql.server.vlanID,
				Server_StartUp: 'not implemented',
				Server_IP: mssql.server.ipAddress,
				Server_Platform: mssql.server.platform,
				isMSSQL: true
			});
	}
        });
        app.Oracles.forEach(oracle => {
            if (servers.find(server => {return server.Server_Name === oracle.server.serverName})){
                console.log('oracle server allreday present ' + oracle.server.serverName)
		for (var i = 0; i < servers.length; i++){
			if (servers[i].Server_Name === oracle.server.serverName){
                                console.log("add property");
                                servers[i].isTest = true;
                        }
		}
            } else {
			servers.push({
				Server_Name: oracle.server.serverName,
				ServerDescription: 'not implemented',
				Server_Functionality: 'not implemented',
				Server_Environment: oracle.server.environment,
				Server_VLAN: oracle.server.vlanID,
				Server_StartUp: 'not implemented',
				Server_IP: oracle.server.ipAddress,
				Server_Platform: oracle.server.platform,
				isOracle: true
			});
	}
        });
        app.Owners.forEach(user => {
            owners.push({
                Owner_Name: user.fullName,
                Owner_Email: user.email,
                Owner_Phone: user.phone
            });
        });
        app.Supports.forEach(user => {
            supports.push({
                Support_Name: user.fullName,
                Support_Email: user.email,
                Support_Phone: user.phone
            });
        });
                doc.setData({
                App_Name: app.appName,
                App_Purpose: app.purpose,
                App_UsersLocation: app.usersLocation,
                App_BusinessImpact: app.businessImpact,
                App_TechnicalDetails: app.technicalDetails,
                Criticality: app.criticality.level,
                Servers: servers,
                Owners: owners,
                Supports: supports
            });
		console.log(JSON.stringify(servers))
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
