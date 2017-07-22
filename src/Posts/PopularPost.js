import React, { Component } from 'react';

import {
  Col,
  Row,
  Image
} from 'react-bootstrap/dist/react-bootstrap.js';
import {
  Link
} from 'react-router-dom';

import config from '../config';

class PopularPost extends Component {
  constructor(){
    super();
    this.state = {
      popularPostList: []
    }
  }
  componentDidMount(){
    var that = this;
    this.getPopularPosts()
    .then(function( response ){
      if (response.ok) {
        response.json().then(json => {
            that.setState({
              popularPostList: json.data
            })
        });
      }
    })
    .catch(function( err ){
      console.log('err:- ', err);
    })
  }
  getPopularPosts(){
    return fetch( config.host + config.middleware + '/popular/posts', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
  }
  render(){
    var that = this;
    if(that.state.popularPostList.length){
      return(
        <Col xs={6} md={4}>
          <code>
            <div>
              <h3 style={{color: 'blue'}}>Popular Posts</h3>
              <div>
                {
                  that.state.popularPostList.map( function(val, index, arr){
                    return(
                      <div key={index}>
                        <Row>
                          <Col xs={6} md={6}>
                            <Image src={that.state.popularPostList[index].image} circle responsive/>
                          </Col>
                        </Row>
                          <article>
                            <p>{that.state.popularPostList[index].description ? that.state.popularPostList[index].description.substring(0,180) : 'Not Defined'}</p>
                          </article>
                          <Link to={'/blog/' + that.state.popularPostList[index]._id}> Read More </Link>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </code>
        </Col>
      )
    } else {
      return(
        <div>
          Loading . . .
        </div>
      )
    }
  }
}

export default PopularPost;
