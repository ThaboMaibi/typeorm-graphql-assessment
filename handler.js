'use strict';
const bootstrap =require("./src/index") ;

const { app } = bootstrap();

const serverless = require("serverless-http")

module.exports.hello = serverless(app)
