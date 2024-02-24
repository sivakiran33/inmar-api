const { Sequelize, DataTypes } = require('sequelize');
const mysqlConnection = require('../mysqlConnection');

module.exports = async() => {
    let sequelize = mysqlConnection.getSequelizeObject(Sequelize);

    const Sku = sequelize.define("sku", {
        sku: {
            type: DataTypes.STRING,
            notNull: true
        },
        name: {
            type: DataTypes.STRING,
            notNull: true
        },
        location: {
            type: DataTypes.STRING,
            notNull: true
        },
        department: {
            type: DataTypes.STRING,
            notNull: true
        },
        category: {
            type: DataTypes.STRING,
            notNull: true
        },
        subcategory: {
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
    
    await Sku.sync();
    return Sku;
};