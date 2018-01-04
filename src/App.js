import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'


import Home from './Home';
import About from './About';
import ReadRecipe from './Recipe/ReadRecipe';
import CreateRecipe from './Recipe/CreateRecipe';
import PopularPostList from './Posts/PopularPostList';


class App extends Component {
  render() {
      return(
        <Router>
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/recipe/:id" component={ReadRecipe}/>
            <Route path="/recipes" component={CreateRecipe}/>
            <Route path="/popular/recipe" component={PopularPostList} />
          </div>
        </Router>
      )
  }
}

export default App;
