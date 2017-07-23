import React, { Component } from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Grid,
  Row,
  Col,
  ButtonToolbar,
  Button
} from 'react-bootstrap/dist/react-bootstrap.js';

import {
  Link
} from 'react-router-dom';

import Dropzone from 'react-dropzone';

import Header from '../PageLayout/Header';
import Footer from '../PageLayout/Footer';
import config from '../config';
import $ from 'jquery'

class CreateBlog extends Component {
  constructor() {
    super();
    this.state = {
      title:'',
      description: '',
      image: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }
  getValidationState() {
    const length = this.state.title.length;
    if (length > 6) return 'success';
    else if (length > 10) return 'warning';
    else if (length > 200) return 'error';
  }
  handleChange(e) {
    this.setState({ title: e.target.value });
  }
  onOpenClick () {
      this.refs.dropzoneImage.open();
  }
  onDrop(files) {
      var that = this;
      console.log('ondrop :-', files);
      this.uploadImage(files);
  }
  uploadImage(files){
      var that = this;
      var files = files;
      // console.log('image files:-- ',files[0].preview);
      let imageUrl = config.host + config.middleware + '/image';
      var form = new FormData();
      form.append("avatar", files[0]);
      console.log('form:- ', form, imageUrl, 'files:- ',files[0]);
      $.ajax({
           url: imageUrl,
           type: 'POST',
           data: form,
           dataType: 'json',
           xhr: function() {
             var xhr = new window.XMLHttpRequest();
             xhr.upload.addEventListener("progress", function(evt) {
               if (evt.lengthComputable) {
                 var percentComplete = evt.loaded / evt.total;
                 percentComplete = parseInt(percentComplete * 100);
                 if (percentComplete === 100) {
                 }
               }
             }, false);
             return xhr;
           },
           processData: false,
           contentType: false,
           success: function(data){
             console.log('sucees iamg upload:- ',data.data.fullPath);
             that.setState({
               image: data.data.fullPath
             });
           },
           error: function(err){
             console.log('error while image upload:- ',err);
           }
         });
    }
  addBlog(){
    var that = this;
    var obj = {};
    obj = {
      "title": this.state.title,
      "description": this.state.description,
      "image": this.state.image
    }
    var url = config.host + config.middleware + '/blogs';
    var data = new FormData();
    data.append( "json", JSON.stringify( obj ) );
    fetch(url, {
      method: 'post',
      body: JSON.stringify(obj),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      if(data.success){
        that.setState({
          title: '',
          description: '',
          image: null
        });
        alert('Blog added sucessfully');
      } else {
        console.log('Technical Error while adding Blog',data);
      }
    })
    .catch(function(err){
      console.log('Technical Error while adding Blog');
    })
  }
  handleDescriptionChange(e){
     this.setState( { description: e.target.value} );
  }
  render(){
    return(
      <div>
      <Header />

      <Grid>
          <Row className="show-grid">
            <Col xs={6} md={4}><code></code></Col>
            <Col xs={6} md={4}><code>

            <form>
              <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationState()}
              >
                <ControlLabel>Create new blog </ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.title}
                  placeholder="Enter Blog Title"
                  onChange={this.handleChange}
                />
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Blog Description</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Blog Description" value={this.state.description} onChange={this.handleDescriptionChange}/>
                </FormGroup>

                <Dropzone onDrop={this.onDrop.bind(this)}>
                  <p>Try dropping some files here, or click to select files to upload.</p>
                </Dropzone>

                <FormControl.Feedback />
                <HelpBlock>Validation is based on string length.</HelpBlock>
              </FormGroup>
              <ButtonToolbar>
                <Button bsStyle="primary" onClick={this.addBlog.bind(this)}>Add Blog</Button>
                <Button bsStyle="danger"><Link to="/">Cancel</Link></Button>
              </ButtonToolbar>
            </form>

            </code></Col>
            <Col xsHidden md={4}><code></code></Col>
          </Row>
        </Grid>

      <Footer />

      </div>
    )
  }
}

export default CreateBlog;
