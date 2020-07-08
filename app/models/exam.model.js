module.exports = (sequelize, Sequelize) => {
  const Exam = sequelize.define("exam", {
    nazva: {
      type: Sequelize.STRING
    },
    pib_v: {
      type: Sequelize.STRING
    },
    pib_s: {
      type: Sequelize.STRING
    },
    assessment: {
      type: Sequelize.STRING
    },
    sec_assessment: {
      type: Sequelize.STRING
    },
    date_ex: {
      type: Sequelize.STRING
    },
    groupa: {
      type: Sequelize.STRING
    },
    cours: {
      type: Sequelize.STRING
    }
  });

  return Exam;
};
