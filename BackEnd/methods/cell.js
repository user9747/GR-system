const model = require('../models').cell
const uniqid = require('uniqid')
const Promise = require('bluebird')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const peopleMethods = require('../methods/people')

const cellMethods = {}

const schema = Joi.object().keys({
    'username': Joi.string().required(),
    'password': Joi.string().required(),
    'email': Joi.string().required()
})

cellMethods.addNewUser = (info) => {
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

cellMethods.addUser = (info) => {
    return new Promise((resolve,reject) => {
        Joi.validate(info, schema, (err, value) => {
            if(err === null){
                peopleMethods.getPeopleByEmail(info.email)
                .then((people) => {
                    if(people === null){
                        reject(new Error("No person table entry"))
                    }
                    bcrypt.hash(info.password, 10)
                    .then((hashPass) => {
                        var userInfo = {
                            'cell_id': uniqid(info.username),
                            'people_id': people.people_id,
                            'user_name': info.username,
                            'password': info.password
                        }
                        model.create(userInfo)
                        .then((user) => {
                            resolve(user)
                        })
                        .catch((err) => {
                            reject(err)
                        })
                    })
                    .catch((err) => {
                        console.log("Error caught after hash "+err.message)
                        reject(err)
                    })
                    
                })
            }
            else{
                reject(new Error("Validation error"))
            }
        })
    })
}

cellMethods.getUserByUsername = (info) => {
    return new Promise((resolve,reject) => {
        model.findOne({
            where: {
                'user_name': info.username
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

cellMethods.updatePassword = (info)=>{
    return new Promise((resolve,reject) => {
        bcrypt.hash(info.password,10)
        .then((hashPass) => {
            info.password = hashPass
            model.update(info,{
                where:{
                    cell_id: info.cell_id
                }
            })
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

/* cellMethods.updateProfile = (info) => {
    return new Promise((resolve,reject) => {
        model.findOne({
            where:{
                user_name:info.username
            }
        })
        .then((cell) => {
            info.people_id = cell.people_id
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

module.exports = cellMethods