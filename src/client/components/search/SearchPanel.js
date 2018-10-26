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
            source: 'public',
            totalLimit: 25,
            offset: 0,
            rating: '',
            lang: 'en',
            advance: false,
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleBSOptions = this.handleBSOptions.bind(this)
        this.handleSourceChange = this.handleSourceChange.bind(this)
    }

    handleInput = (evt) => {
        this.setState({
            [evt.target.id]: evt.target.value
        })
    }

    handleSearch = async (evt) => {
        console.log(this.state.searchInput)
        evt.persist()
        const searchTerm = {}
        searchTerm.text = this.state.searchInput
        searchTerm.type = this.state.byKeywords ? 'keywords' : 'id'
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

    handleSourceChange = (evt) => {
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
        const { byKeywords } = this.state
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
                        > Search
                        </button>
                    </div>
                    <div id='BSOptions'>
                        <input type='radio' 
                        name='searchBy' 
                        value='keywords' 
                        id='searchByKeywords'
                        checked={byKeywords} 
                        onClick={this.handleBSOptions}
                        />
                        <label for='searchByKeywords'>
                            Keywords
                        </label>
                        
                        <input type='radio' 
                        name='searchBy' 
                        value='id' 
                        id='searchById'
                        checked={!byKeywords} 
                        onClick={this.handleBSOptions}
                        />
                        <label for='searchById'>
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

                        <label>Source</label>
                        <select id='source'
                        onChange={this.handleSourceChange}>
                            <option value="public">Public</option>
                            <option value="sticker">Sticker</option>
                        </select>

                        <label>Rating</label>
                        <select id='rating'
                        onChange={this.handleSourceChange}>
                            {ratingType.map((rating) => {
                                return (
                                    <option value={rating}>{rating}</option>
                                )
                            })}
                        </select>

                        <label>Language</label>
                        <select id='lang'
                        onChange={this.handleSourceChange}>
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
                        </div>
                        <div>
                            <label>Offset</label>
                            <input id='offset'
                            placeholder='0'
                            onChange={this.handleInput}
                            />
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