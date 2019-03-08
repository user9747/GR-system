const express = require('express')
const router = express.Router()
const cellMethods = require('../../../methods/cell')
const bcrypt = require('bcrypt')

router.post('/updateProfile', (req,res) => {
    var info = req.body.data
    cellMethods.updateProfile(info)
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