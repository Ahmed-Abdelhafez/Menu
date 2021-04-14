const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RestaurantSchema = new Schema({
    name: String,
    phone: String,
    street: String,
    city: String,
    country: String,
    image: String,
    workingHours: String,
    rating: String,
    cuisines: String,
    payment: String,
    preOrder: String,
    prepTime: String,
    serviceCharge: Number
})

module.exports = mongoose.model('Restaurant', RestaurantSchema)