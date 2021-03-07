const { Sequelize, DataTypes } = require("sequelize");

let sequelize;

if (process.env.NODE_ENV === "production") {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
    });
} else {
    sequelize = new Sequelize({ dialect: "sqlite", storage: "database.sqlite3" });
}

const Sound = require("./sound")(sequelize, DataTypes);

sequelize.authenticate().then(() => {
    sequelize.sync();
}).catch(error => {
    console.log(error);
    process.exit(1);
});

module.exports = {
    sequelize,
    Sequelize,
    Sound,
}