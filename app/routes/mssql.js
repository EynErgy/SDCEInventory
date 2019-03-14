var express = require('express');
var router = express.Router();
const mssqls = require('../controllers/mssql.controller.js');

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('mssql', { title: 'MS SQL' , layout: "layout-mssql"});
});

router.get('/add', function(req, res, next) {
  res.render('mssqlAdd', {title: 'Add User', layout: "layout-mssqlAdd"});
});
router.post('/add', mssqls.create);
router.get('/all', mssqls.findAll);

module.exports = router;