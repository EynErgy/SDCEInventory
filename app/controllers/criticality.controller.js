const db = require('../models/models');
const Criticality = db.criticality;

exports.create = (req, res) => {
    if (!req.body.level) {
        return res.status(400).send({
            message: "Criticality level cannot be empty"
        });
    }

    if (!req.body.description) {
        return res.status(400).send({
            message: "Criticality description cannot be empty"
        });
    }

    Criticality.create({
        level: req.body.level,
        description: req.body.description
    })
        .then(criticality => {
            //res.send(criticality);
            res.redirect('/criticality');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating Criticality"
            });
        });
};

exports.findAll = (req, res) => {
    Criticality.findAll()
        .then(Criticalitys => {
            res.send(Criticalitys);
            //console.log(Criticalitys);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving Criticalitys"
            });
        });
};

exports.findOne = (req, res) => {
    Criticality.findById(req.params.CriticalityId)
        .then(Criticality => {
            if (!Criticality) {
                return res.status(404).send({
                    message: "Criticality not found with id " + req.params.CriticalityId
                });
            }
            res.send(Criticality);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Criticality not found with id " + req.params.CriticalityId
                });
            }

            return res.status(500).send({
                message: "Error retrieving Criticality with id " + req.params.CriticalityId
            });
        })
};