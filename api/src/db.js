require('dotenv').config();
const path = require('path');
const fs = require('fs');
const { Sequelize } = require('sequelize');
const BitHash = require('./Tools/BitHash');
const {DATABASE_URL} = process.env;
const usuario = require('./models/User');

const bitHash = new BitHash();

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false, 
  native: false,
  dialectOptions: {
              ssl: {
                require: true,
                // Ref.: https://github.com/brianc/node-postgres/issues/2009
                rejectUnauthorized: false,
              } }
});

const basename = path.basename(__filename);
const modelDefiners = [];
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);
const { User, Game, Friend, Review, Payment } = sequelize.models;

//relaciones
User.hasOne(Payment);
Payment.belongsTo(User)
User.hasMany(Friend);
Friend.belongsTo(User);
User.hasMany(Game);
Game.belongsTo(User);
User.hasMany(Game);
Review.belongsTo(User);

module.exports = {
    ...sequelize.models,
    db: sequelize, 
    bitHash     
  };
  
