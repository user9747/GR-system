const express = require('express')
const router = express.Router()
const cellMethods = require('../../../methods/cell')
const peopleMethods = require('../../../methods/people')
const bcrypt = require('bcrypt')

router.get('/getProfile', (req,res) => {
    var info = {
        username: req.query.username
    }
    cellMethods.getUserByUsername(info)
    .then((cell) => {
        info.people_id = cell.people_id
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
    .then((cell) => {
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
})

module.exports = router