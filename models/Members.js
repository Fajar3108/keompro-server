module.exports = (sequelize, DataTypes) => {
  const Members = sequelize.define("Members", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Members;
};
