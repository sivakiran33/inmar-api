const { Sequelize, DataTypes } = require('sequelize');
const mysqlConnection = require('../mysqlConnection');
const DepartmentModel = require('./Department');

module.exports = async () => {
    let sequelize = mysqlConnection.getSequelizeObject(Sequelize);

    const Location = sequelize.define("location", {
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
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            notNull: true
        }
    });


    const Department = await DepartmentModel();
    Location.hasMany(Department, { 
        foreignKey: 'location_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true
    });
    Department.belongsTo(Location, {
        foreignKey: 'location_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });

    await Location.sync();
    return Location;
};