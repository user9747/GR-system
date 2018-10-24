const People=Sequelize.define('people',{
	people_id:{type: Sequelize.STRING, primaryKey: true ,allowNull:false},
	name:{type: Sequelize.STRING,allowNull:false},
	role:{type: Sequelize.ENUM('user', 'cell',),allowNull:false},
	email:{type: Sequelize.STRING,allowNull:false,unique:true,validate:{isEmail: true}},
	phone:{type:Sequalize.BIGINT(10),validate:{isNumeric:true}}
})

module.exports = {People}