module.exports = (sequelize, DataTypes) => {
	const Grievance = sequelize.define('grievance',{
		grievance_id:{type: DataTypes.STRING, primaryKey: true ,allowNull:false},
		title:{type:DataTypes.STRING,allowNull:false},
		description:{type:DataTypes.STRING,allowNull:false},
		date_created:{type:DataTypes.DATEONLY,allowNull:false},
		user_id:{ type: DataTypes.STRING ,allowNull:false},
		cell_id:{ type: DataTypes.STRING ,allowNull:true},
		status:{ type: DataTypes.STRING, allowNull:false},
		remark:{ type: DataTypes.STRING, allowNull:true},
		resolve_date:{type:DataTypes.DATEONLY,allowNull:true},
		category:{ type: DataTypes.STRING ,allowNull:false},
		token:{type: DataTypes.STRING,allowNull:false,unique:true,validate:{isAlphanumeric: true}}
	})	

	Grievance.associate = (models) => {
		Grievance.belongsTo(models.user, {
			foreignKey: 'user_id'
		})
		
		Grievance.belongsTo(models.cell, {
			foreignKey: 'cell_id'
		})
	}

	return Grievance
}