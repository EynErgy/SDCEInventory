var express = require('express');
var router = express.Router();
const middlewares = require('../controllers/middleware.controller.js');

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('middleware', { title: 'Middleware' , layout: "layout-middleware"});
});

router.get('/add', function(req, res, next) {
  res.render('middlewareAdd', {title: 'Add User', layout:"layout-middlewareAdd", action: '/middleware/add'});
});
router.post('/add', middlewares.create);
router.get('/all', middlewares.findAll);
router.get('/edit/:Id', middlewares.edit);
router.post('/edit/:Id', middlewares.modify);

module.exports = router;