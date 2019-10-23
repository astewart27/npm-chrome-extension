import React, { Component } from 'react';

import './App.css';
import search from './search.svg';

class App extends Component {

  state = {
    query : '',
    results : []
  }

  handleChange = (e) => {
    this.setState({query : e.target.value });
  }

  handleSubmit =  async (e) => {
    e.preventDefault();
    const query = this.state.query;
    const request = await fetch(`http://registry.npmjs.com/-/v1/search?text=${query}&size=10`);
    const response = await request.json();
    console.log(response.objects);
    this.setState({results : response.objects });
  }

  render() {
    return (
      <div className="chrome-ext-app">
        <div className="chrome-ext-wrapper">
          <h1 className="header">Search NPM Registry</h1>
          <form onSubmit={this.handleSubmit}>
            <input className="form-input" type="text" name="search" onChange={this.handleChange}/>
            <button className="form-button"><img src={search} alt="Search"/></button>
          </form>
          { this.state.results.length > 0 && 
            <div className="results">
              <ul>
              { this.state.results.map((module, index) => (
                <li key={index}>
                  <a className="package-name-link" href={module.package.links.npm} target="_blank" rel="noopener noreferrer">{module.package.name}</a>
                  <div className="description">{module.package.description}</div>
                  {module.package.keywords.length > 0 && 
                    <div className="tag-container">
                      {module.package.keywords.slice(0,3).map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  }
                  <div className="link-container">
                  <a className="btn homepage-link" href={module.package.links.npm} target="_blank" rel="noopener noreferrer">npm</a>
                    <a className="btn homepage-link" href={module.package.links.homepage} target="_blank" rel="noopener noreferrer">homepage</a>
                    <a className="btn repo-link" href={module.package.links.repository} target="_blank" rel="noopener noreferrer">repository</a>
                  </div>
                </li>
              )) }
              </ul>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default App;
