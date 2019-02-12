module.exports = (sequelize, DataTypes) => {
	const Verification=sequelize.define('verification',{
		user_id:{ type: DataTypes.STRING, primaryKey: true ,allowNull:false},
        verification_token: {type: DataTypes.STRING}
    })

	Verification.associate = (models) => {
		Verification.belongsTo(models.user,{
			foreignKey: 'user_id'
		})
		
	}

	return Verification
}