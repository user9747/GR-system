const model = require('../models').grievance
const userModel = require('../models').user
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
		userModel.findOne({
            where: {
                user_name : info.username
            }
        })
        .then((user) => {
        	info.user_id = user.user_id;
            model.create(info)
			.then((doc)=>{
				resolve(doc)
			})
			.catch((err)=>{
				reject(err)
			})
        })
        .catch((err) => {
            reject(err)
        })

	})

}

grMethods.updateGrievance = ()=>{

}

grMethods.getAll = (info)=>{
	return new Promise((resolve,reject)=>{
		model.findAll({
			where:{
				status : info
			}	
		})
		.then((doc)=>{
			resolve(doc)
		})
		.catch((err)=>{
			reject(err)
		})
	})
}

module.exports = grMethods