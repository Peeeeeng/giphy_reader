const API_KEY = process.env.API_KEY || require('../secrets')
const axios = require('axios')
const router = require('express').Router()

module.exports = router

router.get('/:resource/keywords', async (req, res, next) => {
    console.log('API Server is triger')
    const resource = req.params.resource
    const { keywords, limit, offset, rating, lang } = req.query
    
    let searchCondition = `&limit=${limit}&offset=${offset}&lang=${lang}`
    if(rating !== 'ALL'){
        searchCondition += `&rating=${rating}`
    }
    console.log(searchCondition)
    try{
        const result = await axios.get(`https://api.giphy.com/v1/${resource}/search?q=${encodeURIComponent(keywords)}&api_key=${API_KEY}${searchCondition}`)
        console.log('Before send back=================')
        // console.log(result.data)
        res.send(result.data)
    } catch (err){
        next(err)
    }
    
})

router.get('/gifs/id/:id', async (req, res, next) => {
    console.log('Search by id is triger')
    const id = req.params.id
    console.log(id)
    try{
        const result = await axios.get(`https://api.giphy.com/v1/gifs/${id}?api_key=${API_KEY}`)
        console.log('Before send back=================')
        // console.log(result.data)
        res.send(result.data)
    } catch (err){
        next(err)
    }
})

router.get('/:resource/random', async (req, res, next) => {
    console.log('Random API is triger')
    const resource = req.params.resource
    const { keywords, rating } = req.query

    let searchCondition = `&tag=${keywords === '#none' ? '' : keywords}`
    if(rating !== 'ALL') {
        searchCondition += `&rating=${rating}`
    }
    try{
        const result = await axios.get(`https://api.giphy.com/v1/${resource}/random?api_key=${API_KEY}${searchCondition}`)
        console.log('Before send back=================')
        console.log(result.data)
        res.send(result.data)
    } catch (err){
        next(err)
    }
    
})

router.get('/:resource/trending', async (req, res, next) => {
    console.log('Trending API is triger')
    const resource = req.params.resource
    const { rating, limit, offset } = req.query
    
    let searchCondition = `&limit=${limit}&offset=${offset}`
    if(rating !== 'ALL'){
        searchCondition += `&rating=${rating}`
    }
    try{
        const result = await axios.get(`https://api.giphy.com/v1/${resource}/trending?api_key=${API_KEY}${searchCondition}`)
        console.log('Before send back=================')
        // console.log(result.data)
        res.send(result.data)
    } catch (err){
        next(err)
    }
    
})

router.get('/:resource/translate/:keywords', async (req, res, next) => {
    console.log('Translate is triger')
    const keywords = req.params.keywords
    const resource = req.params.resource
    console.log(keywords)
    try{
        const result = await axios.get(`https://api.giphy.com/v1/${resource}/translate?api_key=${API_KEY}&s=${encodeURIComponent(keywords)}`,
        )
        console.log('Before send back=================')
        console.log(result.data)
        res.send(result.data)
    } catch (err){
        next(err)
    }
    
})










