const { Sequelize, DataTypes } = require('sequelize');
const mysqlConnection = require('../mysqlConnection');
const CategoryModel = require('./Category');

module.exports = async () => {
    let sequelize = mysqlConnection.getSequelizeObject(Sequelize);

    const Department = sequelize.define("department", {
        name: {
            type: DataTypes.STRING,
            notNull: true
        },
        code: {
            type: DataTypes.STRING,
            notNull: true
        },
        description: {
            type: DataTypes.STRING,
            notNull: true
        },
        location_id: {
            type: DataTypes.STRING,
            notNull: true
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            notNull: true,
            primaryKey: true
        },
        created_date: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            notNull: true
        }
    });

    const Category = await CategoryModel();
    Department.hasMany(Category, { 
        foreignKey: 'department_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true
    });
    Category.belongsTo(Department, {
        foreignKey: 'department_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });
    
    await Department.sync();
    return Department;
};