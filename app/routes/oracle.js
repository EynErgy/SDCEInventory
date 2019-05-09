var express = require('express');
var router = express.Router();
const oracles = require('../controllers/oracle.controller.js');

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('oracle', { title: 'Oracle' , layout: "layout-oracle"});
});

router.get('/add', function(req, res, next) {
  res.render('oracleAdd', {title: 'Add Oracle', layout: "layout-oracleAdd", action: '/oracle/add'});
});
router.post('/add', oracles.create);
router.get('/all', oracles.findAll);
router.get('/edit/:Id', oracles.edit);
router.post('/edit/:Id', oracles.modify);

module.exports = router;