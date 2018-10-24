const Grievance = require('./grievance')

const Attachment = Sequelize.define('attachment',{
	file_path:{type: Sequelize.STRING, primaryKey: true ,allowNull:false},
	grievance_id:{type: Sequelize.STRING,allowNull:false},
	upload_date:{type:Sequelize.DATEONLY,allowNull:false}
})

Attachment.belongsTo(Grievance, {
	foreignKey: 'grievance_id'
})

module.exports = {Attachment}