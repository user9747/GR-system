module.exports = (sequelize, DataTypes) => {
	const Cell=sequelize.define('cell',{
		cell_id:{ type: DataTypes.STRING, primaryKey: true ,allowNull:false},
		people_id:{type: DataTypes.STRING,allowNull:false,unique:true},
		user_name:{type: DataTypes.STRING,allowNull:false,unique:true,validate:{isAlphanumeric: true}},
		password:{type: DataTypes.STRING,allowNull:false,unique:true}
	})

	Cell.associate = (models) => {
		Cell.belongsTo(models.people, {
			foreignKey: 'people_id'
		})
	}

	return Cell
}