module.exports = (sequelize, Sequelize) => {
  const Teach = sequelize.define("teach", {
    pib: {
      type: Sequelize.STRING
    },
    data_nar: {
      type: Sequelize.STRING
    },
    adresa: {
      type: Sequelize.STRING
    },
    ditu: {
      type: Sequelize.STRING
    },
    zvannya: {
      type: Sequelize.STRING
    },
    tem_kand: {
      type: Sequelize.STRING
    },
    tem_doc: {
      type: Sequelize.STRING
    },
    payday: {
      type: Sequelize.STRING
    }
  });

  return Teach;
};
