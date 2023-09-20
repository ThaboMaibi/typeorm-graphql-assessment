'use strict';
const bootstrap =require("./src/index") ;
const serverless = require("serverless-http")


const { app } = bootstrap();



module.exports.hello = serverless(app.app)
