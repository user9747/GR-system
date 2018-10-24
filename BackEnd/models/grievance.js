const Grievance = Sequelize.define('grievance',{
	grievance_id:{type: Sequelize.STRING, primaryKey: true ,allowNull:false,autoIncrement:true},
	title:{type:Sequelize.STRING,allowNull:false},
	description:{type:Sequelize.STRING,allowNull:false},
	date_created:{type:Sequelize.DATEONLY,allowNull:false},
	user_id:{ type: Sequelize.STRING ,allowNull:false},
	cell_id:{ type: Sequelize.STRING ,allowNull:true},
	status:{ type: Sequelize.STRING, allowNull:false},
	remark:{ type: Sequelize.BLOB, allowNull:true},
	resolve_date:{type:Sequelize.DATEONLY,allowNull:true},
	category:{ type: Sequelize.STRING ,allowNull:false},
	token:{type: Sequelize.STRING,allowNull:false,unique:true,validate:{isAlphanumeric: true}}
})