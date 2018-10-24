module.exports = (sequelize, DataTypes) =>{
    const Thread = sequelize.define('thread',{
        grievance_id:{type: DataTypes.STRING,allowNull:false},
        title:{type: DataTypes.STRING,allowNull:false},
        description:{type:DataTypes.STRING,allowNull:false},
        date_created:{type:DataTypes.DATEONLY,allowNull:false},
    })

    Thread.associate = (models)=>{
        Thread.belongsTo(models.grievance, {
            foreignKey: 'grievance_id'
        })
    }

    return Thread
}