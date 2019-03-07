const model = require('../models/').people
const Promise = require('bluebird')
const userMethods = require('./user')

var peopleMethods = {}

peopleMethods.getPeopleByEmail = (info) => {
    return new Promise((resolve, reject) => {
        model.findOne({
            'where':{
                'email': info.email
            }
        })
        .then((people) => {
            resolve(people)
        })
        .catch((err) => {
            console.log("Error caught in db access "+err.message);            
            reject(err)
        })
    })
}

peopleMethods.addPerson = (info)=>{
    return new Promise((resolve, reject) => {
        model.create(info)
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err);
        })
    })
}

peopleMethods.removePerson = (info) => {
    return new Promise((resolve, reject) => {
        model.destroy({
            where:{
                people_id: info.people_id
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

peopleMethods.getPeopleByUsername = (info) => {
    return new Promise((resolve,reject) => {
        userMethods.findUserByUsername(info)
        .then((res) => {
            model.findOne({
                where:{
                    people_id: res.people_id
                }
            })
            .then((doc) => {
                resolve(doc)
            })
        })
        .catch((err) => {
            reject(err)
        })
    })
}

module.exports = peopleMethods