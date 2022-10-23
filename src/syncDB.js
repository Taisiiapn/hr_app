require('./model/index')
const {sequelize} = require('./sequelize')
const {FORCE_SYNC: force} = process.env;

const isForce = force === 'true';

sequelize.sync({force: !!force})
  .then(() => {
    console.log(`${isForce ? 'Force sync' : 'Sync'} success`)
    process.exit(0)
  })
  .catch(e => {
    console.error(`${isForce ? 'Force sync' : 'Sync'} error: `, e.message)
    process.exit(0)
  })