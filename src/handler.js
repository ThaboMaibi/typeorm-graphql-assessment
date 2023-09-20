'use strict';
import bootstrap from "./index";

const { app } = bootstrap();

const serverless = require("serverless-http")

module.exports.hello = serverless(app)
