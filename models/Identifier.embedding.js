const mongoose = require('mongoose')
// const CustomerSchema = require('./Customer.embedding').CustomerSchema
const { CustomerSchema } = require('./Customer.embedding')

const Identifier = mongoose.model(
  'Identifier',
  new mongoose.Schema({
    cardCode: String,
    customer: CustomerSchema
  })
)

module.exports = Identifier
