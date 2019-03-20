const db = require('../models/models');
const Mssql = db.mssql;
const Server = db.server;

exports.create = (req, res) => {
    if (!req.body.bch) {
        return res.status(400).send({
            message: "Mssql bch cannot be empty"
        });
    }

    if (!req.body.dbName) {
        return res.status(400).send({
            message: "Mssql dbName cannot be empty"
        });
    }

    if (!req.body.environment) {
        return res.status(400).send({
            message: "Mssql environment cannot be empty"
        });
    }

    if (!req.body.appAccount) {
        return res.status(400).send({
            message: "Mssql appAccount cannot be empty"
        });
    }

    if (!req.body.dbJobs) {
        return res.status(400).send({
            message: "Mssql dbJobs cannot be empty"
        });
    }

    if (!req.body.knowedIssues) {
        return res.status(400).send({
            message: "Mssql knowedIssues cannot be empty"
        });
    }

    if (!req.body.frequenRequests) {
        return res.status(400).send({
            message: "Mssql frequenRequests cannot be empty"
        });
    }

    if (!req.body.specificities) {
        return res.status(400).send({
            message: "Mssql specificities cannot be empty"
        });
    }

    if (typeof req.body.server !== 'undefined'){
        //console.log('multi users')
        Server.findOne({where: {id: req.body.server}})
        .then(server => {
            Mssql.create({
                bch: req.body.bch,
                dbName: req.body.dbName,
                environment: req.body.environment,
                appAccount: req.body.appAccount,
                dbJobs: req.body.dbJobs,
                knowedIssues: req.body.knowedIssues,
                frequenRequests: req.body.frequenRequests,
                specificities: req.body.specificities
            })
            .then(mssql => {
                mssql.setServer(server)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while creating Mssql"
                });
            });
        })
        .then(() => {
            //res.send(mssql);
            res.redirect('/mssql');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating Mssql"
            });
        });
    } else {
        return res.status(400).send({
            message: "Select one server"
        });
    }
};

exports.findAll = (req, res) => {
    Mssql.findAll({
        include: [Server]
    })
        .then(Mssqls => {
            res.send(Mssqls);
            //console.log(Mssqls);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving Mssqls"
            });
        });
};

exports.findOne = (req, res) => {
    Mssql.findById(req.params.MssqlId)
        .then(Mssql => {
            if (!Mssql) {
                return res.status(404).send({
                    message: "Mssql not found with id " + req.params.MssqlId
                });
            }
            res.send(Mssql);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Mssql not found with id " + req.params.MssqlId
                });
            }

            return res.status(500).send({
                message: "Error retrieving Mssql with id " + req.params.MssqlId
            });
        })
};