export default module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'user',
    {
      snsid: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      nickname: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('now()'),
      },
    },
    {
      tableName: 'users',
      timestamps: false,
    }
  )
}
