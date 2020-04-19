import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './addressForm/addressForm';
import PaymentForm from './paymentForm/paymentForm';
import Review from './review/review';
import CompleteRgeistration from './completeRgeistration/completeRgeistration';
import { inject, observer } from "mobx-react";
import { withStyles } from '@material-ui/core/styles';
import './registration.scss'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import CONSTANT from '../infra/constants'
const useStyles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(7),
    marginLeft: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
});

@inject('registrationStore','AuthStore')
@observer
class Register extends Component {
  state = {
    activeStep: 0
  };
  handleNext = () => {
    if(this.state.activeStep === 0){
      this.props.registrationStore.registerUser().then((data)=>{
        this.setState({ activeStep: this.state.activeStep + 1 });
      });
    }
    if(this.state.activeStep === 1){
      this.props.history.push('/application');
    }
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };


  // classes = this.useStyles();


  getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm obj="personalDetails" handleDataChange={(attr, val, obj) => this.handleRegisterDataChange(attr, val,obj)} props={this.props} />;
      case 1:
        return <CompleteRgeistration handleDataChange={(attr, val) => this.handleRegisterDataChange(attr, val)} props={this.props} />;
      case 2:
        return <PaymentForm />;
      case 3:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }
  steps = ['Personal Details', 'Complete Registration', 'Payment details', 'Review your order'];
  handleRegisterDataChange(attr, value, obj) {
    this.props.registrationStore.registrationData[obj][attr] = value;
    this.props.registrationStore.errors[attr] = true;
    console.log(this.props.registrationStore.errors)
  };



  render() {
    const { classes } = this.props;

    return (
      <div className="registration-container">

        <React.Fragment>
          <CssBaseline />
          <main className={classes.layout}>
          { this.props.registrationStore.registerInProgress && <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>}
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="center">
                Registration
          </Typography>
              <Stepper activeStep={this.state.activeStep} className={classes.stepper}>
                {this.steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {this.state.activeStep === this.steps.length ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      Thank you for your order.
                </Typography>
                    <Typography variant="subtitle1">
                      Your order number is #2001539. We have emailed your order confirmation, and will
                      send you an update when your order has shipped.
                </Typography>
                  </React.Fragment>
                ) : (
                    <React.Fragment>
                      {this.getStepContent(this.state.activeStep)}
                      <div className={classes.buttons}>
                        {this.state.activeStep !== 0 && (
                          <Button onClick={this.handleBack} className={classes.button}>
                            Back
                    </Button>
                        )}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                          className={classes.button}
                          disabled={this.props.registrationStore.isFormInValid}
                        >
                          {this.state.activeStep === this.steps.length - 1 ? 'Place order' : this.state.activeStep === 1  ? 'Apply': 'Next'}
                        </Button>
                      </div>
                    </React.Fragment>
                  )}
              </React.Fragment>
            </Paper>
          </main>
        </React.Fragment>
      </div>
    )
  };
}
export default withStyles(useStyles)(Register);
