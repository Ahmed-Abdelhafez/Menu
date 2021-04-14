const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const path = require('path')
const ejsMate = require('ejs-mate')
const Restaurant = require('./models/restaurant')

mongoose.connect('mongodb://localhost:27017/Menu',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', () => {
    console.log('Database connected')
})

app.engine('ejs', ejsMate)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/restaurants', async(req, res) => {
    const restaurants = await Restaurant.find({})
    res.render('restaurants/index', { restaurants })
})

app.get('/restaurants/new', async(req, res) => {
    res.render('restaurants/new')
})


app.post('/restaurants', async(req, res) => {
    const restaurant = new Restaurant(req.body.restaurant)
    await restaurant.save()
    res.redirect(`/restaurants/${restaurant._id}`)
})


app.get('/restaurants/:id', async(req, res) => {
    const restaurant = await Restaurant.findById(req.params.id)
    res.render('restaurants/show', { restaurant })
})

app.listen(3000, () => {
    console.log("server is running on port 3000")
})