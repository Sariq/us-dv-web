import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ApllicantInfo from "./applicant-info/applicant-info"
import "./application.scss"
import SupouseInfo from "./spouse-info/spouse-info"
import ScrollableTabsButtonAuto from "./spouse-info/spouse-tabs/spouse-tabs"
import ChildrenInfo from "./children-info/children-info"
import AddressContact from "./address-contact/address-contact"
import { inject, observer } from "mobx-react";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';
const useStyles = (theme => ({
    root: {
        width: '70%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2)
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

function getSteps() {
    return ['Applicant Info', 'Spouse Info', 'Children Info', 'Address & Contact'];
}


@inject('registrationStore', 'AuthStore','UsersStore')
@observer
class VerticalLinearStepper extends Component {
    //steps = getSteps();

    state = {
        activeStep: 0
    };
    handleNext = () => {
        if (this.state.activeStep === 0) {
            if (this.props.registrationStore.applicationData.applicantInfo.childrenNumber > 0) {
                Array.from(new Array(parseInt(this.props.registrationStore.applicationData.applicantInfo.childrenNumber, 10)), (v, i) => {
                    this.props.registrationStore.applicationData.childrenInfo.push({})
                    this.childrenTabs.push({ title: `Child ${i + 1}`, cmp: <ChildrenInfo obj="childrenInfo" handleDataChange={(attr, val, index) => this.handleChildrenDataChange(attr, val, index)} props={this.props} index={i} /> })
                });
                this.steps.push({
                    title: 'Children Info', cmp: <ScrollableTabsButtonAuto
                        tabs={this.childrenTabs}
                        handleDataChange={(attr, val) => this.handleSpouseDataChange(attr, val)} props={this.props} />
                })

            }
        }
        console.log(this.state.activeStep + 1 === this.steps.length)
        //if (this.state.activeStep + 1 === this.steps.length) {
        this.props.registrationStore.sendApplication().then(() => {
            this.setState({ activeStep: this.state.activeStep + 1 });
        });
        //}

    };
    handleBack = () => {
        this.setState({ activeStep: this.state.activeStep - 1 });
    };


    handleReset = () => {
        this.setState({ activeStep: 0 });
    };

    handleApplicantDataChange(attr, value) {
        this.props.registrationStore.applicationData.applicantInfo[attr] = value;
    }
    handleSpouseDataChange(attr, value) {
        this.props.registrationStore.applicationData.spouseInfo[attr] = value;
    }
    handleAddressContactDataChange(attr, value) {
        this.props.registrationStore.applicationData.addressContact[attr] = value;
    }
    handleChildrenDataChange(attr, value, index) {
        this.props.registrationStore.applicationData.childrenInfo[index][attr] = value;
    }
    componentDidMount() {
        if(this.props.match.params.userId){
            this.props.UsersStore.getUserById(this.props.match.params.userId).then(rest=>{
                this.props.registrationStore.initApplicationData()
            });
        }else{
            this.props.registrationStore.initApplicationData()
        }
    }
    logOut() {
        this.props.AuthStore.logOut().then(() => this.props.history.push('/login-page'))
    }
    spouseTabs = [
        { title: "Basic", cmp: <ApllicantInfo obj="spouseInfo" handleDataChange={(attr, val) => this.handleSpouseDataChange(attr, val)} props={this.props} index={0} /> },
        { title: "Passport And Photo", cmp: <SupouseInfo handleDataChange={(attr, val) => this.handleSpouseDataChange(attr, val)} props={this.props} index={1} /> }
    ]
    childrenTabs = [
    ]
    steps = [
        { title: 'Applicant Info', cmp: <ApllicantInfo obj="applicantInfo" /> },
        {
            title: 'Spouse Info', cmp: <ScrollableTabsButtonAuto
                tabs={this.spouseTabs}
            />
        },
        { title: 'Address & Contact', cmp: <AddressContact handleDataChange={(attr, val) => this.handleAddressContactDataChange(attr, val)} props={this.props} /> }
    ]
    getStepContent(step) {
        return this.steps[step]
    }

    render() {
        const { classes } = this.props;
        if (!this.props.AuthStore.authData || this.props.registrationStore.isLoadingApplicationData || this.props.UsersStore.loadingUser) {
            return <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
        }
        return (
            <>
                <div className="header-container">
                    <AppBar position="absolute" color="default" className="header">
                        <Toolbar>
                            
                                <div className="header-content-container">
                                <Typography variant="h6" color="inherit" noWrap>
                                    <div>USA-DV    {this.props.AuthStore.authData && this.props.AuthStore.authData.user.userData.registrationData.firstName}</div>
                                    {/* {JSON.stringify(this.props.registrationStore.registrationData)} */}
                                    </Typography>
                                    <div>

                                        <Button
                                        onClick={() => this.logOut()}
                                        variant="contained" color="primary"
                                    >
                                        Logout
                                </Button>
                                    </div>
                                </div>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className="application-stepper-container">
                    {this.props.registrationStore.registerInProgress && <Backdrop className={classes.backdrop} open={true}>
                        <CircularProgress color="inherit" />
                    </Backdrop>}
                    {/* {JSON.stringify(this.props.registrationStore.applicationData)} */}

                    <Stepper activeStep={this.state.activeStep} orientation="vertical">
                        {this.steps.map((step, index) => (
                            <Step key={step.title}>
                                <StepLabel>{step.title}</StepLabel>
                                <StepContent>
                                    <div>{this.getStepContent(index).cmp}</div>
                                    <div className="actions-container">
                                        <div>
                                            <Button
                                                disabled={this.state.activeStep === 0}
                                                onClick={this.handleBack}
                                                className={classes.button}
                                            >
                                                Back
                  </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleNext}
                                                className={classes.button}
                                                //disabled={this.props.registrationStore.isFormInValid}
                                            >
                                                {this.state.activeStep === this.steps.length - 1 ? 'Finish' : 'Next'}
                                            </Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                    {this.state.activeStep === this.steps.length && (
                        <Paper square elevation={0} className={classes.resetContainer}>
                            <Typography>All steps completed - you&apos;re finished</Typography>
                            <Button onClick={this.handleReset} className={classes.button}>
                                Reset
          </Button>
                        </Paper>
                    )}
                </div>
            </>
        )
    };
}
export default withStyles(useStyles)(VerticalLinearStepper);
