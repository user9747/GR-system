const Teacher = Sequelize.define('teacher',{
	people_id:{type: Sequelize.STRING, primaryKey: true ,allowNull:false},
	address:{type:Sequelize.STRING,allowNull:false},
	relation_to_college:{type:Sequelize.STRING,allowNull:false},
})