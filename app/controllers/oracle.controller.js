const db = require('../models/models');
const Oracle = db.oracle;
const Server = db.server;

exports.create = (req, res) => {
    
    if (!req.body.bch) {
        return res.status(400).send({
            message: "Oracle bch cannot be empty"
        });
    }
    if (!req.body.dbName) {
        return res.status(400).send({
            message: "Oracle dbName cannot be empty"
        });
    }
    if (!req.body.environment) {
        return res.status(400).send({
            message: "Oracle environment cannot be empty"
        });
    }
    if (!req.body.appAccount) {
        return res.status(400).send({
            message: "Oracle appAccount cannot be empty"
        });
    }
    if (!req.body.ownerAccount) {
        return res.status(400).send({
            message: "Oracle ownerAccount cannot be empty"
        });
    }
    if (!req.body.dbJobs) {
        return res.status(400).send({
            message: "Oracle dbJobs cannot be empty"
        });
    }
    if (!req.body.crontabs) {
        return res.status(400).send({
            message: "Oracle crontabs cannot be empty"
        });
    }
    if (!req.body.knowedIssues) {
        return res.status(400).send({
            message: "Oracle knowedIssues cannot be empty"
        });
    }
    if (!req.body.frequenRequests) {
        return res.status(400).send({
            message: "Oracle frequenRequests cannot be empty"
        });
    }

    if (req.body.server.length == 1){
        //console.log('multi users')
        Server.findOne({where: {id: req.body.server}})
        .then(server => {
            Oracle.create({
                bch: req.body.bch,
                dbName: req.body.dbName,
                environment: req.body.environment,
                appAccount: req.body.appAccount,
                ownerAccount: req.body.ownerAccount,
                dbJobs: req.body.dbJobs,
                crontabs: req.body.crontabs,
                knowedIssues: req.body.knowedIssues,
                frequenRequests: req.body.frequenRequests
            })
            .then(oracle => {
                oracle.setServer(server)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while creating Oracle"
                });
            });
        })
        .then(() => {
            //res.send(mssql);
            res.redirect('/oracle');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating Oracle"
            });
        });
    } else {
        return res.status(400).send({
            message: "Select one server"
        });
    }
};

exports.findAll = (req, res) => {
    Oracle.findAll()
        .then(Oracles => {
            res.send(Oracles);
            //console.log(Oracles);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving Oracles"
            });
        });
};

exports.findOne = (req, res) => {
    Oracle.findById(req.params.OracleId)
        .then(Oracle => {
            if (!Oracle) {
                return res.status(404).send({
                    message: "Oracle not found with id " + req.params.OracleId
                });
            }
            res.send(Oracle);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Oracle not found with id " + req.params.OracleId
                });
            }

            return res.status(500).send({
                message: "Error retrieving Oracle with id " + req.params.OracleId
            });
        })
};