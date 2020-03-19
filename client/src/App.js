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


@inject('AuthStore')
@observer
class Layout extends Component {
  componentDidMount() {
    if (!this.props.AuthStore.getUserDataLocal() && window.location.pathname !== "/login-page") {
      this.props.AuthStore.initLogin();
    }
  }
  render() {
    if (!this.props.AuthStore.getUserDataLocal() && window.location.pathname !== "/login-page" &&  !window.location.pathname.includes("/ImmiEx")) {
      //return <Redirect push to="/login-page" />;
      window.location.href = window.location.origin + "/ImmiEx/HTML/website/demo-1.html";

    }
    return (
      <Router>
        <div>
          <Route path="/register" component={Register} />
          <Route path="/application" component={VerticalLinearStepper} />
          <Route path="/login-page" component={LoginPage} />
          <Route exact path="/" component={VerticalLinearStepper} />
        </div>
      </Router>
    )
  }

}
Layout.siplayName = 'Layout';

@inject('AuthStore')
@observer
class App extends Component {
  //location = Router();  


  render() {

    return (
      <div className="App">
        <Router>
          <div>

            <Route  path="/" component={Layout} />

          </div>
        </Router>
      </div>
    );
  }
}

export default App;
