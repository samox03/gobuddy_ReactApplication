import React, { Component } from 'react'
import NavbarBuddy from '../components/navigation/NavbarBuddy'
import NavbarTiger from '../components/navigation/NavbarTiger'
import NavbarFrontpage from '../components/navigation/NavbarFrontpage'


export default class AboutUs extends Component {
  render() {
    return (
      <div className="aboutContent">
        {/* show navbar depending on userstatus... also add: this.props.userInSession.usertype=='inNeed'? <NavbarTiger/>  */}
        {this.props.userInSession?.usertype == 'buddy' ? <NavbarBuddy userInSession={this.props.userInSession} /> : <NavbarFrontpage />}
        <div className="content-body">
          <div className="header-about-page-wrapper"></div>
          <div className="header-about-page-wrapper">
            <div className="header-about-page">
              <h3 className="about-heading">Connect</h3>
              <h3 className="about-heading">Share &</h3>
              <h3 className="about-heading">Raise against social inequiality</h3>
            </div>
          </div>

          <div className="header-about-page-wrapper">
            <div className="text-about-page">
              <p>GoBuddy is an open platform for people looking for some advises or an allyship on their current path and buddies who already went these paths or are experienced in other ways.</p>
              <p> The platform is made for 18+ only. A goal would be to implement also a verified buddy status as an extra to secure our community.</p>
              {/* <p>To keep our community as safe as possible we ask our buddies to upload a "polizeiliches Fuehrungszeignis". */}
              {/* For the status 'verified' the buddy needs to participate additionally at least in one of our face to face workshops. This is mandatory for all allyships with young tigers.</p> */}
              <p>---------------------------------------</p>
              <p>GoBuddy ist eine offene Platform fuer Personen, die Rat, Tat oder Gesellschaft auf ihrem aktuellen Weg suchen und Paten die bereits Erfahrung haben in diesem oder jenem Bereich und/oder ihre Zeit gerne teilen.</p>
             <p> Die Platform kann bislang leider nur ab 18+ Jahren genutzt werden. Ein naechstes Ziel waere es jedoch einen verifizierten Buddy-Status einzufuehren, sodass wir die Sicherheit in dieser Community erhoehen koennen.</p>
              {/* <p>Um die Sicherheit unserer Community so sicher wie möglich zu gestalten, bitten wir unsere Buddies ein polizeiliches Fuehrungszeignus hochzuladen.
                Fuer den verifizierten Buddy-Status wird mindestens eine Teilnahme an einem unserer Workshops vorrausgesetzt. Letzteres ist Vorraussetzung fuer die Kontaktaufnahme mit jungen Tigers</p>
              <p>---------------------------------------</p> */}
            </div>
          </div>
        </div>
      </div >
    )
  }
}

