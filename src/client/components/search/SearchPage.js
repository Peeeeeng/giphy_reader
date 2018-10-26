import React, { Component } from 'react'
import { connect } from 'react-redux'
import DisplayData from '../displayData/DisplayData'
import { getGifs } from '../../store/gifReducer'
import SearchPanel from './SearchPanel'



class SearchPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // searchTerm: ''
        }
        // this.handleSearch = this.handleSearch.bind(this)
        // this.handleInput = this.handleInput.bind(this)
    }

    // handleSearch = async (evt) => {
    //     console.log(this.state.searchTerm)
    //     evt.persist()
    //     // const res = await axios.get(`api/keywords/${this.state.searchTerm}`)
    //     this.props.getGifs({text:this.state.searchTerm, type: 'keywords'})
    //     // console.log(res.data)
    // }

    // fetchData = async (search) => {

    // }

    // handleInput = (evt) => {
    //     this.setState({
    //         [evt.target.className]: evt.target.value
    //     })
    // }
    render() {
        // console.log(this.state.searchTerm)
        return (
            <div>
                {/* <input placeholder='Type in search term'
                       className='searchTerm' 
                       onChange={this.handleInput} 
                />
                <button onClick={this.handleSearch}>
                Search
                </button> */}
                <SearchPanel />
                <DisplayData />
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

export default connect(null, mapDispatch)(SearchPage)