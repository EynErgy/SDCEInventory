const db = require('../models/models');
const Server = db.server;

exports.create = (req, res) => {
    if (!req.body.serverName) {
        return res.status(400).send({
            message: "Server Full Name cannot be empty"
        });
    }

    if (!req.body.vlanID) {
        return res.status(400).send({
            message: "Server eMail cannot be empty"
        });
    }

    if (!req.body.ipAddress) {
        return res.status(400).send({
            message: "Server phone cannot be empty"
        });
    }

    if (!req.body.monitoring) {
        return res.status(400).send({
            message: "Monitoring cannot be empty"
        });
    }

    if (!req.body.services) {
        return res.status(400).send({
            message: "Services cannot be empty"
        });
    }

    if (!req.body.schedulledJobs) {
        return res.status(400).send({
            message: "Schedulled Jobs cannot be empty"
        });
    }

    if (!req.body.usersRequirements) {
        return res.status(400).send({
            message: "Users Requirement cannot be empty"
        });
    }

    if (!req.body.adminGroup) {
        return res.status(400).send({
            message: "Admin Group cannot be empty"
        });
    }

    if (!req.body.description) {
        return res.status(400).send({
            message: "Description cannot be empty"
        });
    }

    if (!req.body.functionality) {
        return res.status(400).send({
            message: "Functionality cannot be empty"
        });
    }

    if (!req.body.startup) {
        return res.status(400).send({
            message: "Startup Order cannot be empty"
        });
    }

    if (!req.body.downtime) {
        return res.status(400).send({
            message: "Downtime Window cannot be empty"
        });
    }

    Server.create({
        serverName: req.body.serverName,
        environment: req.body.environment,
        vlanID: req.body.vlanID,
        ipAddress: req.body.ipAddress,
        platform: req.body.platform,
        monitoring: req.body.monitoring,
        services: req.body.services,
        schedulledJobs: req.body.schedulledJobs,
        usersRequirements: req.body.usersRequirements,
        adminGroup: req.body.adminGroup,
        description: req.body.description,
        functionality: req.body.functionality,
        startup: req.body.startup,
        downtime: req.body.downtime
    })
        .then(server => {
            //res.send(server);
            res.redirect('/server');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating Server"
            });
        });
};

exports.findAll = (req, res) => {
    Server.findAll({order:[['serverName', 'ASC']]})
        .then(Servers => {
            res.send(Servers);
            //console.log(Servers);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving Servers"
            });
        });
};

exports.findOne = (req, res) => {
    Server.findById(req.params.ServerId)
        .then(Server => {
            if (!Server) {
                return res.status(404).send({
                    message: "Server not found with id " + req.params.ServerId
                });
            }
            res.send(Server);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Server not found with id " + req.params.ServerId
                });
            }

            return res.status(500).send({
                message: "Error retrieving Server with id " + req.params.ServerId
            });
        })
};

exports.edit = (req, res) => {
    Server.findById(req.params.serverId)
        .then(server => {
            console.log(JSON.stringify(server))
            if (!server) {
                return res.status(404).send({
                    message: "Server not found with id (edit display)" + req.params.serverId
                });
            }
            res.render('serverAdd', { title: 'Edit Server', action: '/server/edit/' + req.params.serverId, server: server });
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Error for server with id " + req.params.serverId
                });
            }

            return res.status(500).send({
                message: "Error retrieving Server with id (edit display)" + req.params.serverId + " err: " + JSON.stringify(err)
            });
        })
};

exports.modify = (req, res) => {
    if (!req.body.serverName) {
        return res.status(400).send({
            message: "Server Full Name cannot be empty"
        });
    }

    if (!req.body.vlanID) {
        return res.status(400).send({
            message: "Server eMail cannot be empty"
        });
    }

    if (!req.body.ipAddress) {
        return res.status(400).send({
            message: "Server phone cannot be empty"
        });
    }

    if (!req.body.monitoring) {
        return res.status(400).send({
            message: "Monitoring cannot be empty"
        });
    }

    if (!req.body.services) {
        return res.status(400).send({
            message: "Services cannot be empty"
        });
    }

    if (!req.body.schedulledJobs) {
        return res.status(400).send({
            message: "Schedulled Jobs cannot be empty"
        });
    }

    if (!req.body.usersRequirements) {
        return res.status(400).send({
            message: "Users Requirement cannot be empty"
        });
    }

    if (!req.body.adminGroup) {
        return res.status(400).send({
            message: "Admin Group cannot be empty"
        });
    }

    if (!req.body.description) {
        return res.status(400).send({
            message: "Description cannot be empty"
        });
    }

    if (!req.body.functionality) {
        return res.status(400).send({
            message: "Functionality cannot be empty"
        });
    }

    if (!req.body.startup) {
        return res.status(400).send({
            message: "Startup Order cannot be empty"
        });
    }

    if (!req.body.downtime) {
        return res.status(400).send({
            message: "Downtime indow cannot be empty"
        });
    }

    Server.findById(req.params.serverId)
        .then(server => {
            if (!server) {
                return res.status(404).send({
                    message: "Server not found with id " + req.params.serverId
                });
            }
            server.update({
                serverName: req.body.serverName,
                environment: req.body.environment,
                vlanID: req.body.vlanID,
                ipAddress: req.body.ipAddress,
                platform: req.body.platform,
                monitoring: req.body.monitoring,
                services: req.body.services,
                schedulledJobs: req.body.schedulledJobs,
                usersRequirements: req.body.usersRequirements,
                adminGroup: req.body.adminGroup,
                description: req.body.description,
                functionality: req.body.functionality,
                startup: req.body.startup,
                downtime: req.body.downtime
            })
                .then(() => {
                    res.redirect('/server');
                })
                .catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "Server not found with id " + req.params.serverId
                        });
                    }

                    return res.status(500).send({
                        message: "Error retrieving Server with id " + req.params.serverId
                    });
                })
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Server not found with id " + req.params.serverId
                });
            }

            return res.status(500).send({
                message: "Error retrieving Server with id " + req.params.serverId
            });
        })
}
