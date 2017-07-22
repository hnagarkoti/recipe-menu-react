import React, { Component } from 'react';

import './App.css';
import config from './config.js';
import Header from './PageLayout/Header';
import Footer from './PageLayout/Footer';

import BlogRow from './Blogs/BlogRow';

class Home extends Component{
  constructor(){
    super();
    this.state = {
      blogList: []
    }
  }
  componentDidMount(){
    var that = this;
    this.getBlogs()
    .then(function( response ){
      if (response.ok) {
        response.json().then(json => {
            that.setState({
              blogList: json.data
            })
        });
      }
    })
    .catch(function( err ){
      console.log('err:- ', err);
    })
  }
  getBlogs(){
    return fetch( config.host + config.middleware + '/blogs', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
  }
  render(){
    var that = this;
    if(that.state.blogList.length){
      return(
        <div >
          <div >
            {/* Header part */}
              <Header />
            {/* Header part */}


          {/* Rendering Rows for blogs based upon for loop as written above*/}
           <BlogRow items={that.state.blogList}/>
          {/* Rendering Rows for blogs based upon for loop as written above*/}

          {/* Footer part */}
            <Footer />
          {/* Footer part */}
          </div>
        </div>
      )
    }
    return(
      <div>
        {/* Showing Loading Screen or Spinner until items are not loaded or fetched from server */}
        <h1>Loading . . .</h1>
      </div>
    )
  }
}

export default Home;
