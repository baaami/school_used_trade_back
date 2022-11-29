export default module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'image',
      {
        postid: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        path: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
      },
      {
        tableName: 'image',
        timestamps: false,
      }
    )
  }
  