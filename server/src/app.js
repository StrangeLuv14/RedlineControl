import createError from 'http-errors'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import logger from 'morgan'
import cors from 'cors'

// mongoDB setup

import mongoose from 'mongoose'
import utils from './models/utils'
mongoose.connect(`mongodb://${process.env.MONGODB_HOST}:27017/RedlineControl`, {useNewUrlParser: true})

import fs from 'fs'

const db = mongoose.connection
db.on('open', function() {
    log(`Database connected to ${process.env.MONGODB_HOST}`)
    utils.loadDatabase(db.db)
})
db.on('error', () => error(`Database connection to ${env.MONGODB_HOST} failed.`))

import indexRouter from './routes/index'
import controlRouter from './routes/control'
import albumRouter from './routes/album'
import playbackRouter from './routes/playback'

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter)
app.use('/control', controlRouter)
app.use('/albums', albumRouter)
app.use('/playback', playbackRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development'
        ? err
        : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err);
});

module.exports = app;
