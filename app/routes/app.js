var express = require('express');
var router = express.Router();
const apps = require('../controllers/app.controller.js');

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('app', { title: 'Apps' , layout: "layout-app"});
});

router.get('/add', function(req, res, next) {
  res.render('appAdd', {title: 'Add App', layout: "layout-appAdd"});
});
router.post('/add', apps.create);
router.get('/all', apps.findAll);

module.exports = router;