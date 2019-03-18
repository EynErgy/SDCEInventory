const db = require('../models/models');
const App = db.application;
const Server = db.server;

exports.create = (req, res) => {
    if (!req.body.fullName) {
        return res.status(400).send({
            message: "App Full Name cannot be empty"
        });
    }

    if (!req.body.email) {
        return res.status(400).send({
            message: "App eMail cannot be empty"
        });
    }

    if (!req.body.phone) {
        return res.status(400).send({
            message: "App phone cannot be empty"
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