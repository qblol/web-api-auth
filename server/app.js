const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
// CHANGE TO YOUR DESIRE DATABASE
mongoose.connect('mongodb://localhost/cms');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy
const morgan = require('morgan');
app.use(morgan('dev'));

// CHANGE TO YOUR DESIRE ROUTES
const users = require('./routes/UserRoutes');
const datas = require('./routes/DataRoutes');
const tanggal = require('./routes/TanggalRoutes');
app.use('/api/users', users);
app.use('/api/datas', datas);
app.use('/api/tanggal', tanggal);

app.listen(3000);

module.exports = app;
