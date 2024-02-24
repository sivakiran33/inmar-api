const DB = {
    USERNAME: 'inmar_user',
    PASSWORD: 'Inmar123',
    DATABASE: 'inmar_db',
    HOST: 'localhost',
    DIALECT: 'mysql',
    CHARSET: 'utf8mb4'
};

const SERVER = {
    PORT: 3000,
    ORIGIN: 'http://localhost:3000',
    BASE_URL: '/api',
    VERSION: 'v1'
}

module.exports = {
    DB: Object.freeze(DB),
    SERVER: Object.freeze(SERVER)
}