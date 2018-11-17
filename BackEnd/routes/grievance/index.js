const express = require('express')
const router  = express.Router()
const grMethods = require('../../methods/grievance')
const userMethods = require('../../methods/user')
const uid = require('uniqid')

router.get('/number',(req,res)=>{
	grMethods.getAll("saved")
	.then((data)=>{
		res.json({
			'success':true,
			'data_length':data.length,
			 data
		})
	})
	.catch((err)=>{
		res.json({
			'success':false,
			err
		})
	})
})

router.get('/:token',(req,res) => {
	var info = {}
	info.token = req.params.token
	grMethods.getGrievance(info)
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

})

router.post('/',function(req,res){
 	var info = {};
 	if(Object.prototype.hasOwnProperty.call(req.body, 'remark')){
 		info.remark=req.body.remark
 	}
 	else{
 		info.remark="No Remarks"
 	}
 	info.username=req.body.user_name;
 	info.grievance_id= uid();
 	info.title = req.body.title;
 	info.description = req.body.description;
 	info.date_created = new Date(Date.now());
 	info.resolve_date = '2018-01-01';
 	info.cell_id= 'cell_1';
 	info.status = 'saved';
 	info.category = '';
 	info.token = uid();

 	grMethods.createGrievance(info)
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

 })

router.put('/',(req,res) => {
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
 	info.resolve_date = '2018-01-01';
 	info.cell_id= 'nill';
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

 })



module.exports = router