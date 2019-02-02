const express = require('express')
const router  = express.Router()
const grMethods = require('../../../methods/grievance')
const userMethods = require('../../../methods/user')
const uid = require('uniqid')
const multer  = require('multer')
var path = require('path');
const fs = require('fs')
const PDFDocument = require('pdfkit');

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

router.post('/resolve',(req,res) => {
	var info = {}
	info.grievance_id = req.body.grievance_id
	info.remark = req.body.remark
	info.status = 'resolved'
	info.resolve_date = new Date(Date.now())
	grMethods.resolveGrievance(info)
	.then((doc) => {
		res.json({
			success: true,
			message: 'Succesfully resolved'
		})
	})
	.catch((err) => {
		res.json({
			success: false,
			error: err.message
		})
	})
})

router.post('/print/report',(req,res)=>{
	dateToCheck=new Date(req.body.selectedDate)
	grMethods.getAllByDate()
	.then((doc) => {
		var data = []
		var id = 1
		doc.forEach(element => {
			date_created = new Date(element.date_created)
			if(date_created.getFullYear() === dateToCheck.getFullYear()){
				if(date_created.getMonth() === dateToCheck.getMonth()){
					data.push({
						'id': id++,
						'gr_id': element.grievance_id,
						'title':element.title,
						'remark':element.remark,
						'status':element.status,
						'userid':element.user_id
					})
				}
			}
		});
		console.log(data)
		const document = new PDFDocument;
		document.pipe(res);
		document.fontSize(25).text("College Of Engineering Trivandrum")
		for( i=0 ;i<data.length;i++){
			console.log( data[i].remark);
			document.fontSize(18).text(data[i].id+"    "+data[i].userid+"    "+data[i].title+"    "+data[i].status);
		}
		document.end();
	})
	.catch((err)=>{
		res.json({
			'success':false,
			'error':err
		})
	})
})

module.exports = router