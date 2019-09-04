const express = require('express')
const router  = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const userMethods = require('../../methods/user')
const cellMethods = require('../../methods/cell')
const peopleMethods = require('../../methods/people')
const studentMethods = require('../../methods/student')
const verificationMethods = require('../../methods/verification')
const mailer = require('../../middlewares/mail')
const uid = require('uniqid')
const fs = require('fs')
const bcrypt = require('bcrypt')

/* POST login. */
router.post('/login', function (req, res, next) {

    passport.authenticate('user_local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.json({
                error: info.message
            })
        }

        if(user.isVerified == false){
            res.json({
                "username":user.user_name,
                "verified":false
            })
        }

       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err)
           }

           // generate a signed son web token with the contents of user object and return it in the response
           
 
           const token = jwt.sign({'user_name': user.user_name, 'usertype' : 'user' }, 'poda_albine_and_akhile_and_bilale')         

           if(!fs.existsSync(__dirname+'/../../uploads/'+user.user_name)){
                fs.mkdir(__dirname+'/../../uploads/'+user.user_name, { recursive: true }, (err) => {
                    if (err) throw err;
                });
           }
           return res.json({
               'username': user.user_name,
               'usertype': 'user',
                'token': token,
                "verified":true
            })
        })
    })(req, res)
})

/* router.post('/register', function(req, res, next){
    var info = {}
    info.username = req.body.username
    info.password = req.body.password
    info.admNo = req.body.admission_number
    info.type = req.body.type
    userMethods.addUser(info)
    .then((user) => {
        if(!fs.existsSync('./uploads/'+user.user_name)){
            fs.mkdir('./uploads/'+user.user_name, { recursive: true }, (err) => {
                if (err) throw err;
            });
        }
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

}) */

router.post('/joinadmin',(req,res,next) => {
    var person = {}
    person.people_id = uid();
    person.name = req.body.name
    person.role = 'admin'
    person.email = req.body.email
    person.phone = req.body.phone
    peopleMethods.addPerson(person)
    .then((ppl) => {
        var user = {}
        user.user_name = req.body.username
        user.password = req.body.password
        user.cell_id = uid(user.user_name)
        user.people_id = ppl.people_id
        cellMethods.addNewUser(user)
        .then((user) => {
            res.json({
                "Success":true,
                "username":user.user_name
            })
            
        })
        .catch((err) => {
            if(err.message == "Validation error"){
                peopleMethods.removePerson(ppl)
                .then((result) => {
                    res.json({
                        "Success":false,
                        "error":"username already in use"
                    })
                })
                .catch((err) => {
                    res.json({
                        "Success":false,
                        "error":err.message
                    })
                })
            }
            else{
                res.json({
                    "Success":false,
                    "error":err.message
                })
            }
        })
    })
    .catch((err) => {
        if(err.message == "Validation error"){
            res.json({
                "Success":false,
                "error":"Email already in use"
            })
        }
        else{
            res.json({
                "Success":false,
                "error":err.message
            })
        }        
    })

})

router.post('/celljoin',(req,res,next) => {
    var person = {}
    person.people_id = uid();
    person.name = req.body.name
    person.role = 'cell'
    person.email = req.body.email
    person.phone = req.body.phone
    peopleMethods.addPerson(person)
    .then((ppl) => {
        var user = {}
        user.user_name = req.body.username
        user.password = req.body.password
        user.cell_id = uid(user.user_name)
        user.people_id = ppl.people_id
        cellMethods.addNewUser(user)
        .then((user) => {
            res.json({
                "Success":true,
                "username":user.user_name
            })
            
        })
        .catch((err) => {
            if(err.message == "Validation error"){
                peopleMethods.removePerson(ppl)
                .then((result) => {
                    res.json({
                        "Success":false,
                        "error":"username already in use"
                    })
                })
                .catch((err) => {
                    res.json({
                        "Success":false,
                        "error":err.message
                    })
                })
            }
            else{
                res.json({
                    "Success":false,
                    "error":err.message
                })
            }
        })
    })
    .catch((err) => {
        if(err.message == "Validation error"){
            res.json({
                "Success":false,
                "error":"Email already in use"
            })
        }
        else{
            res.json({
                "Success":false,
                "error":err.message
            })
        }        
    })

})


