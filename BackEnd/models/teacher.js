const People = require('./people')

const Teacher = Sequelize.define('teacher',{
	people_id:{type: Sequelize.STRING, primaryKey: true ,allowNull:false},
	department:{type:Sequelize.STRING,allowNull:false},
	designation:{type:Sequelize.STRING,allowNull:false},
})

Teacher.belongsTo(People, {
	foreignKey: 'people_id'
})

module.exports = {Teacher}