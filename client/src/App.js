import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import Homepage from "./pages/Homepage"
import SignupBuddy from "./components/auth/SignupBuddy"
import SignupTiger from "./components/auth/SignupTiger"
import Login from "./components/auth/Login"
import BuddyView from './pages/views/Buddy/BuddyView';
import TigerView from './pages/views/Tiger/TigerView';
import TigerDetails from './pages/views/Buddy/TigerDetails';
import Footer from './components/Footer/Footer'
import AboutUs from './pages/AboutUs'
import TigerEdit from './pages/views/Tiger/TigerEdit';
import Messenger from './components/auth/contact/Messenger'
import Chatpage from './pages/Chatpage';


class App extends React.Component {

  state = {
    currentUser: this.props.user
  }

  updateTheUser = (userObj) => {
    this.setState({
      currentUser: userObj
    })
  }

  render() {

    return (
      <div className="App">

        <Switch>
          <Route exact path='/' component={Homepage}></Route>
          <Route exact path='/signup/buddy' render={() => <SignupBuddy updateTheUser={this.updateTheUser} />} />
          <Route exact path='/signup/tiger' render={() => <SignupTiger updateTheUser={this.updateTheUser} />} />
          <Route exact path='/login' render={() => {
            if (this.state.currentUser) {
              if (this.state.currentUser.usertype === 'buddy') {
                return <Redirect to='/buddyView'></Redirect>
              } else {
                return <Redirect to='/tigerView'></Redirect>
              }
            } else {
              return (
                <Login logInTheUser={this.updateTheUser}></Login>
              )
            }
          }}></Route>
          <Route exact path='/buddyView' render={() => <BuddyView userInSession={this.state.currentUser}></BuddyView>}></Route>
          <Route exact path='/tigerView' render={() => <TigerView userInSession={this.state.currentUser}></TigerView>}></Route>
          <Route exact path='/tigerView/edit' render={() => <TigerEdit userInSession={this.state.currentUser}></TigerEdit>}></Route>

          <Route exact path='/tigerslist/:id' render={() => <TigerDetails userInSession={this.state.currentUser}  ></TigerDetails>}></Route>
          <Route exact path='/about' render={() => <AboutUs userInSession={this.state.currentUser}></AboutUs>}></Route>

          {/* <Route exact path='/contact/inbox' component={Inbox}></Route> */}
          {/* <Route exact path='/messenger' render={() => <Messenger userInSession={this.props.user}></Messenger>}></Route> */}

          <Route exact path='/messenger' render={() => <Chatpage userInSession={this.state.currentUser} ></Chatpage>}></Route>
          {/* <Route exact path='/contact/:id/message' render={() => <Messenger userInSession={this.props.user}></Messenger>}></Route> */}
          {/* <Route exact path='/contact/:id/message' {!this.props.user <Redirect to="/" /> : <Messenger/>} </Route> */}

        </Switch>
        <Footer logInTheUser={this.updateTheUser} userInSession={this.state.currentUser}></Footer>
      </div>
    );
  }
}

export default App;
