const model = require('../models').cell
const uniqid = require('uniqid')
const Promise = require('bluebird')
const Joi = require('joi')

const cellMethods = {}

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

module.exports = cellMethods