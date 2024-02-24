const { Sequelize, DataTypes } = require('sequelize');
const mysqlConnection = require('../mysqlConnection');

module.exports = async () => {
    let sequelize = mysqlConnection.getSequelizeObject(Sequelize);

    const Subcategory = sequelize.define("subcategory", {
        name: {
            type: DataTypes.STRING,
            notNull: true
        },
        code: {
            type: DataTypes.STRING,
            notNull: true,
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
        category_id: {
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
    
    await Subcategory.sync();
    return Subcategory;
};