import React, { Component, Suspense } from 'react';
import logo from './logo.svg';
import './App.scss';
import Home from "./home/home"
import AddressForm from "./registration/registration"
import { Route, Link, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Register from "./registration/registration"
import VerticalLinearStepper from "./application/application"
import { inject, observer } from "mobx-react";
import LoginPage from "./loginPage/loginPage";
import UsersList from "./users-list/users-list"
import { Backdrop, Paper, MenuList, MenuItem } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';



@inject('AuthStore')
@observer
class Layout extends Component {
  state = {
    data: this.props.AuthStore.initLogin()
  }
  componentDidMount() {

    if (!this.props.AuthStore.getUserDataLocal() && window.location.pathname !== "/login-page" && !window.location.pathname.includes("/ImmiEx")) {
      //window.location.href = window.location.origin + "/ImmiEx/HTML/website/index.html";
    } else {
      if (!this.props.AuthStore.authData) {
        return <Backdrop className="backdrop" open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      } else {
        // if(this.props.AuthStore.authData.user && this.props.AuthStore.authData.user.admin){
        //   this.props.history.push('/users-list');
        // }
      }
    }
  }
  goTo = (path) =>{
    this.props.history.push(path);
  }
  render() {

    return (
      <div className="layout-container">
        {/* <div className="side-menu-container">
          <Paper >
            <MenuList>
              <MenuItem onClick={() => this.goTo("/users-list")}>Users List</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Paper>
        </div> */}
        <Router>
          <div>
            <Route path="/register" component={Register} />
            <Route exact path="/application/:userId" component={VerticalLinearStepper} />

            <Route exact path="/application" component={VerticalLinearStepper} />
            <Route path="/login-page" component={LoginPage} />
            <Route exact path="/users-list" component={UsersList} />
            <Route exact path="/" component={VerticalLinearStepper} />
          </div>
        </Router>
      </div>
    )
  }

}
Layout.diplayName = 'Layout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path="/" component={Layout} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
