import React, { Component } from 'react'

class SearchPage extends Component {
    render() {
        return (
            <div>
                <input placeholder='Type in search term' />
                <button>Search</button>
            </div>
        )
    }
}

export default SearchPage