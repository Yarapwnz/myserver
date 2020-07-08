module.exports = (sequelize, Sequelize) => {
  const Discipline = sequelize.define("discipline", {
    nazva: {
      type: Sequelize.STRING
    },
    vikladach: {
      type: Sequelize.STRING
    },
    kilk_god: {
      type: Sequelize.STRING
    },
    groupa: {
      type: Sequelize.STRING
    },
    cours: {
      type: Sequelize.STRING
    }
  });

  return Discipline;
};
