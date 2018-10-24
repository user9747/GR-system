const Cell=Sequelize.define('cell',{
	cell_id:{ type: Sequelize.STRING, primaryKey: true ,allowNull:false},
	people_id:{type: Sequelize.STRING,allowNull:false,unique:true},
	user_name:{type: Sequelize.STRING,allowNull:false,unique:true,validate:{isAlphanumeric: true}}
	password:{type: Sequelize.STRING,allowNull:false,unique:true}
})