module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // member: {
    //   type: DataTypes.ENUM,
    //   values: [
    //     "Abdul",
    //     "Habibie",
    //     "Hans",
    //     "Henry",
    //     "Maulana",
    //     "Azizah",
    //     "Dewi",
    //     "Nazla",
    //     "Sarah",
    //   ],
    //   defaultValue: "Hans",
    //   allowNull: false,
    // },
    avatar: {
      type: DataTypes.ENUM,
      values: [
        "Smile Blue",
        "White Astronaut",
        "Blue Dino",
        "Cut Cat",
        "Rock Dino",
        "Great Mouse",
      ],
      defaultValue: "Smile Blue",
      allowNull: false,
    },
  });

  Posts.associate = (models) => {
    Posts.hasMany(models.Members, {
      onDelete: "cascade",
    });
  };

  return Posts;
};
