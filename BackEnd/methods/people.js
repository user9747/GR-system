const model = require('../models/').people
const Promise = require('bluebird')

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

module.exports = peopleMethods