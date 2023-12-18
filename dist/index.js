
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-native-accordion.cjs.production.min.js')
} else {
  module.exports = require('./react-native-accordion.cjs.development.js')
}
