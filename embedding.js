const mongoose = require('mongoose')
// const Customer = require('./models/Customer.embedding').Customer
const { Customer } = require('./models/Customer.embedding')
const Identifier = require('./models/Identifier.embedding')

mongoose
  // .connect('mongodb://localhost/embedding_db', {
  .connect('mongodb://localhost/z', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Successfully connect to MongoDB.'))
  .catch(err => console.error('Connection error', err))

const createCustomer = function (name, age, gender) {
  const customer = new Customer({
    name,
    age,
    gender
  })
  return customer.save()
}

const createIdentifier = function (cardCode, customer) {
  const identifier = new Identifier({
    cardCode,
    customer
  })
  return identifier.save()
}

createCustomer('bezkoder', 29, 'male')
  .then(customer => {
    console.log('> Created new Customer\n', customer)

    return createIdentifier(
      customer._id.toString().substring(0, 10).toUpperCase(),
      customer
    )
  })
  .then(identifier => {
    console.log('> Created new Identifier\n', identifier)
  })
  .catch(err => console.log(err))

const showAllIdentifier = async function () {
  const identifiers = await Identifier.find()
    .select('-__v -customer.__v -customer._id')
  console.log('> All Identifiers\n', identifiers)
}
showAllIdentifier()
