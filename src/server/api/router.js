const API_KEY = process.env.API_KEY || require('../secrets')
const axios = require('axios')
const router = require('express').Router()

module.exports = router

router.get('/:resource/keywords/:keywords', async (req, res, next) => {
    console.log('API Server is triger')
    const keywords = req.params.keywords
    const resource = req.params.resource
    console.log(resource)
    try{
        const result = await axios.get(`https://api.giphy.com/v1/${resource}/search?q=${keywords}&api_key=${API_KEY}`)
        console.log('Before send back=================')
        // console.log(result.data)
        res.send(result.data)
    } catch (err){
        next(err)
    }
    
})

router.get('/:resource/id/:id', async (req, res, next) => {
    console.log('Search by id is triger')
    const id = req.params.id
    console.log(id)
    try{
        const result = await axios.get(`https://api.giphy.com/v1/gifs/${id}?api_key=${API_KEY}`)
        console.log('Before send back=================')
        console.log(result.data)
        res.send(result.data)
    } catch (err){
        next(err)
    }
})










