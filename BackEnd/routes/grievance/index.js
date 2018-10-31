const express = require('express')
const router  = express.Router()
const grMethods = require('../../methods/grievance')
const uid = require('uniqid')



router.get('/:token',(req,res) => {
	// geMethods.getGrievance()
})

router.post('/',(req,res) => {
 	var info = {};
 	if(Object.prototype.hasOwnProperty.call(req.body, 'remark')){
 		info.remark=req.body.remark
 	}
 	else{
 		info.remark="No Remarks"
 	}
 	info.grievance_id= uid();
 	info.title = req.body.title;
 	info.description = req.body.description;
 	info.user_id = 'user97472mpgt6f0jnwwlv0j';
 	info.date_created = new Date(Date.now());
 	info.resolve_date = '2018-01-01';
 	info.cell_id= 'cell_1';
 	info.status = 'saved';
 	info.category = '';
 	info.token = uid();
 	console.log(info)

 	grMethods.createGrievance(info)
 	.then((doc)=>{
 		res.json({
 			'success':true,
 			doc
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