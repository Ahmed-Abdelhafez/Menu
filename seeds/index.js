const mongoose = require('mongoose')
const resturantData = require('./resturantsData')
const Resturnat = require('../models/resturant')

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
    await Resturnat.deleteMany({})
    for(let i=0; i < 50; i++){
        const res = new Resturnat({
            name: `${resturantData[i].name}`,
            phone: `${resturantData[i].phone}`,
            location: `${resturantData[i].location}, ${resturantData[i].city}`
        })
        await res.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})