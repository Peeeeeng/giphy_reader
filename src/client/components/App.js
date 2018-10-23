import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SearchPage from './search/SearchPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <SearchPage />
      </div>
    );
  }
}

export default App;
