const express = require('express')
const router  = express.Router()
const grMethods = require('../../../methods/grievance')
const userMethods = require('../../../methods/user')
const uid = require('uniqid')
const multer  = require('multer')
var path = require('path');

router.get('/pending/all',(req,res) => {
	var info = {
		status: "pending"
	}
	grMethods.getAll(info)
	.then((doc) => {
		var data = []
		var id = 1
		doc.forEach(element => {
			data.push({
				'id': id++,
				'gr_id': element.grievance_id,
				'title':element.title,
				'remark':element.remark,
				'status':element.status
			})
		});
		res.json({
			'success':true,
			'data_length':data.length,
			'info':data
		})
	})
	.catch((err)=>{
		res.json({
			'success':false,
			'error':err
		})
	})
})

router.post('/accept',(req,res,next) => {
    var info = {}
    info.username = req.body.username
    info.grievance_id = req.body.grievance_id

    grMethods.acceptGrievance(info)
    .then((doc) => {
        res.json({
            success: true
        })
    })
    .catch((err) => {
        res.json({
            success: false,
            error: err.message
        })
    })
})

router.get('/accepted',(req,res) => {
	var info = {
		username : req.query.username,
		status: 'accepted'
	}
	console.log(info);	
	grMethods.getAllCell(info)
	.then((doc) => {
		var data = []
		var id = 1
		doc.forEach(element => {
			data.push({
				'id': id++,
				'gr_id': element.grievance_id,
				'title':element.title,
				'remark':element.remark,
				'status':element.status
			})
		});
		res.json({
			'success':true,
			'data_length':data.length,
			'info':data
		})
	})
	.catch((err)=>{
		res.json({
			'success':false,
			'error':err.message
		})
	})
})

router.get('/single',(req,res) => {
	var info = {
		grievance_id: req.query.grievance_id
	}
	grMethods.getGrievanceById(info)
	.then((grievance) =>  {
		var data = {}
		data.title = grievance.title
		data.description = grievance.description
		userMethods.findUserByUserID(grievance)
		.then((user) => {
			data.username = user.user_name
			res.json({
				success:true,
				data: data
			})
		})
		.catch((err) => {
			console.log(err);
			res.json({
				success:false,
				error: err.message
			})
		})
	})
	.catch((err) => {
		res.json({
			success:false,
			error: err.message
		})
	})
})

module.exports = router