module.exports = (sequelize, DataTypes) => {
	const Other = sequelize.define('other',{
		people_id:{type: DataTypes.STRING, primaryKey: true ,allowNull:false},
		address:{type:DataTypes.STRING,allowNull:false},
		relation_to_college:{type:DataTypes.STRING,allowNull:false},
	})
	
	Other.associate = (models) => {
		Other.belongsTo(models.people, {
			foreignKey: 'people_id'
		})
	}

	return Other
}