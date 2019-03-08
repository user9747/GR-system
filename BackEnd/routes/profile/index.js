var express = require('express');
var router = express.Router();
var userRouter = require('./user')
var cellRouter = require('./cell')
var passport = require('passport')
require('../../middlewares/passport')

/* GET home page. */
router.use('/user',passport.authenticate('user_auth', {session: false}), userRouter)
router.use('/cell',passport.authenticate('cell_auth', {session: false}), cellRouter)


module.exports = router;