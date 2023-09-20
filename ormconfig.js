module.exports = {
    "type": "postgres",
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "synchronize": true,
    "extra": {
        "ssl": {
            "rejectUnauthorized": false
        }
    },
    "migrations": ["src/migrations/**/*{.ts,.js}"],
    "subscribers": ["src/subscribers/**/*{.ts,.js}"],
    entities: ["dist/models/*.js"],
};
//# sourceMappingURL=ormconfig.js.map