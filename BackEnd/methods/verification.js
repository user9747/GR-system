const model = require('../models').verification
const uid = require('uniqid')
const Promise = require('bluebird')

var verificationMethods = {}

verificationMethods.createToken = (info) => {
    return new Promise((resolve, reject) => {
        info.verification_token = uid.process()
        model.create(info)
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

verificationMethods.returnToken = (info) => {
    return new Promise((resolve, reject) => {
        model.findOne({
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

verificationMethods.updateToken = (info) => {
    return new Promise((resolve, reject) => {
        info.verification_token = uid.process()
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


module.exports = verificationMethods