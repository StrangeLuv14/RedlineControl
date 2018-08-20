'use strict';

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _utils = require('./models/utils');

var _utils2 = _interopRequireDefault(_utils);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _control = require('./routes/control');

var _control2 = _interopRequireDefault(_control);

var _album = require('./routes/album');

var _album2 = _interopRequireDefault(_album);

var _playback = require('./routes/playback');

var _playback2 = _interopRequireDefault(_playback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// mongoDB setup

_mongoose2.default.connect('mongodb://' + process.env.MONGODB_HOST + ':27017/RedlineControl', { useNewUrlParser: true });

var db = _mongoose2.default.connection;
db.on('open', function () {
    log('Database connected to ' + process.env.MONGODB_HOST);
    _utils2.default.loadDatabase(db.db);
});
db.on('error', function () {
    return error('Database connection to ' + env.MONGODB_HOST + ' failed.');
});

var app = (0, _express2.default)();

app.use((0, _morgan2.default)('dev'));
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use((0, _cors2.default)());
app.use(_express2.default.static(_path2.default.join(__dirname, '../public')));

app.use('/', _index2.default);
app.use('/control', _control2.default);
app.use('/albums', _album2.default);
app.use('/playback', _playback2.default);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, _httpErrors2.default)(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err);
});

module.exports = app;