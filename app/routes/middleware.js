var express = require('express');
var router = express.Router();
const middlewares = require('../controllers/middleware.controller.js');

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('middleware', { title: 'Middleware' , layout: "layout-middleware"});
});

router.get('/add', function(req, res, next) {
  res.render('middlewareAdd', {title: 'Add User'});
});
router.post('/add', middlewares.create);
router.get('/all', middlewares.findAll);

module.exports = router;