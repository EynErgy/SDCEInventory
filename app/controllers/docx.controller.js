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
    const template = fs.readFileSync(path.resolve(__dirname, '../../templates/', 'SDCE-Template-V2.docx'));
    var zip = new JSZip(template);
    var doc = new DocxTemplater();
    doc.loadZip(zip);
    const appId = req.params.appId;
    console.log("App id: " + req.params.appId);
    App.findOne({
        where: { id: appId },
        include: [
            { model: Criticality },
            { model: Middleware, as: 'Middlewares', include: [Server] },
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
            app.Middlewares.forEach(middleware => {
                if (servers.find(server => { return server.Server_Name === middleware.server.serverName })) {
                    console.log('mw server allreday present ' + middleware.server.serverName)
                    for (var i = 0; i < servers.length; i++) {
                        if (servers[i].Server_Name === middleware.server.serverName) {
                            console.log("add property");
                            servers[i].middlewares.push({
                                Middleware_Name: middleware.mwName,
                                Middleware_StartRequirements: middleware.startRequirements,
                                Middleware_NonStdConfigs: middleware.nonStdConfig,
                                Middleware_DataPath: middleware.dataPath,
                                Middleware_KnownedErrors: middleware.knownedErrors,
                                Middleware_Connections: middleware.connections
                            });
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
                        Server_Monitoring: middleware.server.monitoring,
                        Server_Services: middleware.server.services,
                        Server_SchedulledJobs: middleware.server.schedulledJobs,
                        Server_AdminGroup: middleware.server.adminGroup,
                        middlewares: [{
                            Middleware_Name: middleware.mwName,
                            Middleware_StartRequirements: middleware.startRequirements,
                            Middleware_NonStdConfigs: middleware.nonStdConfig,
                            Middleware_DataPath: middleware.dataPath,
                            Middleware_KnownedErrors: middleware.knownedErrors,
                            Middleware_Connections: middleware.connections
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
                        Server_Monitoring: middleware.server.monitoring,
                        Server_Services: middleware.server.services,
                        Server_SchedulledJobs: middleware.server.schedulledJobs,
                        Server_AdminGroup: middleware.server.adminGroup,
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
                        Server_Monitoring: middleware.server.monitoring,
                        Server_Services: middleware.server.services,
                        Server_SchedulledJobs: middleware.server.schedulledJobs,
                        Server_AdminGroup: middleware.server.adminGroup,
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
                console.log(JSON.stringify(error));
                throw error;
            }
            return doc.getZip()
                .generate({ type: 'base64' })
        })
        .then(buf => {
            res.setHeader("Content-Disposition", "attachment; filename=Test.docx");
            res.send(Buffer.from(buf, "base64"));
        })
}
