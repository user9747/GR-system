module.exports = (sequelize, DataTypes) => {
	const Student = sequelize.define('student',{
		people_id:{type: DataTypes.STRING, primaryKey: true ,allowNull:false},
		admission_no:{type: DataTypes.STRING, unique: true ,allowNull:false},
		department:{type:DataTypes.STRING,allowNull:false},
		date_of_join:{type:DataTypes.DATEONLY,allowNull:false},
		course:{type:DataTypes.STRING,allowNull:false}
	})

	Student.associate = (models) => {
		Student.belongsTo(models.people, {
			foreignKey: 'people_id'
		})	
	}

	return Student
}