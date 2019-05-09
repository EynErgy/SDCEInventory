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
const xlsx = require('node-xlsx');


exports.test = (req, res) => {

}

exports.sdce = (req, res) => {
    console.log('Start generating doc')
    const template = fs.readFileSync(path.resolve(__dirname, '../../templates/', 'SDCE-Template-V2.docx'));
    var zip = new JSZip(template);
    var doc = new DocxTemplater();
    doc.loadZip(zip);
    const appId = req.params.appId;
    console.log("App id: " + req.params.appId);
    var fileNameString = "Test";
    App.findOne({
        where: { id: appId },
        include: [
            { model: Criticality },
            { model: Middleware, as: 'Middlewares', include: [
		{model: Server},
		{model: User, as: 'CertResponsibles'}
		] },
            { model: MSSQL, as: 'MSSQLs', include: [Server] },
            { model: Oracle, as: 'Oracles', include: [Server] },
            { model: User, as: 'Owners' },
            { model: User, as: 'Supports' }
        ]
    })
        .then(app => {
            console.log("App: " + app.appName);
            var servers = [];
            var owners = [];
            var supports = [];
            fileNameString = app.id + '_' + app.appName;
            app.Middlewares.forEach(middleware => {
                console.log(middleware)
                var certResps = [];
                for (var i = 0; i < middleware.CertResponsibles.length; i++){
			console.log("found: " + middleware.CertResponsibles[i].fullName);
                    certResps.push(middleware.CertResponsibles[i].fullName)
                }
                if (servers.find(server => { return server.Server_Name === middleware.server.serverName })) {
                    console.log('mw server allreday present ' + middleware.server.serverName)
                    for (var i = 0; i < servers.length; i++) {
                        if (servers[i].Server_Name === middleware.server.serverName) {
                            console.log("add property");
                            if (typeof servers[i].middlewares === 'undefined'){
                                servers[i].middlewares = [{
                                    Middleware_Name: middleware.mwName,
                                    Middleware_StartRequirements: middleware.startRequirements,
                                    Middleware_NonStdConfigs: middleware.nonStdConfig,
                                    Middleware_DataPath: middleware.dataPath,
                                    Middleware_KnownedErrors: middleware.knowedIssues,
                                    Middleware_Connections: middleware.connections,
                                    Middleware_Certificates: certResps.join(', ')
                                }];
                            } else {
                                servers[i].middlewares.push({
                                    Middleware_Name: middleware.mwName,
                                    Middleware_StartRequirements: middleware.startRequirements,
                                    Middleware_NonStdConfigs: middleware.nonStdConfig,
                                    Middleware_DataPath: middleware.dataPath,
                                    Middleware_KnownedErrors: middleware.knowedIssues,
                                    Middleware_Connections: middleware.connections,
                                    Middleware_Certificates: certResps.join(', ')
                                });
                            }
                        }
                    }
                } else {
                    servers.push({
                        Server_Name: middleware.server.serverName,
                        Server_Description: middleware.server.description,
                        Server_Functionality: middleware.server.functionality,
                        Server_Environment: middleware.server.environment,
                        Server_VLAN: middleware.server.vlanID,
                        Server_StartUp: middleware.server.startup,
                        Server_IP: middleware.server.ipAddress,
                        Server_Platform: middleware.server.platform,
                        Server_Monitoring: middleware.server.monitoring,
                        Server_Services: middleware.server.services,
                        Server_SchedulledJobs: middleware.server.schedulledJobs,
                        Server_AdminGroup: middleware.server.adminGroup,
                        Server_UsersRequirements: middleware.server.usersRequirements,
                        middlewares: [{
                            Middleware_Name: middleware.mwName,
                            MiddleWare_StartRequirements: middleware.startRequirements,
                            Middleware_nonStdConfigs: middleware.nonStdConfig,
                            Middleware_DataPath: middleware.dataPath,
                            Middleware_KnownedErrors: middleware.knowedIssues,
                            Middleware_Connections: middleware.connections,
                            Middleware_Certificates: certResps.join(', ')
                        }]
                    });
                }
            });
            app.MSSQLs.forEach(mssql => {
                if (servers.find(server => { return server.Server_Name === mssql.server.serverName })) {
                    console.log('mssql server allreday present ' + mssql.server.serverName)
                    for (var i = 0; i < servers.length; i++) {
                        if (servers[i].Server_Name === mssql.server.serverName) {
                            console.log("add property");
                            if (typeof servers[i].mssqls_dbs === 'undefined'){
                                servers[i].mssqls_dbs = [{ 
                                    MSSQL_DBName: mssql.dbName,
                                    MSSQL_BCH: mssql.bch,
                                    MSSQL_Environment: mssql.environment,
                                    MSSQL_AppAccount: mssql.appAccount,
                                    MSSQL_DBJobs: mssql.dbJobs,
                                    MSSQL_KnownedIssues: mssql.knowedIssues,
                                    MSSQL_FrequentRequests: mssql.frequenRequests,
                                    MSSQL_Specificities: mssql.specificities
                                }]
                            } else {
                                servers[i].mssqls_dbs.push({ 
                                    MSSQL_DBName: mssql.dbName,
                                    MSSQL_BCH: mssql.bch,
                                    MSSQL_Environment: mssql.environment,
                                    MSSQL_AppAccount: mssql.appAccount,
                                    MSSQL_DBJobs: mssql.dbJobs,
                                    MSSQL_KnownedIssues: mssql.knowedIssues,
                                    MSSQL_FrequentRequests: mssql.frequenRequests,
                                    MSSQL_Specificities: mssql.specificities
                                })
                            }
                        }
                    }
                } else {
                    servers.push({
                        Server_Name: mssql.server.serverName,
                        Server_Description: mssql.server.description,
                        Server_Functionality: mssql.server.functionality,
                        Server_Environment: mssql.server.environment,
                        Server_VLAN: mssql.server.vlanID,
                        Server_StartUp: mssql.server.startup,
                        Server_IP: mssql.server.ipAddress,
                        Server_Platform: mssql.server.platform,
                        Server_Monitoring: mssql.server.monitoring,
                        Server_Services: mssql.server.services,
                        Server_SchedulledJobs: mssql.server.schedulledJobs,
                        Server_AdminGroup: mssql.server.adminGroup,
                        Server_UsersRequirements: mssql.server.usersRequirements,
                        mssqls_dbs: [{ 
                            MSSQL_DBName: mssql.dbName,
                            MSSQL_BCH: mssql.bch,
                            MSSQL_Environment: mssql.environment,
                            MSSQL_AppAccount: mssql.appAccount,
                            MSSQL_DBJobs: mssql.dbJobs,
                            MSSQL_KnownedIssues: mssql.knowedIssues,
                            MSSQL_FrequentRequests: mssql.frequenRequests,
                            MSSQL_Specificities: mssql.specificities
                        }]
                    });
                }
            });
            app.Oracles.forEach(oracle => {
                if (servers.find(server => { return server.Server_Name === oracle.server.serverName })) {
                    console.log('oracle server allreday present ' + oracle.server.serverName)
                    for (var i = 0; i < servers.length; i++) {
                        if (servers[i].Server_Name === oracle.server.serverName) {
                            console.log("add property");
                            if (typeof servers[i].oracles_dbs === 'undefined'){
                                servers[i].oracles_dbs = [{ 
                                    Oracle_DBName: oracle.dbName, 
                                    Oracle_AppAccount: oracle.appAccount,
                                    Oracle_Environment: oracle.environment,
                                    Oracle_OwnerAccount: oracle.ownerAccount,
                                    Oracle_DBJobs: oracle.dbJobs,
                                    Oracle_Crontabs: oracle.crontabs,
                                    Oracle_KnownedIssues: oracle.knowedIssues,
                                    Oracle_FrequentRequests: oracle.frequenRequests,
                                    Oracle_BCH: oracle.bch
                                }]
                            } else {
                                servers[i].oracles_dbs.push({ 
                                    Oracle_DBName: oracle.dbName, 
                                    Oracle_AppAccount: oracle.appAccount,
                                    Oracle_Environment: oracle.environment,
                                    Oracle_OwnerAccount: oracle.ownerAccount,
                                    Oracle_DBJobs: oracle.dbJobs,
                                    Oracle_Crontabs: oracle.crontabs,
                                    Oracle_KnownedIssues: oracle.knowedIssues,
                                    Oracle_FrequentRequests: oracle.frequenRequests,
                                    Oracle_BCH: oracle.bch
                                })
                            }
                        }
                    }
                } else {
                    servers.push({
                        Server_Name: oracle.server.serverName,
                        Server_Description: oracle.server.description,
                        Server_Functionality: oracle.server.functionality,
                        Server_Environment: oracle.server.environment,
                        Server_VLAN: oracle.server.vlanID,
                        Server_StartUp: oracle.server.startup,
                        Server_IP: oracle.server.ipAddress,
                        Server_Platform: oracle.server.platform,
                        Server_Monitoring: oracle.server.monitoring,
                        Server_Services: oracle.server.services,
                        Server_SchedulledJobs: oracle.server.schedulledJobs,
                        Server_AdminGroup: oracle.server.adminGroup,
                        Server_UsersRequirements: oracle.server.usersRequirements,
                        oracles_dbs: [{ 
                            Oracle_DBName: oracle.dbName, 
                            Oracle_AppAccount: oracle.appAccount,
                            Oracle_Environment: oracle.environment,
                            Oracle_OwnerAccount: oracle.ownerAccount,
                            Oracle_DBJobs: oracle.dbJobs,
                            Oracle_Crontabs: oracle.crontabs,
                            Oracle_KnownedIssues: oracle.knowedIssues,
                            Oracle_FrequentRequests: oracle.frequenRequests,
                            Oracle_BCH: oracle.bch
                        }]
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
                App_Purpose: app.appPurpose,
                App_UsersLocation: app.usersLocation,
                App_BusinessImpact: app.businessImpact,
                App_TechnicalDetails: app.technicalDetails,
                Criticality: app.criticality.level,
                Servers: servers,
                Owners: owners,
                Supports: supports
            });
            try {
                doc.render();
            }
            catch (error) {
                console.log(JSON.stringify(error));
                throw error;
            }
            return doc.getZip()
                .generate({ type: 'base64' })
        })
        .then(buf => {
		console.log("filename: " + fileNameString);
            const fileName = fileNameString.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            res.setHeader("Content-Disposition", "attachment; filename=" + fileName + '.docx');
            res.send(Buffer.from(buf, "base64"));
        })
}

exports.sdceAll = (req, res) => {

}

exports.xlsServer = (req, res) => {
    console.log('Generating Excel document per Server');
    Server.findAll({
        order:[['serverName', 'ASC']],
        include: [
            {model: Middleware, as: 'Middlewares', include: [{model: App, as :'MWApplications'}]},
            {model: Oracle, as: 'Oracles', include: [{model: App, as :'OraclesApplications'}]},
            {model: MSSQL, as: 'MSSQLs', include: [{model: App, as :'MSSQLApplications'}]}
        ]
    })
    .then(servers => {
        var rows = [['Server Name','Application Name']];
        //console.log(JSON.stringify(servers));
        servers.forEach(server => {
            console.log(server.serverName);
            if (typeof server.Middlewares !== 'undefined'){
                server.Middlewares.forEach(middleware =>{
                   if (typeof middleware.MWApplications !== 'undefined'){
			//console.log(middleware.MWApplications);
			middleware.MWApplications.forEach(application =>{
                console.log(application.appName);
                rows.push([server.serverName,application.appName]);
			})
		   } 
                })
            }
            if (typeof server.Oracles !== 'undefined'){
                server.Oracles.forEach(oracle =>{
                   if (typeof oracle.OraclesApplications !== 'undefined'){
                        //console.log(middleware.MWApplications);
                        oracle.OraclesApplications.forEach(application =>{
                                console.log(application.appName);
                                rows.push([server.serverName,application.appName]);
                        })
                   }
                })
            }
            if (typeof server.MSSQLs !== 'undefined'){
                server.MSSQLs.forEach(mssql =>{
                   if (typeof mssql.MSSQLApplications !== 'undefined'){
                        //console.log(middleware.MWApplications);
                        mssql.MSSQLApplications.forEach(application =>{
                                console.log(application.appName);
                                rows.push([server.serverName,application.appName]);
                        })
                   }
                })
            }
        });
        //console.log(servers);
        return rows;
    })
    .then(rows => {
        var buffer = xlsx.build([{name: "Listing", data: rows}]);
        res.setHeader("Content-Disposition", "attachment; filename=" + "seversAppsList" + '.xlsx');
        res.send(Buffer.from(buffer, "base64"));
    })
}
