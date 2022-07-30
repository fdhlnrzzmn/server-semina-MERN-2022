const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    urlDb: process.env.URL_MONGODB_DEV,
    jwtExpiration: process.env.JTW_EXPIRATION,
    jwtSecret: process.env.JWT_SECRET_KEY,
    email: process.env.GMAIL,
    password: process.env.PASSWORD,
};