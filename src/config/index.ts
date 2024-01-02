import dotenv from 'dotenv';
dotenv.config();

const Config: any = {};

// App
Config.APP_PORT = process.env.APP_PORT || 3305;
Config.SERVICE_NAME = process.env.SERVICE_NAME;

// Database
Config.DB_HOST = process.env.DB_HOST;
Config.DB_PORT = process.env.DB_PORT;
Config.DB_NAME = process.env.DB_DATABASE;
Config.DB_USER = process.env.DB_USERNAME;
Config.DB_PASS = process.env.DB_PASSWORD;
Config.DB_DIALECT = process.env.DB_DIALECT;

// Redis
Config.REDIS_USER = process.env.REDIS_USER;
Config.REDIS_PASSWORD = process.env.REDIS_PASSWORD;
Config.REDIS_HOST = process.env.REDIS_HOST;
Config.REDIS_PORT = process.env.REDIS_PORT;

// AWS S3
Config.S3_CDN_URL = process.env.S3_CDN_URL;
Config.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
Config.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
Config.AWS_REGION = process.env.AWS_REGION;
Config.AWS_BUCKET = process.env.AWS_BUCKET;
Config.AWS_ACL = process.env.AWS_ACL;


/*
*  Start IDP Setup
* */
Config.SESSION_SECRET = process.env.SESSION_SECRET;


export default Config