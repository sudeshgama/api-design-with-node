import merge from 'lodash.merge';

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || "local";

let envConfig;

const Stages = {
  PROD: 'production',
  STAGING: 'staging',
  LOCAL: 'local'
}

switch (stage) {
  case Stages.PROD:
    envConfig = require('./prod').default;
  case Stages.STAGING:
    envConfig = require('./staging').default;
  default:
    envConfig = require('./local').default;
}

const defaultConfig = {
  stage,
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,
  logging: false
}

export default merge(defaultConfig, envConfig);