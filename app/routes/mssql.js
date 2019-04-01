var express = require('express');
var router = express.Router();
const mssqls = require('../controllers/mssql.controller.js');

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('mssql', { title: 'MS SQL' , layout: "layout-mssql"});
});

router.get('/add', function(req, res, next) {
  res.render('mssqlAdd', {title: 'Add User', layout: "layout-mssqlAdd", action: '/mssql/add'});
});
router.post('/add', mssqls.create);
router.get('/all', mssqls.findAll);
router.get('/edit/:Id', mssqls.edit);
router.post('/edit/:Id', mssqls.modify);

module.exports = router;