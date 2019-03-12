var express = require('express');
var router = express.Router();
const criticalities = require('../controllers/criticality.controller.js');

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('criticality', { title: 'Users' , layout: "layout-criticality"});
});

router.get('/add', function(req, res, next) {
  res.render('criticalityAdd', {title: 'Add Criticality'});
});
router.post('/add', criticalities.create);
router.get('/all', criticalities.findAll);

module.exports = router;