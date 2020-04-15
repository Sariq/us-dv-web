import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { render } from '@testing-library/react';
import { inject, observer } from "mobx-react";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        US-DV
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = (theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
@inject('AuthStore')
@observer
class LoginPage extends Component {

  state = {
    userName: "",
    password: "",
    error: {
      userName: false,
      password: false
    }
  }
  handleLogin = () => {
    const data = {
      userName: this.state.userName,
      password: this.state.password
    }
    const formValid = this.validateForm();
    if (formValid) {
      this.props.AuthStore.login(data).then((res) => {
        console.log(res)
        if (this.props.AuthStore.authData) {
          if (this.props.AuthStore.authData.user.admin) {
            this.props.history.push('/users-list');
          } else {
            this.props.history.push('/application');
          }
        }
      })
    }
  }
  validateForm = () => {
    const error = {
      userName: !this.state.userName,
      password: !this.state.password
    }
    this.setState({ error: error });
    if (!this.state.userName || !this.state.password) {
      return false;
    }
    return true;
  }
  render() {
    const { classes } = this.props;

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
          </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                error={this.state.error.userName}
                helperText={this.state.error.userName ? "Invalid input" : null}
                fullWidth
                id="userName"
                label="User Name"
                name="email"
                autoComplete="userName"
                autoFocus
                value={this.state.userName}
                onChange={(event) => this.setState({ userName: event.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                error={this.state.error.password}
                helperText={this.state.error.password ? "Invalid input" : null}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={(event) => this.setState({ password: event.target.value })}
              />
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.handleLogin}
              >
                Sign In
            </Button>
              <Grid  alignItems="center" item direction="row">
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                </Link>
                </Grid> */}
                <Grid item >
                  <Link onClick={() => this.props.history.push('/register')} variant="body2" >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }

}
export default withStyles(useStyles)(LoginPage);
