import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import {
  Grid,
  Col,
  Row,
  Image,
 } from 'react-bootstrap/dist/react-bootstrap.js';

 import PopularPost from '../Posts/PopularPost';

class BlogRow extends Component {
  render(){
    var that = this;
    return(
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <code>
              <div>
                { that.props.items.map(function(item, index, arr){
                  return(
                    <div key={index}>
                      <div>
                        <h2>{item.title}</h2>
                        <Image src={item.image} responsive />
                      </div>
                      <div>
                        <article>
                          <p>{ item.description ? item.description.substring(0,200) : 'Description Not Available' }</p>
                          <Link to={'/blog/' + item._id}> Read More </Link>
                        </article>
                      </div>
                  </div>
                )
                }) }
              </div>
            </code>

            </Col>
          <PopularPost />
        </Row>

      </Grid>
    )
  }
}

export default BlogRow;
