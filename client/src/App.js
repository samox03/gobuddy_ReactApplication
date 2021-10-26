import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import Homepage from "./components/index/Homepage"
import SignupBuddy from "./components/auth/SignupBuddy"
import SignupTiger from "./components/auth/SignupTiger"
import Login from "./components/auth/Login"
import Logout from "./components/auth/Logout"
import BuddyView from './components/auth/views/BuddyView';
//import TigerView from './components/auth/views/TigerView';
import TigerDetails from './components/auth/views/TigerDetails';
import Footer from './components/index/Footer'
import AboutUs from './components/index/AboutUs'


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
          <Route exact path='/buddyView' component={BuddyView}></Route>
          {/* <Route exact path='/tigerView' component={TigerView}></Route> */}

          {/* <Route exact path='/logout' render={() => {
            
            return <Redirect to='/'></Redirect>
          }} */}

          <Route exact path='/tigerslist' component={BuddyView}></Route>
          <Route exact path='/tigerslist/:id' component={TigerDetails}></Route>
          <Route exact path='/about' component={AboutUs}></Route>

        </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
