const { Sequelize, DataTypes } = require('sequelize');
const mysqlConnection = require('../mysqlConnection');
const SubcategoryModel = require('./Subcategory');

module.exports = async () => {
    let sequelize = mysqlConnection.getSequelizeObject(Sequelize);

    const Category = sequelize.define("category", {
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
        department_id: {
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

    const Subcategory = await SubcategoryModel();
    Category.hasMany(Subcategory, { 
        foreignKey: 'category_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true
    });
    Subcategory.belongsTo(Category, {
        foreignKey: 'category_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });
    
    await Category.sync();
    return Category;
};