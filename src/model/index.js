const {Sequelize} = require("sequelize");
const {sequelize} = require("../sequelize");
const builders = [
  require('./logs'),
  require('./department'),
  require('./user')
].map(module => module.builder);

const models = {};

builders.forEach(builder => {
  const model = builder(Sequelize, sequelize);
  models[model.name] = model;
})

Object.values(models)
  .forEach(model => {
    if (model.associate) {
      model.associate(models)
    }
  })

module.exports = models;