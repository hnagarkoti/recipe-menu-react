import React, { Component } from 'react';

import {
  Col,
  Row,
} from 'react-bootstrap/dist/react-bootstrap.js';

import config from '../config';

class PopularPostList extends Component {
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
    return fetch( config.host + config.middleware + '/popular/recipe', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
  }
  render(){
      return(
        <Col xs={6} md={4}>
          <code>
            <div>
              <h3 style={{color: 'blue'}}>Popular Posts</h3>
              <div>

                      <div>
                        <Row>
                          <Col xs={6} md={6}>

                          </Col>
                        </Row>
                          <article>
                            <p>Not Created</p>
                          </article>
                      </div>

              </div>
            </div>
          </code>
        </Col>
      )
  }
}

export default PopularPostList;
