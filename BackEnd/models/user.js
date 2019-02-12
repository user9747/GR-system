module.exports = (sequelize, DataTypes) => {
	const User=sequelize.define('user',{
		user_id:{ type: DataTypes.STRING, primaryKey: true ,allowNull:false},
		people_id:{type: DataTypes.STRING,allowNull:false,unique:true},
		user_name:{type: DataTypes.STRING,allowNull:false,unique:true,validate:{isAlphanumeric: true}},
		password:{type: DataTypes.STRING,allowNull:false},
		isVerified:{type: DataTypes.BOOLEAN,allowNull: false, defaultValue: false}
	})

	User.associate = (models) => {
		User.belongsTo(models.people,{
			foreignKey: 'people_id'
		})
		
	}

	return User
}