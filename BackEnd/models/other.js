const People = require('./people')

const Other = Sequelize.define('other',{
	people_id:{type: Sequelize.STRING, primaryKey: true ,allowNull:false},
	address:{type:Sequelize.STRING,allowNull:false},
	relation_to_college:{type:Sequelize.STRING,allowNull:false},
})

Other.belongsTo(People, {
	foreignKey: 'people_id'
})

module.exports = {Other}