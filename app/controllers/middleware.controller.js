const db = require('../models/models');
const Middleware = db.middleware;
const User = db.user;
const Server = db.server;

exports.create = (req, res) => {
    if (!req.body.mwName) {
        return res.status(400).send({
            message: "Middleware Full Name cannot be empty"
        });
    }

    if (!req.body.startRequirements) {
        return res.status(400).send({
            message: "Middleware startRequirements cannot be empty"
        });
    }

    if (!req.body.nonStdConfig) {
        return res.status(400).send({
            message: "Middleware nonStdConfig cannot be empty"
        });
    }

    if (!req.body.dataPath) {
        return res.status(400).send({
            message: "Middleware dataPath cannot be empty"
        });
    }

    if (!req.body.knowedIssues) {
        return res.status(400).send({
            message: "Middleware knowedIssues cannot be empty"
        });
    }
    if (req.body.certificate.length > 0){
        //console.log('multi users')
        User.findAll({where: {id: req.body.certificate}})
        .then(users => {
            //console.log('found users: ' , users)
            Middleware.create({
                mwName: req.body.mwName,
                startRequirements: req.body.startRequirements,
                nonStdConfig: req.body.nonStdConfig,
                dataPath: req.body.dataPath,
                knowedIssues: req.body.knowedIssues
            })
            .then(middleware => {
                console.log('adding users to mw:' , middleware, users)
                middleware.addCertResponsibles(users)
                return middleware;
            })
            .then(middleware =>{
                Server.findOne({where: {id: req.body.server}})
                .then(server => {
                    console.log("adding server to MW: ", middleware, server);
                    middleware.setServer(server);
                })
                .catch(err =>{
                    res.status(500).send({
                        message: err.message || "Some error occured while creating Middleware (serveradd)"
                    });
                })
            })
            .then(() => {
                res.redirect('/middleware')
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while creating Middleware"
                });
            });
        })
    } else {
        console.log('no user selected')
        Middleware.create({
            mwName: req.body.mwName,
            startRequirements: req.body.startRequirements,
            nonStdConfig: req.body.nonStdConfig,
            dataPath: req.body.dataPath,
            knowedIssues: req.body.knowedIssues
        })
        .then(middleware => {
            res.redirect('/middleware')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating Middleware"
            });
        });
    }
};

exports.findAll = (req, res) => {
    Middleware.findAll({
        include: [Server]
    })
        .then(Middlewares => {
            //console.log(Middlewares);
            res.send(Middlewares);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving Middlewares"
            });
        });
};

exports.findOne = (req, res) => {
    Middleware.findById(req.params.MiddlewareId)
        .then(Middleware => {
            if (!Middleware) {
                return res.status(404).send({
                    message: "Middleware not found with id " + req.params.MiddlewareId
                });
            }
            res.send(Middleware);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Middleware not found with id " + req.params.MiddlewareId
                });
            }

            return res.status(500).send({
                message: "Error retrieving Middleware with id " + req.params.MiddlewareId
            });
        })
};