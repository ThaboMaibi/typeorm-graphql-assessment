'use strict';
import bootstrap from "./src/index";

const { app } = bootstrap();

const serverless = require("serverless-http")

module.exports.hello = serverless(app)
