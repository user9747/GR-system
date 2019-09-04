const model = require('../models').user
const uniqid = require('uniqid')
const Promise = require('bluebird')
const studentMethods = require('./student')
// const peopleMethods = require('./people')
const Joi = require('joi')
const bcrypt = require('bcrypt')

var userMethods = {}


const studSchema = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    password: Joi.string(),
    admNo: Joi.string().alphanum(),
    type: Joi.string()
})

userMethods.addUser = (info)=>{
    return new Promise((resolve, reject) => {
        if(info.type == 'student'){
            Joi.validate(info,studSchema, (err, value) => {
                if(err === null){
                    studentMethods.getStudentByAdmNo(info.admNo)
                    .then((student) => {
                        if(!student){
                            reject(new Error("No student"))
                        }
                        
                        bcrypt.hash(info.password, 10)
                        .then((hashPass) => {

                            var userinfo = {
                                user_id: uniqid(info.username),
                                people_id: student.people_id,
                                user_name: info.username,
                                password: hashPass
                            }
                            console.log(userinfo)
                            model.findOne({
                                where: {
                                    'people_id': student.people_id
                                }
                            }).
                            then((existingUser) => {
                                if(existingUser){
                                    console.log("User already exists")
                                    reject(new Error("Account exists for the admission number"))
                                }
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
                                console.log("Inside userMethods\n error caught at existing user "+err.message);
                                reject(err);
                                
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

userMethods.addNewUser = (info) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(info.password,10)
        .then((hashPass) => {
            info.password = hashPass
            model.create(info)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
        .catch((err) => {          
            reject(err)
        })
    })
}

userMethods.findUserByUsername = (info) => {
    console.log("hellooooo"+info)
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

userMethods.findUserByUserID = (info) => {
    return new Promise((resolve, reject) => {
        model.findOne({
            where: {
                user_id : info.user_id
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

userMethods.updateUser = (info) => {
    return new Promise((resolve,reject) => {
        model.update(info,{
            where:{
                user_id: info.user_id
            }
        })
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

/* userMethods.updateProfile = (info) => {
    return new Promise((resolve,reject) => {
        model.findOne({
            where:{
                user_name:info.username
            }
        })
        .then((user) => {
            info.people_id = user.people_id
            peopleMethods.updatePerson(info)
            .then((res) => {
                resolve(res)
            })
        })
        .catch((err) => {
            reject(err)
        })  
    })
} */

module.exports = userMethods