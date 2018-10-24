module.exports = (sequelize, DataTypes) => {
	const Teacher = sequelize.define('teacher',{
		people_id:{type: DataTypes.STRING, primaryKey: true ,allowNull:false},
		department:{type:DataTypes.STRING,allowNull:false},
		designation:{type:DataTypes.STRING,allowNull:false},
	})

	Teacher.associate = (models) => {
		Teacher.belongsTo(models.people, {
			foreignKey: 'people_id'
		})
	}

	return Teacher
}