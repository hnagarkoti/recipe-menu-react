import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'


import Home from './Home';
import About from './About';
import ReadBlog from './Blogs/ReadBlog';
import CreateBlog from './Blogs/CreateBlog';
import PopularPostList from './Posts/PopularPostList';


class App extends Component {
  render() {
      return(
        <Router>
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/blog/:id" component={ReadBlog}/>
            <Route path="/blogs" component={CreateBlog}/>
            <Route path="/popular/posts" component={PopularPostList} />
          </div>
        </Router>
      )
  }
}

export default App;
