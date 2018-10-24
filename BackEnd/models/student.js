const Student = Sequelize.define('student',{
	people_id:{type: Sequelize.STRING, primaryKey: true ,allowNull:false},
	department:{type:Sequelize.STRING,allowNull:false},
	date_of_join:{type:Sequelize.DATEONLY,allowNull:false},
	course:{type:Sequelize.STRING,allowNull:false}
})