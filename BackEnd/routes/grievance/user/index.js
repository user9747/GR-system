const express = require('express')
const router  = express.Router()
const grMethods = require('../../../methods/grievance')
const peopleMethods = require('../../../methods/people')
const uid = require('uniqid')
const multer  = require('multer')
const mailer = require('../../../middlewares/mail')
var path = require('path');
var storage = multer.diskStorage(
    {
        destination: function(req,file,cb){
			console.log(req.user)
			cb(null,path.join(__dirname+'/../../../uploads/',req.user.user_name))
		} ,
        filename: function ( req, file, cb ) {
            //req.body is empty... here is where req.body.new_file_name doesn't exists
            cb( null, req.user.user_name+file.originalname);
        }
    }
);
var upload = multer( { storage: storage } );


router.get('/pending',(req,res)=>{
	var info = {
		username: req.query.user_name
	}
	grMethods.getAllUserPending(info)
	.then((doc)=>{
		var data = []
		var id = 1
		doc.forEach(element => {
			data.push({
				'id': id++,
				'title':element.title,
				'status':element.status,
				'create_date':element.date_created
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


router.get('/closed',(req,res) => {
	var info = {
		username: req.query.user_name,
		status:"resolved"
	}
	grMethods.getAllUser(info)
	.then((doc)=>{
		var data = []
		var id = 1
		doc.forEach(element => {
			data.push({
				'id': id++,
				'title':element.title,
				'remark':element.remark,
				'status':element.status,
				'resolve_date': element.resolve_date
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

router.get('/token',(req,res) => {
	var info = {}
	info.token = req.query.token
	grMethods.getGrievance(info)
	.then((data)=>{
		var info = {}
		info.title = data.title
		info.description = data.description
		info.date_created = data.date_created
		info.token = data.token
		info.status = data.status
		info.resolve_date = data.resolve_date
		info.remark = data.remark
		res.json({
			'success':true,
			'info':info
		})
	})
	.catch((err)=>{
		res.json({
			'success':false,
			err
		})
	})

})

router.get('/saved',(req,res) => {
	var user = req.query.user_name
	grMethods.getSaved({'username':user})
	.then((doc) => {
		if(!doc){
			res.json({
				'success':false,
				'error': 'No saved grievances'
			})
			return
		}
		var info = {}
		info.title = doc.title,
		info.description = doc.description
		res.json({
			'success':true,
			'info':info
		})
	})
	.catch((err) => {
		res.json({
			'success':false,
			'error':err
		})
	})
})

router.post('/submit',function(req,res){
 	var info = {};
 	/* if(Object.prototype.hasOwnProperty.call(req.body, 'remark')){
 		info.remark=req.body.remark
 	}
 	else{
 		info.remark="No Remarks"
	 } */
	info.remark = null
 	info.username=req.body.user_name;
 	info.grievance_id= uid();
 	info.title = req.body.title;
 	info.description = req.body.description;
 	info.date_created = new Date(Date.now());
 	info.resolve_date = null;
 	info.cell_id= null;
 	info.status = 'pending';
 	info.category = '';
 	info.token = uid();

 	grMethods.createGrievance(info)
 	.then((data)=>{
		//  console.log(info)
		peopleMethods.getPeopleByUsername({
			username: info.username
		})
		.then((ppl) => {
			console.log(ppl)
			mailer.Send({
				email:ppl.email,
				username:ppl.name,
				subject: 'Your Grievance has been submitted',
				content: 'Your grievance has been successfully submitted. You can track the progress of your grievance using the following token <b>'+data.token+'</b><br /> For any assistance contact us at grievancecell@cet.ac.in',
			})
			res.json({
				'success':true,
				'info':data
			})
		})
 	})
 	.catch((err)=>{
 		res.json({
 			'success':false,
 			err
 		})
 	})

 })

 router.post('/save',function(req,res){
	var info = {};
	/* if(Object.prototype.hasOwnProperty.call(req.body, 'remark')){
		info.remark=req.body.remark
	}
	else{
		info.remark="No Remarks"
	} */
	info.remark = null
	info.username=req.body.user_name;
	info.grievance_id= uid();
	info.title = req.body.title;
	info.description = req.body.description;
	info.date_created = new Date(Date.now());
	info.resolve_date = null;
	info.cell_id= null;
	info.status = 'saved';
	info.category = '';
	info.token = uid();

	grMethods.createGrievance(info)
	.then((data)=>{
		res.json({
			'success':true,
			'info':data
		})
	})
	.catch((err)=>{
		res.json({
			'success':false,
			'err':err.message
		})
	})

})

router.post('/file',upload.single('file'),function(req,res){
	if (!req.file) {
		console.log("No file received");
		
	    res.json({
		  success: false
		});
	
	  } else {
		console.log('file received');
		res.json({
		  success: true
		})
	  }
})



/* router.put('/',(req,res) => {
 	var info = {};
 	if(Object.prototype.hasOwnProperty.call(req.body, 'remark')){
 		info.remark=req.body.remark
 	}
 	else{
 		info.remark="No Remarks"
 	}
 	info.grievance_id= req.body.grievanceId;
 	info.title = req.body.title;
 	info.description = req.body.description;
 	info.user_id = 'user97472mpgt6f0jnwwlv0j';
 	info.date_created = new Date(Date.now());
 	info.resolve_date = null;
 	info.cell_id= null;
 	info.status = 'saved';
 	info.category = '';
 	info.token = uid();
 	console.log(info)

 	grMethods.updateGrievance(info)
 	.then((data)=>{
 		res.json({
 			'success':true,
 			data
 		})
 	})
 	.catch((err)=>{
 		res.json({
 			'success':false,
 			err
 		})
 	})

 }) */



module.exports = router