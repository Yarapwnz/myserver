module.exports = (sequelize, Sequelize) => {
  const Cafedra = sequelize.define("cafedra", {
    nazva: {
      type: Sequelize.STRING
    },
    zav_caf: {
      type: Sequelize.STRING
    },
    fakultet: {
      type: Sequelize.STRING
    }
  });

  return Cafedra;
};
