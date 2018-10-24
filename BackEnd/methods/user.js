const model = require('../models').user
const uniqid = require('uniqid')
const Promise = require('bluebird')
const studentMethods = require('./student')
const Joi = require('joi')
const bcrypt = require('bcrypt')

var userMethods = {}


const schema = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    password: Joi.string(),
    admNo: Joi.string().alphanum(),
    type: Joi.string()
})

userMethods.addUser = (info)=>{
    return new Promise((resolve, reject) => {
        if(info.type == 'student'){
            Joi.validate(info,schema, (err, value) => {
                if(err === null){
                    studentMethods.getStudentByAdmNo(info.admNo)
                    .then((student) => {
                        
                        bcrypt.hash(info.password, 10)
                        .then((hashPass) => {

                            var userinfo = {
                                user_id: uniqid(info.username),
                                people_id: student.people_id,
                                user_name: info.username,
                                password: hashPass
                            }
                            console.log(userinfo)
                            model.create(userinfo)
                            .then((user) => {
                                console.log("Inside user methods\nSuccessfully created user");
                                
                                resolve(user)
                            })
                            .catch((err) => {
                                console.log("Inside userMethods\nError caught inside create "+err.message);                            
                                reject(err)
                            })
                        })
                        .catch((err) => {
                            console.log("Inside userMethods\nError caught hash "+err.message);                            
                            reject(err)
                        })
                    })
                    .catch((err) => {
                        console.log("Inside userMethods\nError caught student "+err.message);                            
                        reject(err)
                    })
                }
                else{
                    console.log("Inside userMethods\nError caught validation "+err.message);                            
                    reject(err)
                }
            })
        }
        else{
            reject(new Error("Undefined type of user"))
        }
    })
}

userMethods.findUserByUsername = (info) => {
    return new Promise((resolve, reject) => {
        model.findOne({
            where: {
                user_name : info.username
            }
        })
        .then((user) => {
            resolve(user)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

module.exports = userMethods