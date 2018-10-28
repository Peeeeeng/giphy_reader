import axios from 'axios'

// initial state
const defaultGifs = {
    gifArr: []
}

// action types
const SET_GIFS = 'SET_GIFS'
// const SET_WARNING = 'SET_WARNING'
// const CLEAR_WARNING = 'CLEAR_WARNING'

// action creators
const setGifs = (gifArr) => ({ type: SET_GIFS, gifArr })

// thunk creators
export const getGifs = (searchTerm) => async (dispatch) => {
    try{
        let res
        let gifArr
        let { resource, type, text, rating, limit, offset, lang } = searchTerm
        let searchStr = text
        if(type === 'keywords'){
            searchStr = searchStr.split(' ').join('+')
            res = await axios.get(`api/${resource}/keywords?keywords=${searchStr}&limit=${limit}&offset=${offset}&rating=${rating}&lang=${lang}`)
        } else if(type === 'id') {
            res = await axios.get(`api/gifs/id/${searchStr}`)
        } else if(type === 'random'){
            // tag rating
            res = await axios.get(`api/${resource}/random?keywords=${searchStr}&rating=${rating}`)
        } else if(type === 'trending'){
            // limit, rating
            res = await axios.get(`api/${resource}/trending?rating=${rating}&limit=${limit}&offset=${offset}`)
            gifArr = res.data.data
        } else if(type === 'translate'){
            res = await axios.get(`api/${resource}/translate/${searchStr}`,
            )
        } else {
            gifArr = []
        }
        gifArr = res.data.data
        if(!Array.isArray(gifArr)){
            gifArr = [gifArr]
        }
        dispatch(setGifs(gifArr))
        
    } catch(err) {
        console.error(err)
    }
}


// reducer
export default function(state = defaultGifs, action) {
    switch (action.type) {
        case SET_GIFS:
            return {...state, gifArr: action.gifArr}
        default:
            return state
    }
}