const API_KEY = require('../secrets')
const axios = require('axios')
const router = require('express').Router()

module.exports = router

router.get('/keywords/:keywords', async (req, res, next) => {
    console.log('API Server is triger')
    const keywords = req.params.keywords
    try{
        const result = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${keywords}&api_key=${API_KEY}`)
        console.log('Before send back=================')
        // console.log(result.data)
        res.send(result.data)
    } catch (err){
        next(err)
    }
    
})

// router.get('/id/:id', (req, res, next) => {

// })










