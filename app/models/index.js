const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.students = require("./student.model.js")(sequelize, Sequelize);
db.cafedras = require("./cafedra.model.js")(sequelize, Sequelize);
db.disciplines = require("./discipline.model.js")(sequelize, Sequelize);
db.exams = require("./exam.model.js")(sequelize, Sequelize);
db.teachs = require("./teach.model.js")(sequelize, Sequelize);
module.exports = db;
