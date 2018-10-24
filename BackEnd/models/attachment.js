module.exports = (sequelize, DataTypes) => {
	const Attachment = sequelize.define('attachment',{
		file_path:{type: DataTypes.STRING, primaryKey: true ,allowNull:false},
		grievance_id:{type: DataTypes.STRING,allowNull:false},
		upload_date:{type:DataTypes.DATEONLY,allowNull:false}
	})

	Attachment.associate = (models) => {
		Attachment.belongsTo(models.grievance,{
			foreignKey:'grievance_id'
		})
	}
	return Attachment
}