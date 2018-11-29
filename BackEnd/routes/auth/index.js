const express = require('express')
const router  = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const userMethods = require('../../methods/user')

/* POST login. */
router.post('/login', function (req, res, next) {

    passport.authenticate('user_local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.json({
                error: info.message
            })
        }

       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err)
           }

           // generate a signed son web token with the contents of user object and return it in the response
           

           const token = jwt.sign({'user_name': user.user_name, 'usertype' : 'user' }, 'poda_albine_and_akhile_and_bilale')         
           return res.json({
               'username': user.user_name,
               'usertype': 'user',
                'token': token
            })
        })
    })(req, res)
})

router.post('/register', function(req, res, next){
    var info = {}
    info.username = req.body.username
    info.password = req.body.password
    info.admNo = req.body.admission_number
    info.type = req.body.type
    userMethods.addUser(info)
    .then((user) => {
        return res.json({
            'success': true,
            'message': 'New user created'
        })
    })
    .catch((err) => {
        console.log("Error caught inside register route");
        if(err.message == "No student"){
            return res.json({
                'success': false,
                'message': 'Incorrect admission number'
            })
        }else if(err.message == "Validation error"){
            return res.json({
                'success': false,
                'message': 'username already taken'
            })
        }else if(err.message = "Account exists for the admission number"){
            return res.json({
                'success': false,
                "message": "Account exists for the admission number"
            })
        }
        return res.json({
            'success': false,
            'message': 'An error has occurred'
        })
    })

})

router.post('/celllogin', function (req,res,next){
    passport.authenticate('cell_login', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.json({
                error: info.message
            })
        }

       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err)
           }

           // generate a signed son web token with the contents of user object and return it in the response
           

           const token = jwt.sign({'user_name': user.user_name, 'usertype': 'cell' }, 'poda_albine_and_akhile_and_bilale')         
           return res.json({
               'username': user.user_name,
               'usertype': 'cell',
                'token': token
            })
        })
    })(req, res)
})
module.exports = router