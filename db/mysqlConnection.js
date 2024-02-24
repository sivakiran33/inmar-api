const config = require('../configs');

function getSequelizeObject(Sequelize){
    let dbConfig = config.DB;
    let sequelize = new Sequelize(
        dbConfig.DATABASE, dbConfig.USERNAME, dbConfig.PASSWORD, 
        {
            host: dbConfig.HOST, 
            dialect: dbConfig.DIALECT,
            dialectOptions: {
                charset: 'utf8mb4'
            },
            define: {
                timestamps: false
            }
        }
    );
    return sequelize;
}

module.exports = {
    getSequelizeObject: getSequelizeObject
}