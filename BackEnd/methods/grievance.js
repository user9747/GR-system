const model = require('../models').grievance
const Promise = require('bluebird')


var grMethods = {}

grMethods.getGrievance = (info) => {
	return new Promise ((resolve,reject)=>{
		model.findOne({where:{token:info.token}})
		.then((doc)=>{
			console.log(doc+"resolve")
			resolve(doc)
		})
		.catch((err)=>{
			console.log(err+"reject")
			reject(err)
		})
	})
}

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

grMethods.updateGrievance = ()=>{

}

module.exports = grMethods