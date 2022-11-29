// models/index.js

const path = require('path')
const Sequelize = require('sequelize')

const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env]
const db = {}
let sequelize

if (config === undefined) {
  console.error('config data undefined')
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )
}

db.sequelize = sequelize
db.Sequelize = Sequelize

db.Post = require('./post')(sequelize, Sequelize)
db.User = require('./user')(sequelize, Sequelize)
db.Image = require('./image')(sequelize, Sequelize)

db.Post.hasOne(db.Image, { foreignKey: 'postid', sourceKey: 'id' })

module.exports = db
