import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  Glyphicon
} from 'react-bootstrap';
import HelpModal from './HelpModal';

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
            <img width="100" height="55.15" src="img/logos/bs-books-logo.png" />
          </span>
        </a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullLeft>
        <NavItem eventKey={1} href="http://biografiasampo.fi/haku/ruudukko">
          <span className="glyphicon glyphicon-search" aria-hidden="true"></span> Henkilöt
        </NavItem>
        <NavItem className="active" eventKey={1} href="#">
          <span className="glyphicon glyphicon-search" aria-hidden="true"></span> Paikat
        </NavItem>
        <NavItem eventKey={1} href="http://biografiasampo.fi/kartat/tapahtumat">
          <span className="glyphicon glyphicon-globe" aria-hidden="true"></span> Elämäkartat
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
        <NavItem eventKey={2} href="http://biografiasampo.fi/palaute">
          <Glyphicon className="koli-color" glyph="pencil" /> <span className="koli-color">Palaute</span>
        </NavItem>
        <NavDropdown
          eventKey={3}
          title={
            <div className="koli-color" style={{ display: 'inline-block' }}>
              <Glyphicon glyph="info-sign" /> Tietoja{' '}
            </div>
          }
          id="instuctions-nav-dropdown">
          <NavItem href="https://seco.cs.aalto.fi/projects/biografiasampo#aineistot">Aineistot</NavItem>
          <NavItem href="https://www.ldf.fi/">Datapalvelu LDF.fi</NavItem>
          <NavItem href="https://seco.cs.aalto.fi/projects/biografiasampo/">Biografiasampo-projektin kotisivu</NavItem>
          <NavItem href="https://seco.cs.aalto.fi/projects/biografiasampo#yhteystiedot">Yhteystiedot</NavItem>
          <NavItem href="https://www.facebook.com/groups/514385075640669/"><img src="img/logos/FB-f-Logo__blue_29.png" /> Facebook-ryhmä</NavItem>
          <NavItem href="http://biografiasampo.fi/pdf/biografiasampo-rekisteriseloste.pdf">Rekisteriseloste</NavItem>
        </NavDropdown>
        <HelpModal />
      </Nav>
    </Navbar.Collapse>
  </Navbar>



);

export default BootstrapNavbar;
