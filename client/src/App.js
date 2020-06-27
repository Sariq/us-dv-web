import React, { Component, Suspense } from 'react';
import logo from './logo.svg';
import './App.scss';
import Home from "./home/home"
import AddressForm from "./registration/registration"
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import Register from "./registration/registration"
import VerticalLinearStepper from "./application/application"
import { inject, observer } from "mobx-react";
import LoginPage from "./loginPage/loginPage";
import UsersList from "./users-list/users-list";
import { Backdrop, Paper, MenuList, MenuItem, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#212B51',
    },
    // secondary: {
    //   // This is green.A700 as hex.
    //  // main: '#11cb5f',
    // },
  },
  overrides: {
    // Style sheet name ⚛️
    MuiOutlinedInput:{
      root:{height: '40px'}
    },
    MuiFormLabel:{
      root:{
        padding: '1px 0',
        lineHeight: 0,
        borderRadius: '20px'
      }
    },
    MuiButton: {
      // Name of the rule
      root: {
        // Some CSS
        borderRadius:10,
      },
    },
  },
});

@inject('AuthStore')
@observer
class Layout extends Component {
  state = {
    data: this.props.AuthStore.initLogin()

  }

  componentDidMount() {

    if (!this.props.AuthStore.getUserDataLocal() && window.location.pathname !== "/login-page" && !window.location.pathname.includes("/ImmiEx") && !window.location.pathname.includes("/register")) {
      //window.location.href = window.location.origin + "/ImmiEx/HTML/website/index.html";
      //return <Redirect  to="/home" />
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
  goTo = (path) => {
    this.props.history.push(path);
  }
  logOut = () => {

    this.props.AuthStore.logOut().then(() => {
      this.props.history.push('/login-page')

    })

  }
  render() {
    return (
      <div>
        <div className="header-container">
          <AppBar position="fixed" color="default" className="header">
            <Toolbar>
              <div className="header-content-container">
                <Typography variant="h6" color="inherit" noWrap>
                  <div>USA-DV    {this.props.AuthStore.authData && this.props.AuthStore.authData.user.userData.registrationData.firstName}</div>
                  {/* {JSON.stringify(this.props.registrationStore.registrationData)} */}
                </Typography>
                {this.props.AuthStore.authData && <div>

                  <Button
                    onClick={this.logOut}
                    variant="contained" color="primary"
                  >
                    Logout
                  </Button>
                </div>}
              </div>
            </Toolbar>
          </AppBar>
        </div>
        <div className="layout-container">
          <Router>
            {this.props.AuthStore.authData && this.props.AuthStore.authData.user.admin && <div className="side-menu-container">
              <Paper className="menu-body">
                <MenuList className="menu-list">
                  <MenuItem ><Link className="link-item" to="/users-list">Users List</Link></MenuItem>
                
                </MenuList>
              </Paper>
            </div>}

            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/application/:userId" component={VerticalLinearStepper} />
              <Route exact path="/application" component={VerticalLinearStepper} />
              <Route exact path="/users-list" component={UsersList} />
            </Switch>
          </Router>
        </div>
      </div>
    )
  }

}
Layout.diplayName = 'Layout';




class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login-page" component={LoginPage} />
            <Route  path="/home" component={Home} />
            <Redirect exact from="/" to="home" />
            <Route path="*" component={Layout} />

            {/* <Route path="/" component={Layout} /> */}
          </Switch>
        </Router>
      </div>
      </ThemeProvider>

    );
  }
}

export default App;
