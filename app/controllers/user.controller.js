const db = require('../models/models');
const User = db.user;

exports.create = (req, res) => {
    if (!req.body.fullName) {
        return res.status(400).send({
            message: "User Full Name cannot be empty"
        });
    }

    if (!req.body.email) {
        return res.status(400).send({
            message: "User eMail cannot be empty"
        });
    }

    if (!req.body.phone) {
        return res.status(400).send({
            message: "User phone cannot be empty"
        });
    }

    User.create({
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone
    })
        .then(user => {
            //res.send(user);
            res.redirect('/user');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating User"
            });
        });
};

exports.findAll = (req, res) => {
    User.findAll()
        .then(Users => {
            res.send(Users);
            //console.log(Users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving Users"
            });
        });
};

exports.findOne = (req, res) => {
    User.findById(req.params.UserId)
        .then(User => {
            if (!User) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.UserId
                });
            }
            res.send(User);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.UserId
                });
            }

            return res.status(500).send({
                message: "Error retrieving User with id " + req.params.UserId
            });
        })
};