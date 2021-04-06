const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const path = require('path')
const Resturant = require('./models/resturant')

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


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/resturants', async(req, res) => {
    const resturants = await Resturant.find({})
    res.render('resturants/index', { resturants })
})

app.get('/resturants/new', async(req, res) => {
    res.render('resturants/new')
})


app.post('/resturants', async(req, res) => {
    const resturant = new Resturant(req.body.resturant)
    await resturant.save()
    res.redirect(`/resturants/${resturant._id}`)
})


app.get('/resturants/:id', async(req, res) => {
    const resturant = await Resturant.findById(req.params.id)
    res.render('resturants/show', { resturant })
})

app.get('/resturants/:id/edit', async(req, res) => {
    const resturant = await Resturant.findById(req.params.id)
    res.render('resturants/edit', { resturant })
})

app.put('/resturants/:id', async(req, res) => {
    const resturant = await Resturant.findByIdAndUpdate(req.params.id, { ...req.body.resturant })
    await resturant.save()
    res.redirect(`/resturants/${resturant._id}`)
})

app.delete('/resturants/:id', async(req, res) => {
    await Resturant.findByIdAndDelete(req.params.id)
    res.redirect(`/resturants`)
})

app.listen(3000, () => {
    console.log("server is running on port 3000")
})