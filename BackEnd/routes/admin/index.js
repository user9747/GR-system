var peopleMethods = require('../../methods/people')
var userMethods = require('../../methods/user')
var cellMethods = require('../../methods/cell')
var bcrypt = require('bcrypt')
var express = require('express')
var router = express.Router()

router.post('/changepwd',(req,res) => {
    console.log("Inside req");
    var info = {}
    info.username = req.body.username
    info.password = req.body.password
    if(req.body.type == "user"){
        userMethods.findUserByUsername(info)
        .then((user) => {
            info.user_id = user.user_id
            bcrypt.hash(info.password,10)
                .then((hashPass) => {
                    info.password = hashPass
                    userMethods.updateUser(info)
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
        })
        .catch((err) => {
            res.json({
                "sucess":false,
                "error":err.message
            })
        })
    }
    else if(req.body.type == "cell"){
        cellMethods.getUserByUsername(info)
        .then((cell) => {
            info.cell_id = cell.cell_id
            cellMethods.updatePassword(info)
            .then((data) => {
                res.json({
                    success:true
                })
            })
        })
        .catch((err) => {
            res.json({
                success:false,
                err:err.message
            })
        })
    }
    else{
        res.json({
            "success": false,
            "error": "Invalid type"
        })
    }
})

module.exports = router