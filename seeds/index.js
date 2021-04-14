const mongoose = require('mongoose')
const restaurantData = require('./restaurantsData')
const Restaurnat = require('../models/restaurant')

mongoose.connect('mongodb://localhost:27017/Menu',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', () => {
    console.log('Database connected')
})

const seedDB = async() => {
    await Restaurnat.deleteMany({})
    for(let i=0; i < 50; i++){
        const res = new Restaurnat({
            name: `${restaurantData[i].name}`,
            phone: `${restaurantData[i].phone}`,
            street: `${restaurantData[i].location}`, 
            city: `${restaurantData[i].city}`,
            country: `${restaurantData[i].country}`,
            image: 'https://source.unsplash.com/collection/64076587',
            workingHours: `${restaurantData[i].workingHours}`,
            rating: `${restaurantData[i].rating}`,
            cuisines: `${restaurantData[i].cuisines}`,
            payment: `${restaurantData[i].payment}`,
            preOrder: `${restaurantData[i].preOrder}`,
            prepTime: `${restaurantData[i].preptime}`,
            serviceCharge: `${restaurantData[i].serviceCharge}`
        })
        await res.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})