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


@inject('registrationStore', 'AuthStore', 'UsersStore')
@observer
class VerticalLinearStepper extends Component {
    //steps = getSteps();
    state = {};
    initState = () =>{
        this.props.registrationStore.activeObj = this.steps[1].obj;
        this.state.activeStep = 1;
       

    }
    constructor(props){
        super(props);
        this.initState();
      
    }
   
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
       
        //if (this.state.activeStep + 1 === this.steps.length) {
        this.props.registrationStore.sendApplication().then(() => {
            if (this.state.activeStep === 1 && this.props.registrationStore.spouseInfoActiveTab === 0) {
                this.props.registrationStore.spouseInfoActiveTab = 1;
            }else{
                this.props.registrationStore.activeObj = this.steps[this.state.activeStep + 1].obj
                this.setState({ activeStep: this.state.activeStep + 1 });
            }
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
        if (this.props.match.params.userId) {
            this.props.UsersStore.getUserById(this.props.match.params.userId).then(rest => {
                this.props.registrationStore.initApplicationData()
            });
        } else {
            this.props.registrationStore.initApplicationData()
        }
    }
   
    spouseTabs = [
        { title: "Basic", cmp: <ApllicantInfo obj="spouseInfo" handleDataChange={(attr, val) => this.handleSpouseDataChange(attr, val)} props={this.props} index={0} /> , obj:"spouseInfo"},
        { title: "Passport And Photo", cmp: <SupouseInfo obj="spouseInfo" handleDataChange={(attr, val) => this.handleSpouseDataChange(attr, val)} props={this.props} index={1} /> , obj:"spouseInfo" }
    ]
    childrenTabs = [
    ]
    steps = [
        { title: 'Applicant Info', cmp: <ApllicantInfo obj="applicantInfo" />, obj:"applicantInfo" },
        {
            title: 'Spouse Info', cmp: <ScrollableTabsButtonAuto 
                tabs={this.spouseTabs}
            />,
            obj:"spouseInfo"
        },
        { title: 'Address & Contact', cmp: <AddressContact obj="addressContact" handleDataChange={(attr, val) => this.handleAddressContactDataChange(attr, val)} props={this.props} />, obj:"addressContact" }
    ]
    getStepContent(step) {
        return this.steps[step]
    }
    handleStep = (step) => {
        this.props.registrationStore.activeObj = this.steps[step].obj

        this.setState({ activeStep: step });
    };

    render() {
        const { classes } = this.props;
        if (!this.props.AuthStore.authData || this.props.registrationStore.isLoadingApplicationData || this.props.UsersStore.loadingUser) {
            return (<Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>)
        }
        return (
            <>
                <div className="application-stepper-container">
                    {this.props.registrationStore.registerInProgress && <Backdrop className={classes.backdrop} open={true}>
                        <CircularProgress color="inherit" />
                    </Backdrop>}
                    {/* {JSON.stringify(this.props.registrationStore.applicationData)} */}

                    <Stepper  activeStep={this.state.activeStep} >
                        {this.steps.map((step, index) => (

                            <Step onClick={()=>this.handleStep(index)} key={step.title}>
                                <StepLabel>{step.title}</StepLabel>

                            </Step>
                        ))}
                    </Stepper>

                    <div>

                        <>
                            <div>{this.getStepContent(this.state.activeStep).cmp}</div>
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
                                    disabled={this.props.registrationStore.checkFormInValid}
                                    >
                                        {this.state.activeStep === this.steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>

                            </div></>


                    </div>


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
