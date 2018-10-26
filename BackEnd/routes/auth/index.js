const express = require('express')
const router  = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const userMethods = require('../../methods/user')

/* POST login. */
router.post('/login', function (req, res, next) {

    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            })
        }

       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err)
           }

           // generate a signed son web token with the contents of user object and return it in the response

           const token = jwt.sign(user.toJSON(), 'poda_albine_and_akhile_and_bilale')         
           return res.json({
               'username': user.user_name,
                'JWT token': token
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
module.exports = router