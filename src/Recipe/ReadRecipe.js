import React, { Component } from 'react';
import {
  Well,
  PageHeader,
  Grid,
  Row,
  Col,
  Image,
  Button
} from 'react-bootstrap/dist/react-bootstrap.js';
import {
  Link
} from 'react-router-dom';
import Header from '../PageLayout/Header';
import Footer from '../PageLayout/Footer';

import config from '../config';

class ReadRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageId: props.match.params.id,
      blogContent: []
    }
    console.log('ddd',props.match.params.id);
  }
  componentDidMount(){
    var that = this;
    this.getBlogContent()
    .then(function( response ){
      if (response.ok) {
        response.json().then(json => {
            var data = [];
            data.push(json.data);
            that.setState({
              blogContent: data
            })
        });
      }
    })
    .catch(function( err ){
      console.log('err while fetching blog', err);
    })
  }
  getBlogContent(){
    var that = this;
    return fetch( config.host + config.middleware + '/recipe/' + that.state.currentPageId, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
  }
  render(){
    var that = this;
    if(that.state.blogContent.length){
      return(
        <div>
          <Header />
        <Grid>
            <Row className="show-grid">
            <PageHeader>Recipe Detail</PageHeader>
              <Col xs={6} md={4}><code></code></Col>
              <Col xs={6} md={4}>
                <Well bsSize="small"> {that.state.blogContent[0].title} </Well>
                <code>
                    <Image src={that.state.blogContent[0].image} alt="blog" responsive />
                </code>
                <p>
                {that.state.blogContent[0].description}
                </p>
              </Col>
              <Col xsHidden md={4}><code>Created At:{that.state.blogContent[0].createdAt} </code></Col>
            </Row>
            <Link to="/"><Button bsStyle="primary">Go Back</Button></Link>
          </Grid>

          <Footer />
        </div>
      )
    } else {
      return (
        <div>
          Loading . . .
        </div>
      )
    }
  }
}



export default ReadRecipe;
