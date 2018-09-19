import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap';

const BootstrapNavbar = () => (
  <Navbar
    inverse
    collapseOnSelect
    fluid
  >
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#brand" style={{padding: '0px 0px 10px 0px'}}>
          <span>
            <img width="90" height="50" src="img/logos/agricola.jpg" />
          </span>
        </a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavDropdown eventKey={3} title="Näkymät" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}><span className="glyphicon glyphicon-search" aria-hidden="true"></span> Hae ja selaa</MenuItem>
          <MenuItem eventKey={3.2}><span className="glyphicon glyphicon glyphicon-globe" aria-hidden="true"></span> Kartat</MenuItem>
          <MenuItem eventKey={3.3}><span className="glyphicon glyphicon-stats" aria-hidden="true"></span> Tilastot</MenuItem>
          <MenuItem eventKey={3.3}><span className="glyphicon glyphicon-link" aria-hidden="true"></span> Verkostoanalyysi</MenuItem>
          <MenuItem eventKey={3.3}><span className="glyphicon glyphicon-retweet" aria-hidden="true"></span> Yhteyshaku</MenuItem>
          <MenuItem eventKey={3.3}><span className="glyphicon glyphicon-book" aria-hidden="true"></span> Kielianalyysi</MenuItem>
        </NavDropdown>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} href="#">
        Palaute
        </NavItem>
        <NavDropdown eventKey={3} title="Tietoja" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>Separated link</MenuItem>
        </NavDropdown>
        <NavItem eventKey={2} href="#">
        Ohje
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default BootstrapNavbar;
