const Teacher = Sequelize.define('teacher',{
	people_id:{type: Sequelize.STRING, primaryKey: true ,allowNull:false},
	department:{type:Sequelize.STRING,allowNull:false},
	designation:{type:Sequelize.STRING,allowNull:false},
})