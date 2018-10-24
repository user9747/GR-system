var express = require('express');
var router = express.Router();
var authRouter = require('./auth')
var grievRouter = require('./grievance')
var passport = require('passport')
require('../middlewares/passport')

/* GET home page. */
router.use('/auth',authRouter)
router.use('/grievance',passport.authenticate('jwt', {session: false}), grievRouter)

module.exports = router;
