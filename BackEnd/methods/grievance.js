const model = require('../models').grievance
const userMethods = require('./user')
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

grMethods.getSaved = (info) => {
	return new Promise((resolve, reject) => {
		userMethods.findUserByUsername(info)
		.then((res) => {
			var userid = res.user_id
			model.findOne({
				where:{
					user_id: userid,
					status: "saved"
				}
			})
			.then((doc) => {		
				resolve(doc)
			})
			.catch((err) => {
				console.log("Error "+err);
				reject(err)
			})
		})
		.catch((err) => {
			console.log("Error "+err);
			reject(err)
		})
	})
}

grMethods.createGrievance = (info) => {
	return new Promise((resolve,reject)=>{
		userMethods.findUserByUsername(info)
        .then((user) => {
			info.user_id = user.user_id;
			model.findOne({
				where:{
					user_id: info.user_id,
					status: 'saved'
				}
			})
			.then((res) => {
				if(!res){
					console.log(info);
					
					model.create(info)
					.then((doc)=>{
						resolve(doc)
					})
					.catch((err)=>{
						reject(err)
					})
				}
				else{
					console.log(info);
					
					model.update({
						title: info.title,
						description: info.description,
						remark: info.remark,
						status: info.status
					},{
						where:{
							grievance_id:res.grievance_id
						}
					})
					.then((doc) => {
						console.log("Updated value");
						
						resolve(doc)
					})
					.catch((err) => {
						console.log("Err "+err)
						reject(err)
					})
				}
			})
			.catch((err) => {
				console.log("Err "+err)
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

grMethods.getAll = (info) => {
	return new Promise((resolve,reject) => {
		model.findAll({
			where:{
				status :info.status
			}
		})
		.then((doc) => {
			resolve(doc)
		})
		.catch((err) => {
			reject(err)
		})
	})
}

grMethods.getAllUser = (info)=>{
	return new Promise((resolve,reject)=>{
		userMethods.findUserByUsername(info)
		.then((res) => {
			model.findAll({
				where:{
					status : info.status,
					user_id : res.user_id					
				}	
			})
			.then((doc)=>{
				resolve(doc)
			})
			.catch((err)=>{
				reject(err)
			})
		})
		.catch((err)=>{
			reject(err)
		})		

	})
}

module.exports = grMethods