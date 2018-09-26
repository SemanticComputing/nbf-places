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
        <a href="http://biografiasampo.fi/" style={{padding: '0px 0px 10px 0px'}}>
          <span>
            <img width="90" height="50" src="img/logos/agricola.jpg" />
          </span>
        </a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullLeft>
        <NavItem eventKey={1} href="http://biografiasampo.fi/haku">
          <span className="glyphicon glyphicon-search" aria-hidden="true"></span> Haku
        </NavItem>
        <NavItem eventKey={1} href="http://biografiasampo.fi/kartat/tapahtumat">
          <span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span> Kartat
        </NavItem>
        <NavItem eventKey={1} href="#">
          <span className="glyphicon glyphicon-globe" aria-hidden="true"></span> Paikat
        </NavItem>
        <NavItem eventKey={1} href="http://biografiasampo.fi/tilastot/palkit">
          <span className="glyphicon glyphicon-stats" aria-hidden="true"></span> Tilastot
        </NavItem>
        <NavItem eventKey={1} href="http://biografiasampo.fi/verkostot">
          <span className="glyphicon glyphicon-link" aria-hidden="true"></span> Verkostot
        </NavItem>
        <NavItem eventKey={1} href="http://biografiasampo.fi/yhteyshaku/">
          <span className="glyphicon glyphicon-resize-small" aria-hidden="true"></span> Yhteyshaku
        </NavItem>
        <NavItem eventKey={1} href="http://biografiasampo.fi/kielianalyysi">
          <span className="glyphicon glyphicon-book" aria-hidden="true"></span> Kielianalyysi
        </NavItem>
      </Nav>

      <Nav pullRight>
        <NavItem eventKey={1} href="#">
          Palaute
        </NavItem>
        <NavDropdown eventKey={3} title="Tietoja" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
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
