const Grievance = require('./grievance')

const Thread = Sequelize.define('thread',{
    grievance_id:{type: Sequelize.STRING,allowNull:false},
    title:{type: Sequelize.STRING,allowNull:false},
    description:{type:Sequelize.STRING,allowNull:false},
    date_created:{type:Sequelize.DATEONLY,allowNull:false},
})


Grievance.belongsTo(Grievance, {
	foreignKey: 'grievance_id'
})

module.exports = {Thread}