router.post('/join',(req,res,next) => {
    var person = {}
    person.people_id = uid();
    person.name = req.body.name
    person.role = 'user'
    person.email = req.body.email
    person.phone = req.body.phone
    peopleMethods.addPerson(person)
    .then((ppl) => {
        var user = {}
        user.user_name = req.body.username
        user.password = req.body.password
        user.user_id = uid(user.user_name)
        user.people_id = ppl.people_id
        user.isVerified = false
        userMethods.addNewUser(user)
        .then((user) => {
            var ver_info = {
                user_id: user.user_id
            }
            verificationMethods.createToken(ver_info)
            .then((result) => {
                mailer.Send({
                    email:ppl.email,
                    username:ppl.name,
                    subject: 'Verification token for Grievance Cell CET',
                    content: 'Your verification token for Grievance Cell online portal is <b>'+result.verification_token+'</b><br /> For any assistance contact us at grievancecell@cet.ac.in',
                })
                res.json({
                    "Success":true,
                    "username":user.user_name
                })
            })
            .catch((err) => {
                peopleMethods.removePerson(ppl)
                .then((result) => {
                    res.json({
                        "Success":false,
                        "error":err.message
                    })
                })
                .catch((err) => {
                    res.json({
                        "Success":false,
                        "error":err.message
                    })
                })
            })
            
        })
        .catch((err) => {
            if(err.message == "Validation error"){
                peopleMethods.removePerson(ppl)
                .then((result) => {
                    res.json({
                        "Success":false,
                        "error":"username already in use"
                    })
                })
                .catch((err) => {
                    res.json({
                        "Success":false,
                        "error":err.message
                    })
                })
            }
            else{
                res.json({
                    "Success":false,
                    "error":err.message
                })
            }
        })
    })
    .catch((err) => {
        if(err.message == "Validation error"){
            res.json({
                "Success":false,
                "error":"Email already in use"
            })
        }
        else{
            res.json({
                "Success":false,
                "error":err.message
            })
        }        
    })

})

router.post('/verify',(req,res) => {
    var info = {}
    userMethods.findUserByUsername({
        username: req.body.username
    })
    .then((user) => {
        info.user_id = user.user_id
        verificationMethods.returnToken(info)
        .then((result) => {
            if(result.verification_token == req.body.verification_token){
                userMethods.updateUser({
                    user_id: info.user_id,
                    isVerified: true
                })
                .then((data) => {
                    res.json({
                        "Success":true
                    })
                })
                .catch((err) => {
                    res.json({
                        "Success":false,
                        "error":err.message
                    })
                })
            }
            else{
                res.json({
                    "Success":false,
                    "error":"Incorrect verification token"
                })
            }
        })
        .catch((err) => {
            res.json({
                "Success":false,
                "error":err.message
            })
        })
    })
    .catch((err) => {
        res.json({
            "Success":false,
            "error":err.message
        })
    })
})

router.post('/studentinfo',(req,res) => {
    var info = {
        admission_no: req.body.admission_no,
        department: req.body.department,
        date_of_join: req.body.date,
        course: req.body.course
    }
    userMethods.findUserByUsername({
        username:req.body.username
    })
    .then((user) => {
        info.people_id = user.people_id
        studentMethods.addStudent(info)
        .then((result) => {
            res.json({
                "Success":true
            })
        })
        .catch((err) => {
            res.json({
                "Success":false,
                "error":err.message
            })
        })    
    })
    .catch((err) => {
        res.json({
            "Success":false,
            "error":err.message
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
           
           cellMethods.getUserByUsername({
               username: user.user_name
           })
           .then((cell) => {
               peopleMethods.getPeopleByID({
                   people_id : cell.people_id
               })
               .then((ppl) => {
                const token = jwt.sign({'user_name': user.user_name, 'usertype': ppl.role }, 'poda_albine_and_akhile_and_bilale')         
                return res.json({
                    'username': user.user_name,
                    'usertype': ppl.role,
                     'token': token
                 })
               })
               .catch((err) => {
                   res.send(err)
               })
           })
           .catch((err) => {
               res.send(err);
           })
        })
    })(req, res)
})

/* router.post('/changepwd',(req,res) => {
    var info = {
        username: req.body.username,
        old: req.body.old,
        password: req.body.password
    }
    cellMethods.getUserByUsername(info)
    .then((cell) => {
        bcrypt.compare(info.old,cell.password)
        .then((val) => {            
            if(val == true){
                newinfo = {
                    cell_id: cell.cell_id,
                    password: info.password
                }
                cellMethods.updatePassword(newinfo)
                .then((data) => {
                    res.json({
                        success:true
                    })
                })
            }
            else{
                res.json({
                    success:false,
                    err:'Incorrect Password'
                })
            }
        })
    })
    .catch((err) => {
        res.json({
            success:false,
            err:err.message
        })
    })
}) */
module.exports = router