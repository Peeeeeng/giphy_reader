import React, { Component } from 'react'
import axios from 'axios'



class SearchPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: ''
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    handleSearch = async (evt) => {
        console.log(this.state.searchTerm)
        evt.persist()
        const res = await axios.get(`api/keywords/${this.state.searchTerm}`)
        console.log(res.data)
    }

    // fetchData = async (search) => {

    // }

    handleInput = (evt) => {
        this.setState({
            [evt.target.className]: evt.target.value
        })
    }
    render() {
        // console.log(this.state.searchTerm)
        return (
            <div>
                <input placeholder='Type in search term'
                       className='searchTerm' 
                       onChange={this.handleInput} 
                />
                <button onClick={this.handleSearch}>
                Search
                </button>
            </div>
        )
    }
}

export default SearchPage