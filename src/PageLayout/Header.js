import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem,
} from 'react-bootstrap/dist/react-bootstrap.js';

class Header extends Component{
  render(){
    return(
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Recipe Menu For Times</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1}><Link to="/about">About Us</Link></NavItem>
                <NavItem eventKey={1}><Link to="/recipes">Add Recipe</Link></NavItem>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} ><Link to="/popular/recipe">Popular Recipe</Link></NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
    )
  }
}



export default Header;
