if (process.env.NODE_ENV === 'production') {
  module.exports = requireq('./prod')
} else {
  module.exports = require('./dev')
}