import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGifs } from '../../store/gifReducer'
import '../App.css'

import { ratingType, langType } from '../../utils/utils'


class SearchPanel extends Component {
    constructor(props){
        super(props)
        this.state = {
            type: 'keywords',
            searchInput: '',
            resource: 'gifs',
            totalLimit: 25,
            offset: 0,
            rating: 'ALL',
            lang: 'en',
            advance: false,
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleBSOptions = this.handleBSOptions.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
    }

    handleInput = (evt) => {
        this.setState({
            [evt.target.id]: evt.target.value
        })
    }

    handleSearch = async (evt) => {
        console.log(this.state.searchInput)
        
        const { 
            searchInput, 
            type, 
            resource, 
            totalLimit, 
            offset, 
            rating, 
            lang 
        } = this.state 
        if(isNaN(totalLimit) || isNaN(offset)){
            return false
        }
        evt.persist()
        const searchTerm = {
            text: searchInput,
            type,
            resource,
            rating,
            lang,
            limit: Math.abs(Math.floor(totalLimit)),
            offset: Math.abs(Math.floor(offset)),
        }
        if(!searchTerm.text.split(' ').join('')){
            searchTerm.type = 'random'
        }
        this.setState({...this.state, searchInput: ''})
        // const limit = Math.floor(totalLimit)
        // console.log(limit)
        // console.log(!isNaN(totalLimit))

        this.props.getGifs(searchTerm)
    }

    handleBSOptions = (evt) => {
        console.log(evt.target.value)
        const type = evt.target.value
        this.setState({
            ...this.state, 
            type,
            advance: (type === 'id' || type === 'translate') ? false : this.state.advance
        })
    }

    handleSelectChange = (evt) => {
        // console.log(evt.target.id)
        // console.log(evt.target.value)
        this.setState({
            ...this.state, 
            [evt.target.id]: evt.target.value
        })
    }

    openAdvance = (evt) => {
        this.setState({
            advance: !this.state.advance
        })
    }

    render(){
        const { totalLimit, offset, type, advance, searchInput } = this.state
        console.log(this.state)
        return (
            <div>
                <div className='basicSearch'>
                    <div>
                        <label>Resource</label>
                        <select id='resource'
                        onChange={this.handleSelectChange}>
                            <option value="gifs">Gifs</option>
                            <option value="stickers">Stickers</option>
                        </select>
                        <input id='searchInput' 
                        placeholder='Search terms'
                        onChange={this.handleInput}
                        value={searchInput}
                        />
                        <button id='searchButton'
                        onClick={this.handleSearch}
                        disabled={isNaN(totalLimit) || isNaN(offset)}
                        >&nbsp;&nbsp;&nbsp;Search&nbsp;&nbsp;&nbsp;
                        </button>
                    </div>
                    <div id='BSOptions'>
                        <input type='radio' 
                        name='searchBy' 
                        value='keywords' 
                        id='searchByKeywords'
                        defaultChecked={true}
                        onClick={this.handleBSOptions}
                        />
                        <label htmlFor='searchByKeywords'>
                            Keywords
                        </label>
                        
                        <input type='radio' 
                        name='searchBy' 
                        value='id' 
                        id='searchById'
                        onClick={this.handleBSOptions}
                        />
                        <label htmlFor='searchById'>
                            Gif Id
                        </label>

                        <input type='radio' 
                        name='searchBy' 
                        value='random' 
                        id='searchRandom'
                        onClick={this.handleBSOptions}
                        />
                        <label htmlFor='searchRandom'>
                            Random
                        </label>

                        <input type='radio' 
                        name='searchBy' 
                        value='trending' 
                        id='searchTrending'
                        onClick={this.handleBSOptions}
                        />
                        <label htmlFor='searchTrending'>
                            Trending
                        </label>

                        <input type='radio' 
                        name='searchBy' 
                        value='translate' 
                        id='searchTranslate'
                        onClick={this.handleBSOptions}
                        />
                        <label htmlFor='searchTranslate'>
                            Translate
                        </label>
                        
                        <button id='advanceSearch'
                        onClick={this.openAdvance}
                        disabled={type === 'id' || type === 'translate'}>
                            Advance Search
                        </button>

                        
                    </div>
                </div>

                {advance
                ?
                <div className='advanceSearch'>
                    <div className='ASSelector'>

                        <label>Rating</label>
                        <select id='rating'
                        onChange={this.handleSelectChange}>
                            {ratingType.map((rating) => {
                                return (
                                    <option value={rating} key={rating}>{rating}</option>
                                )
                            })}
                        </select>

                        {type === 'keywords'
                        ?
                        <div>
                            <label>Language</label>
                            <select id='lang'
                            onChange={this.handleSelectChange}>
                            {langType.map((language) => {
                                const [ key ] = Object.keys(language)
                                    return (
                                        <option value={language[key]} key={key}>{key}</option>
                                    )
                            })}
                            </select>
                        </div>
                        :
                        null
                        }

                    </div>

                    <div className='ASInputer'>
                        {type === 'keywords' || type === 'trending'
                        ?
                        <div>
                            <label>Result Number Limit</label>
                            <input id='totalLimit'
                            placeholder='25'
                            onChange={this.handleInput}
                            />
                            <font color="red">{isNaN(totalLimit)
                            ? 'Please enter a proper number.'
                            : ''}</font>
                        </div>
                        :
                        null
                        }
                        {type === 'keywords' || type === 'trending'
                        ?
                        <div>
                            <label>Offset</label>
                            <input id='offset'
                            placeholder='0'
                            onChange={this.handleInput}
                            />
                            <font color="red">{isNaN(offset)
                            ? 'Please enter a proper number.'
                            : ''}</font>
                        </div>
                        :
                        null
                        }
                    </div>
                </div>
                :
                null
                }
            </div>
        )
    }
}


const mapDispatch = (dispatch) => {
    return {
        getGifs: searchTerm => {
            dispatch(getGifs(searchTerm))
        }
    }
}

export default connect(null, mapDispatch)(SearchPanel)