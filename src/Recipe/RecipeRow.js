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
import config from '../config.js';
class RecipeRow extends Component {
  constructor(props){
    super(props);
    // this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete(id){
    console.log('ok delete id ', id);

      fetch( config.host + config.middleware + '/recipe/'+id, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
          },
        }).then((res) => {
          console.log('delted successfully!');
          alert('successfully deleted! Please refresh ur page or we can update state also in this case')
        })
        .catch((err) => {
          console.log('error while deleting!!');
          alert("Some problem while deleting recipe!")
        })
  }
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
                          <Link to={'/recipe/' + item._id}> Read More </Link>
                        </article>
                        &nbsp;&nbsp;<article>
                          <p onClick={that.handleDelete.bind(this, item._id)}> Delete Recipe </p>
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

export default RecipeRow;
