var express = require('express');
var router = express.Router();
const docx = require('../controllers/docx.controller');

/* GET home page. */
router.get('/test', docx.test);
router.get('/sdce/:appId', docx.sdce);
router.get('/excel/servers', docx.xlsServer);

module.exports = router;
