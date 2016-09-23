'use strict';
var express = require('express');
var router = express.Router();
// var db = require('../db/connectDB.js');

router.get('/', (req, res, next)=>{
res.render('index', {testVar:"Hello World!"});
});

module.exports = router