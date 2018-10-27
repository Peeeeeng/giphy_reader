import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGifs } from '../../store/gifReducer'
import '../App.css'

import { ratingType, langType } from '../../utils/utils'


class SearchPanel extends Component {
    constructor(props){
        super(props)
        this.state = {
            byKeywords: true,
            searchInput: '',
            resource: 'gifs',
            totalLimit: 25,
            offset: 0,
            rating: '',
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
            byKeywords, 
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
            type: byKeywords ? 'keywords' : 'id',
            resource,
            rating,
            lang,
            limit: Math.abs(Math.floor(totalLimit)),
            offset: Math.abs(Math.floor(offset)),
        }
        // searchTerm.text = searchInput
        // searchTerm.type = byKeywords ? 'keywords' : 'id'
        // searchTerm.resource = resource

        // searchTerm.language = lang
        const limit = Math.floor(totalLimit)
        console.log(limit)
        console.log(!isNaN(totalLimit))

        this.props.getGifs(searchTerm)
    }

    handleBSOptions = (evt) => {
        console.log(evt.target.value)
        if(evt.target.value === 'keywords' && !this.state.byKeywords){
            this.setState({...this.state, byKeywords: true})
        } else if (evt.target.value === 'id' && this.state.byKeywords){
            this.setState({...this.state, byKeywords: false})
        }
    }

    handleSelectChange = (evt) => {
        // console.log(evt.target.id)
        // console.log(evt.target.value)
        this.setState({...this.state, [evt.target.id]: evt.target.value})
    }

    openAdvance = (evt) => {
        this.setState({
            advance: true
        })
    }

    render(){
        const { totalLimit, offset, searchInput } = this.state
        console.log(this.state)
        return (
            <div>
                <div className='basicSearch'>
                    <div>
                        <input id='searchInput' 
                        placeholder='Type in search term'
                        onChange={this.handleInput}
                        />
                        <button id='searchButton'
                        onClick={this.handleSearch}
                        disabled={isNaN(totalLimit) || isNaN(offset)}
                        > {searchInput?'Search':'Random'}
                        </button>
                    </div>
                    <div id='BSOptions'>
                        <input type='radio' 
                        name='searchBy' 
                        value='keywords' 
                        id='searchByKeywords'
                        defaultChecked={true}
                        // checked={byKeywords} 
                        onClick={this.handleBSOptions}
                        />
                        <label htmlFor='searchByKeywords'>
                            Keywords
                        </label>
                        
                        <input type='radio' 
                        name='searchBy' 
                        value='id' 
                        id='searchById'
                        // checked={!byKeywords} 
                        onClick={this.handleBSOptions}
                        />
                        <label htmlFor='searchById'>
                            Gif Id
                        </label>
                        
                        <button id='advanceSearch'
                        onClick={this.openAdvance}>
                        Advance Search
                        </button>
                    </div>
                </div>
                <div className='advanceSearch'>
                    <div className='ASSelector'>

                        <label>resource</label>
                        <select id='resource'
                        onChange={this.handleSelectChange}>
                            <option value="gifs">Gifs</option>
                            <option value="stickers">Stickers</option>
                        </select>

                        <label>Rating</label>
                        <select id='rating'
                        onChange={this.handleSelectChange}>
                            {ratingType.map((rating) => {
                                return (
                                    <option value={rating}>{rating}</option>
                                )
                            })}
                        </select>

                        <label>Language</label>
                        <select id='lang'
                        onChange={this.handleSelectChange}>
                        {langType.map((language) => {
                            const [ key ] = Object.keys(language)
                                return (
                                    <option value={language[key]}>{key}</option>
                                )
                        })}
                        </select>

                    </div>

                    <div className='ASInputer'>
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
                    </div>
                </div>
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