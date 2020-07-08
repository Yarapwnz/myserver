module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
    pib: {
      type: Sequelize.STRING
    },
    data_nar: {
      type: Sequelize.STRING
    },
    adresa: {
      type: Sequelize.STRING
    },
    telephon: {
      type: Sequelize.STRING
    },
    groupa: {
      type: Sequelize.STRING
    },
    cours: {
      type: Sequelize.STRING
    }
  });

  return Student;
};
