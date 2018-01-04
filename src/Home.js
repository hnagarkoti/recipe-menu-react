import React, { Component } from 'react';

import './App.css';
import config from './config.js';
import Header from './PageLayout/Header';
import Footer from './PageLayout/Footer';

import RecipeRow from './Recipe/RecipeRow';

import {
  Pagination
} from 'react-bootstrap/dist/react-bootstrap.js';

class Home extends Component{
  constructor(){
    super();
    this.state = {
      recipeList: [],
      recipeListArr:[],
      activePage:1,
      maxButtons: 1
    }
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(eventKey) {
    var that = this;
    var no_of_items = eventKey*3;
    var sliced_arr = this.state.recipeListArr;
    sliced_arr = sliced_arr.slice(0, no_of_items);
    this.setState({
      activePage: eventKey,
      recipeList: sliced_arr
    });

  }
  componentDidMount(){
    var that = this;
    that.getBlogs()
    .then(function( response ){
      if (response.ok) {
        response.json().then(json => {
          var len = json.data.length;
          len = Math.round(len/3);
          // if(len == 0){
          //   len = 1
          // }
          var data = json.data.slice(0,3);
            that.setState({
              recipeList: data,
              recipeListArr: json.data,
              maxButtons: len
            })
        });
      }
    })
    .catch(function( err ){
      console.log('err:- ', err);
    })
  }
  getBlogs(){
    return fetch( config.host + config.middleware + '/recipe', {
        // mode:'no-cors',
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
  }
  render(){
    var that = this;
    if(that.state.recipeList.length){
      return(
        <div >
          <div >
            {/* Header part */}
              <Header />
            {/* Header part */}


          {/* Rendering Rows for blogs based upon for loop as written above*/}
           <RecipeRow items={that.state.recipeList}/>
          {/* Rendering Rows for blogs based upon for loop as written above*/}


          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            items={4}
            maxButtons={4}
            activePage={this.state.activePage}
            onSelect={this.handleSelect} />

          {/* Footer part */}
            <Footer />
          {/* Footer part */}
          </div>
        </div>
      )
    } else {
      return(
        <div>
          {/* Showing Loading Screen or Spinner until items are not loaded or fetched from server */}
          <h1>Loading . . .</h1>
        </div>
      )
    }
  }
}

export default Home;
