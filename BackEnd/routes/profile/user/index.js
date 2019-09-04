const express = require('express')
const router = express.Router()
const userMethods = require('../../../methods/user')
const peopleMethods = require('../../../methods/people')

router.get('/profile',(req,res) => {
    var info = {
        username: req.query.username
    }
    userMethods.findUserByUsername(info)
    .then((user) => {
        info.people_id = user.people_id
        peopleMethods.getPeopleByID(info)
        .then((people) => {
            res.json({
                success:true,
                name:people.name,
                email:people.email,
                phone:people.phone
            })
        })
    })
    .catch((err) => {
        res.json({
            success:false,
            err:err.message
        })
    })
})

router.post('/updateProfile', (req,res) => {
    var info = req.body.data
    peopleMethods.updateProfile(info)
    .then((user) => {
        res.json({
            success:true
        })
    })
    .catch((err) => {
        res.json({
            success:false,
            err:err.message
        })
    })
})

router.post('/updatepwd',(req,res) => {
    var info = {
        username: req.body.username,
        old: req.body.old,
        password: req.body.password
    }
    userMethods.findUserByUsername(info)
    .then((user) => {
        bcrypt.compare(info.old,user.password)
        .then((val) => {            
            if(val == true){
                newinfo = {
                    user_id: user.user_id,
                    password: info.password
                }
                bcrypt.hash(newinfo.password,10)
                .then((hashPass) => {
                    newinfo.password = hashPass
                    userMethods.updateUser(newinfo)
                    .then((result) => {
                        res.json({
                            "success":true
                        })
                    })
                    .catch((err) => {
                        res.json({
                            "success":false,
                            "err":err.message
                        })
                    })
                })
                .catch((err) => {
                    res.json({
                        "success":false,
                        "err":err.message
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
        .catch((err) => {
            res.json({
                "success":false,
                "err":err.message
            })
        })
    })
    .catch((err) => {
        res.json({
            success:false,
            err:err.message
        })
    })
})

module.exports = router