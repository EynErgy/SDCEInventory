var express = require('express');
var router = express.Router();
const servers = require('../controllers/server.controller.js');

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('server', { title: 'Servers' , layout: "layout-server"});
});

router.get('/add', function(req, res, next) {
  res.render('serverAdd', {title: 'Add Server'});
});
router.post('/add', servers.create);
router.get('/all', servers.findAll);

module.exports = router;