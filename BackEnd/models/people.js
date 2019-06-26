module.exports = (sequelize, DataTypes) => {
	const People=sequelize.define('people',{
		people_id:{type: DataTypes.STRING, primaryKey: true ,allowNull:false},
		name:{type: DataTypes.STRING,allowNull:false},
		role:{type: DataTypes.ENUM('user', 'cell', 'admin'),allowNull:false},
		email:{type: DataTypes.STRING,allowNull:false,unique:true,validate:{isEmail: true}},
		phone:{type:DataTypes.BIGINT(10),validate:{isNumeric:true}}
	})

	return People
}