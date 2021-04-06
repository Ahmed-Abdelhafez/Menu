const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ResturantSchema = new Schema({
    name: String,
    phone: String,
    location: String
})

module.exports = mongoose.model('Resturant', ResturantSchema)