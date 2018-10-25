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
        if(searchTerm.type === 'keywords'){
            let searchStr = searchTerm.text.split(' ').join('+')
            res = await axios.get(`api/keywords/${searchStr}`)
        } else {
            let searchStr = searchTerm.text
            res = await axios.get(`api/id/${searchStr}`)
        }
        const gifArr = res.data.data
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