import createError from 'http-errors'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import logger from 'morgan'
import cors from 'cors'

// mongoDB setup
import mongodb from 'mongodb'
import mongoose from 'mongoose'
import utils from './models/utils'
mongoose.connect('mongodb://localhost:27017/RedlineControl', {useNewUrlParser: true})

import fs from 'fs'

const db = mongoose.connection
db.on('open', function() {
    log('Database opened')
    const that = db
    fs.readdir('./public/media', (err, files) => {
        if (err) {
            console.log(`Read media folder failed: ${err.message}`)
            console.log('Create media folder')
            fs.mkdir('./public/media', (err) => {
                if (err) {
                    console.log(`Create media folder failed: ${err.message}`);
                }
            })
        }
        if (!files || files.length === 0) {
            console.log('Media folder is empty, download files');
            const bucket = new mongodb.GridFSBucket(db.db)

            // get gridFS file collections
            const File = db.collection('fs.files')
            File.find({}).toArray().then(files => {
                files.forEach(file => {
                    try {
                        fs.mkdirSync('./public/media/' + file.filename.split('/')[0])
                    } catch (e) {}
                    const filepath = __dirname + '/public/media/' + file.filename
                    bucket.openDownloadStream(file._id).pipe(fs.createWriteStream(filepath)).on('error', (err) => {
                        console.log(`Error download: ${err.message}`)
                    }).on('end', () => {
                        console.log(`${filepath}`);
                    })
                })
            }).catch(err => {
                console.log(err);
            })
        }
    })
    // this.dropDatabase().then(() => {
    //     console.log('dropDatabase')
    //     utils.buildFromFile()
    // }).catch(err => console.error(err))
})
db.on('error', () => console.error('Database connection failed'))

import controlRouter from './routes/control'
import albumRouter from './routes/album'
import playbackRouter from './routes/playback'

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
// directory for video thumbnail
// app.use(express.static(path.join(__dirname, 'public/media')));

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
