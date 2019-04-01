const db = require('../models/models');
const App = db.application;
const Server = db.server;
const MSSQL = db.mssql;
const Oracle = db.oracle;
const Middleware = db.middleware;
const User = db.user;
const Criticality = db.criticality;

exports.create = (req, res) => {
    if (!req.body.appName) {
        return res.status(400).send({
            message: "App Name cannot be empty"
        });
    }

    if (!req.body.appPurpose) {
        return res.status(400).send({
            message: "App Purpose cannot be empty"
        });
    }

    if (!req.body.usersLocation) {
        return res.status(400).send({
            message: "App Users Location cannot be empty"
        });
    }

    if (!req.body.businessImpact) {
        return res.status(400).send({
            message: "App Business Impact cannot be empty"
        });
    }

    if (!req.body.technicalDetails) {
        return res.status(400).send({
            message: "App Technical Details cannot be empty"
        });
    }

    App.create({
        appName: req.body.appName,
        appPurpose: req.body.appPurpose,
        usersLocation: req.body.usersLocation,
        businessImpact: req.body.businessImpact,
        technicalDetails: req.body.technicalDetails
    })
        .then(app => {
            // get mw mssql and oracle
            //console.log("MSSQL: " + req.body.mssqls)
            if (typeof req.body.mssqls !== 'undefined') {
                MSSQL.findAll({ where: { id: req.body.mssqls } })
                    .then(mssqls => {
                        console.log("adding mssql: " + mssqls)
                        app.addMSSQLs(mssqls)
                            .catch(err => {
                                res.status(500).send({
                                    message: err.message || "Some error occured while adding mssql"
                                });
                            });
                    })
            }
            return app;
        })
        .then(app => {
            // get mw mssql and oracle
            //console.log("ORACLE: " + req.body.oracles)
            if (typeof req.body.oracles !== 'undefined') {
                Oracle.findAll({ where: { id: req.body.oracles } })
                    .then(oracles => {
                        console.log("adding oracle: " + oracles)
                        app.addOracles(oracles)
                            .catch(err => {
                                res.status(500).send({
                                    message: err.message || "Some error occured while adding oracles"
                                });
                            });
                    })
            }
            return app;
        })
        .then(app => {
            // get mw mssql and oracle
            //console.log("MW: " + req.body.middlewares)
            if (typeof req.body.middlewares !== 'undefined') {
                Middleware.findAll({ where: { id: req.body.middlewares } })
                    .then(middlewares => {
                        console.log("adding mw: " + middlewares)
                        app.addMiddlewares(middlewares)
                            .catch(err => {
                                res.status(500).send({
                                    message: err.message || "Some error occured while adding middlewares"
                                });
                            });
                    })
            }
            return app;
        })
        .then(app => {
            if (typeof req.body.owners !== 'undefined') {
                console.log("Owners: " + req.body.owners)
                User.findAll({ where: { id: req.body.owners } })
                    .then(users => {
                        app.addOwners(users)
                            .catch(err => {
                                res.status(500).send({
                                    message: err.message || "Some error occured while adding owners"
                                });
                            });
                    })
            }
            return app;
        })
        .then(app => {
            if (typeof req.body.supports !== 'undefined') {
                console.log("Supports" + req.body.supports)
                User.findAll({ where: { id: req.body.supports } })
                    .then(users => {
                        app.addSupports(users)
                            .catch(err => {
                                res.status(500).send({
                                    message: err.message || "Some error occured while adding owners"
                                });
                            });
                    })
            }
            return app;
        })
        .then(app => {
            if (typeof req.body.criticality !== 'undefined') {
                console.log("Criticality: " + req.body.criticality)
                Criticality.findOne({ where: { id: req.body.criticality } })
                    .then(criticality => {
                        app.setCriticality(criticality)
                            .catch(err => {
                                res.status(500).send({
                                    message: err.message || "Some error occured while adding criticality"
                                });
                            });
                    })
            }
            return app;
        })
        .then(app => {
            //res.send(app);
            res.redirect('/app');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating App"
            });
        });
};

exports.findAll = (req, res) => {
    App.findAll()
        .then(Apps => {
            res.send(Apps);
            //console.log(Apps);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving Apps"
            });
        });
};

exports.findOne = (req, res) => {
    App.findById(req.params.AppId)
        .then(App => {
            if (!App) {
                return res.status(404).send({
                    message: "App not found with id " + req.params.AppId
                });
            }
            res.send(App);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "App not found with id " + req.params.AppId
                });
            }

            return res.status(500).send({
                message: "Error retrieving App with id " + req.params.AppId
            });
        })
};

exports.edit = (req, res) => {
    App.findById(req.params.Id, {
        include: [
            { model: Criticality },
            {
                model: Middleware, as: 'Middlewares', include: [
                    { model: Server },
                    { model: User, as: 'CertResponsibles' }
                ]
            },
            { model: MSSQL, as: 'MSSQLs', include: [Server] },
            { model: Oracle, as: 'Oracles', include: [Server] },
            { model: User, as: 'Owners' },
            { model: User, as: 'Supports' }
        ]
    })
        .then(app => {
            if (!app) {
                return res.status(404).send({
                    message: "Application not found with id (edit display)" + req.params.Id
                });
            }
            res.render('appAdd', { title: 'Edit App', action: '/app/edit/' + req.params.Id, app: app, layout: 'layout-appAdd', owners: JSON.stringify(app.Owners), supports: JSON.stringify(app.Supports) });
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Error for app with id " + req.params.Id
                });
            }

            return res.status(500).send({
                message: "Error retrieving App with id (edit display)" + req.params.Id + " err: " + JSON.stringify(err)
            });
        })
};

exports.modify = (req, res) => {
    if (!req.body.appName) {
        return res.status(400).send({
            message: "App Name cannot be empty"
        });
    }

    if (!req.body.appPurpose) {
        return res.status(400).send({
            message: "App Purpose cannot be empty"
        });
    }

    if (!req.body.usersLocation) {
        return res.status(400).send({
            message: "App Users Location cannot be empty"
        });
    }

    if (!req.body.businessImpact) {
        return res.status(400).send({
            message: "App Business Impact cannot be empty"
        });
    }

    if (!req.body.technicalDetails) {
        return res.status(400).send({
            message: "App Technical Details cannot be empty"
        });
    }
};