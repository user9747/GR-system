const model = require('../models').grievance
const Promise = require('bluebird')


var grMethods = {}

grMethods.createGrievance = (info) => {
	return new Promise((resolve,reject)=>{
		model.create(info)
		.then((doc)=>{
			resolve(doc)
		}).catch((err)=>{
			reject(err)
		})
	})

}

module.exports = grMethods