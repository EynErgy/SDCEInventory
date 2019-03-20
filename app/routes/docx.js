var express = require('express');
var router = express.Router();
const docx = require('../controllers/docx.controller');

/* GET home page. */
router.get('/test', docx.test);

module.exports = router;