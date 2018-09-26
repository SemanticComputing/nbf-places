import React from 'react';
import {
  Modal,
  Button,
  NavItem
} from 'react-bootstrap';

class HelpModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div className="pull-right instructions-modal-button">
        <NavItem eventKey={4} onClick={this.handleShow}>
          <span className="glyphicon glyphicon-question-sign koli-color" aria-hidden="true"></span> <span className="koli-color">Ohje</span>
        </NavItem>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <h1>Biografiasammon käyttöohje</h1>
          </Modal.Header>
          <Modal.Body>
            <p>Biografiasammon käyttäjiä ovat 1) ihmiset ja 2) tietokoneet.</p>
            <h2>Käyttö elämäkertojen tutkimiseen</h2>
            <p>Semanttinen kansallisbiografia tarjoaa sisältöjään loppukäyttäjälle
            erilaisten sovellusnäkymien kautta, joita ovat:</p>
            <ol className="instructions-modal-list">
              <li>
                <div>
                  <span><b>Henkilöt</b>-näkymän kautta voit hakea joustavasti elämäkertoja fasettihaun avulla.</span>
                </div>
              </li>
              <li>
                <div>
                  <span><b>Paikat</b>-näkymässä voit hakea ja katsoa biografioiden tapahtumia zoomautuvilla kartoilla ml.
                  historialliset kartat. Paikan markkeria klikkaamalla aukeaa paikan kotisivu, josta löytyy kaikki paikkaan
                  liittyvä informaatio.</span>
                </div>
              </li>
              <li>
                <div>
                  <span><b>Elämäkartat</b>-näkymän kautta voit tarkastella ja vertailla ryhmien elämäkertoja kartoilla.</span>
                </div>
              </li>
              <li>
                <div>
                  <span><b>Tilastot</b>-näkymän avulla voi rajata henkilöryhmiä ja tutkia ja vertailla niitä proposopografisesti
                  tilastojen avulla.</span>
                </div>
              </li>
              <li>
                <div>
                  <span><b>Verkostot</b>-näkymä tarjoaa työkaluja henkilöiden välisten verkostojen tutkimiseen.</span>
                </div>
              </li>
              <li>
                <div>
                  <span><b>Yhteyshaussa</b> voi etsiä henkilöiden ja paikkojen välisiä yhteyksiä.</span>
                </div>
              </li>
              <li>
                <div>
                  <span><b>Kielialanalyysi</b>-näkymän avulla voi rajata elämäkertoja ja tutkia niissä käytettyä kieltä.</span>
                </div>
              </li>
            </ol>
            <p>Sovellusnäkymän voi valita portaalin aloitussivulta ja aina eri näkymien sovellussivujen yläpalkista.</p>
            <p>Biografiasammon sisältöjä on esitelty hankkeen <a href="http://seco.cs.aalto.fi/projects/biografiasampo#aineistot">
            kotisivulla</a>.
            </p>
            <h2>Käyttö datapalveluna</h2>
            <p>Elämäkertoihin liittyvää metadataa on toistaiseksi saatavilla linkitettynä avoimena datana (Linked Open Data)
            tekijänoikeuksista johtuen vain erikseen sopimalla. Lisätietoja saa hankkeen <a href="http://seco.cs.aalto.fi/projects/biografiasampo#yhteystiedot">
            yhteyshenkilöiltä</a>. Dataa voidaan periaatteessa ottaa käyttöön sovelluksissa joko lähdedataa lataamalla,
            toiminnallisen SPARQL-rajapinnan kautta tai viittaamalla suoraan sisältökohteiden kotisivuihin.
            </p>
            <p>Aineistot on muunnettu ja harmonisoitu semanttisesti yhteentoimivaksi tietämysverkoksi (knowledge graph)
            semanttisen webin teknologioiden avulla Aalto-yliopiston johtamassa <a href="https://seco.cs.aalto.fi/projects/severi/">Severi-projektissa</a> osana
            laajempaa <a href="https://seco.cs.aalto.fi/projects/biographies/">semanttisiin elämäkertoihin</a> liittyvää tutkimustyötä.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default HelpModal;
