const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const rfs = require('rotating-file-stream');
const logger = require('morgan');
const Sequelize = require('sequelize');
var sequelize = require('./app/common/database.js');

require('dotenv').config();

/* for debug only, recreate tables
sequelize.sync({ force: true }).then( () => {
    console.log('Sync DB');
});
*/
// Prod
sequelize.sync().then( () => {
    console.log('Sync DB');
});
//

const app = express();

var logStream;
if (process.env.REQUEST_LOG_FILE) {
    (async () => {
        let logDirectory = path.dirname(process.env.REQUEST_LOG_FILE);
        await fs.ensureDir(logDirectory);
        logStream = rfs(process.env.REQUEST_LOG_FILE, {
            size: '10M',
            interval: '1d',
            compress: 'gzip'
        });
    }) ().catch(err => {console.error(err);});
}
app.use(logger(process.env.REQUEST_LOG_FORMAT || 'dev', {
    stream: logStream ? logStream : process.stdout
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (requestAnimationFrame, res) => {
    res.json({"message": "Welcome"});
});

// routes here

// start app
app.listen(process.env.PORT, () => {
    console.log("API server running on port " + process.env.PORT);
});