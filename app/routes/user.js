var express = require('express');
var router = express.Router();
const users = require('../controllers/user.controller.js');

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('user', { title: 'Users' , layout: "layout-user"});
});

router.get('/add', function(req, res, next) {
  res.render('userAdd', {title: 'Add User'});
});
router.post('/add', users.create);
router.get('/edit/:userId', users.edit);
router.post('/edit/:userId', users.modify);
router.get('/all', users.findAll);

module.exports = router;