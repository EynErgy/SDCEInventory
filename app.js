const express = require('express');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const rfs = require('rotating-file-stream');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');

const indexRouter = require('./app/routes/index');
const appRouter = require('./app/routes/app');
const userRouter = require('./app/routes/user');
const serverRouter = require('./app/routes/server');
const criticalityRouter = require('./app/routes/criticality');
const middlewareRouter = require('./app/routes/middleware');
const oracleRouter = require('./app/routes/oracle');
const mssqlRouter = require('./app/routes/mssql');

require('dotenv').config();

const db = require('./app/models/models');
// for debug only, recreate tables
/*
db.sequelize.sync({ force: true }).then( () => {
    console.log('Sync DB');
});
*/
// Prod

db.sequelize.sync().then( () => {
    console.log('Sync DB');
});

//

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app/partials'))


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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app/public')));
app.use('/assets/vendor/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
app.use('/assets/vendor/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));
app.use('/assets/vendor/popper.js', express.static(path.join(__dirname, 'node_modules', 'popper.js', 'dist')));
app.use('/assets/vendor/feather-icons', express.static(path.join(__dirname, 'node_modules', 'feather-icons', 'dist')));
app.use('/assets/vendor/datatables.net', express.static(path.join(__dirname, 'node_modules', 'datatables.net', 'js')));
app.use('/assets/vendor/datatables.net-bs4', express.static(path.join(__dirname, 'node_modules', 'datatables.net-bs4', 'js')));
app.use('/assets/vendor/datatables.net-bs4_css', express.static(path.join(__dirname, 'node_modules', 'datatables.net-bs4', 'css')));

// routes here
app.use('/', indexRouter);
app.use('/app', appRouter);
app.use('/user', userRouter);
app.use('/server', serverRouter);
app.use('/criticality', criticalityRouter);
app.use('/middleware', middlewareRouter);
app.use('/mssql', mssqlRouter);
app.use('/oracle', oracleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

// start app
app.listen(process.env.PORT, () => {
    console.log("Server in " + process.env.NODE_ENV + " mode");
    console.log("SDCE Docs server running on port " + process.env.PORT);
});