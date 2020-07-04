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
import MobileSideMenu from '../components/mobile-side-menu/mobile-side-menu';
import Footer from '../components/footer/footer';
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
    state = { cildrednUpdate: false };
    initState = () => {
        this.props.registrationStore.activeObj = this.steps[0].obj;
        this.state.activeStep = 0;
    }
    constructor(props) {
        super(props);
        this.initState();

    }

    handleNext = () => {

        this.props.registrationStore.errors = {};
        if (this.state.activeStep === 0) {
            this.initSpouseAndChildrenSteps();
        }
        console.log(this.props.registrationStore.activeObj)
        if ((this.steps[this.state.activeStep].tabs === true) && this.props.registrationStore.spouseInfoActiveTab === 0) {
            this.props.registrationStore.spouseInfoActiveTab = 1;
            this.props.registrationStore.activeSubObj = "passportAndPhoto";
        } else {
            // if (this.state.activeStep + 1 <= this.steps.length - 1) {
            //     this.props.registrationStore.activeObj = this.steps[this.state.activeStep + 1].obj
            // }
            this.setState({ activeStep: this.state.activeStep + 1 });
            this.props.registrationStore.spouseInfoActiveTab = 0;
            this.props.registrationStore.activeSubObj = "basic";

        }

    };
    handleBack = () => {
        this.setState({ activeStep: this.state.activeStep - 1 });
        this.props.registrationStore.spouseInfoActiveTab = 0;

    };
    handleSave = () => {
        this.props.registrationStore.sendApplication().then(() => this.initSpouseAndChildrenSteps());
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
                this.props.registrationStore.initApplicationData();
                this.initSpouseAndChildrenSteps();

            });
        } else {
            this.props.registrationStore.initApplicationData();
            this.initSpouseAndChildrenSteps();

        }
    }
    childrenTabs = [
    ]
    initSpouseAndChildrenSteps = () => {
        if (this.props.registrationStore.applicationData.applicantInfo.basic.maritalStatus === "married") {
            const result = this.steps.filter((step) => {
                return step.obj === "spouseInfo"
            });
            if (!result || result.length === 0) {
                this.steps.push({
                    title: 'Spouse Info',
                    cmp: <ScrollableTabsButtonAuto
                        tabs={this.spouseTabs}
                    />,
                    obj: "spouseInfo",
                    tabs: true
                })
            }

        } else {
            const result = this.steps.filter((step) => {
                return step.obj !== "spouseInfo"
            });
            this.steps = result;
        }
        console.log(this.childrenTabs.length)
        console.log(this.props.registrationStore.applicationData.applicantInfo.basic.childrenNumber)

        if (Number(this.props.registrationStore.applicationData.applicantInfo.basic.childrenNumber) > 0 && this.childrenTabs.length !== Number(this.props.registrationStore.applicationData.applicantInfo.basic.childrenNumber)) {
            const childrenLength = this.childrenTabs.length;
            Array.from(new Array(Number(this.props.registrationStore.applicationData.applicantInfo.basic.childrenNumber) - this.childrenTabs.length), (v, i) => {
                console.log("xxxxx")
                this.childrenTabs.push({ title: `Child ${childrenLength + i + 1}`, cmp: <ChildrenInfo obj="childrenInfo" handleDataChange={(attr, val, index) => this.handleChildrenDataChange(attr, val, index)} props={this.props} index={i} /> })
            });
            this.steps.push({
                title: 'Children Info', cmp: <ScrollableTabsButtonAuto
                    tabs={this.childrenTabs}
                    handleDataChange={(attr, val) => this.handleSpouseDataChange(attr, val)} props={this.props} />,
                obj: "childrenInfo",
                tabs: true
            })
            console.log(this.steps)
        }
        this.setState({ cildrednUpdate: true })

    }
    applicatTabs = [
        { title: "Basic", cmp: <ApllicantInfo obj="applicantInfo" subObj="basic" handleDataChange={(attr, val) => this.handleSpouseDataChange(attr, val)} props={this.props} index={0} />, obj: "applicantInfo", subObj: "basic" },
        { title: "Passport And Photo", cmp: <SupouseInfo obj="applicantInfo" subObj="passportAndPhoto" handleDataChange={(attr, val) => this.handleSpouseDataChange(attr, val)} props={this.props} index={1} />, obj: "applicantInfo", subObj: "passportAndPhoto" }
    ]
    spouseTabs = [
        { title: "Basic", cmp: <ApllicantInfo obj="spouseInfo" subObj="basic" handleDataChange={(attr, val) => this.handleSpouseDataChange(attr, val)} props={this.props} index={0} />, obj: "spouseInfo", subObj: "basic" },
        { title: "Passport And Photo", cmp: <SupouseInfo obj="spouseInfo" subObj="passportAndPhoto" handleDataChange={(attr, val) => this.handleSpouseDataChange(attr, val)} props={this.props} index={1} />, obj: "spouseInfo", subObj: "passportAndPhoto" }
    ]

    steps = [
        //{ title: 'Applicant Info', cmp: <ApllicantInfo obj="applicantInfo" />, obj:"applicantInfo" },
        {
            title: 'Applicant Info', cmp: <ScrollableTabsButtonAuto
                tabs={this.applicatTabs}
            />,
            obj: "applicantInfo",
            tabs: true
        },

        { title: 'Address & Contact', cmp: <AddressContact obj="addressContact" handleDataChange={(attr, val) => this.handleAddressContactDataChange(attr, val)} props={this.props} />, obj: "addressContact" }
    ]
    getStepContent(step) {
        return this.steps[step]
    }
    handleStep = (step) => {
        this.props.registrationStore.errors = {};
        this.setState({ activeStep: step });
        this.props.registrationStore.activeObj = this.steps[step].obj;
        this.props.registrationStore.spouseInfoActiveTab = 0;

    };
    disableNextStep = () => {
        if (this.state.activeStep === this.steps.length - 1) {
            if (this.steps[this.state.activeStep].tabs === true) {
                if (this.props.registrationStore.spouseInfoActiveTab === 1) {
                    return true
                } else {
                    return false;
                }
            } else {
                return true
            }
        }
        return false;
    }

    render() {
        const { classes } = this.props;
        console.log("RENDERRRRR")
        if (!this.props.AuthStore.authData || this.props.registrationStore.isLoadingApplicationData || this.props.UsersStore.loadingUser || this.props.registrationStore.registerInProgress) {
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
                    <div style={{display:"flex"}}>
                    {this.props.AuthStore.authData.user.admin && <MobileSideMenu />}
                    <div className="us-dv-text">USA - DV</div>
                    <div>
                    <Paper>
                        <Stepper className="stepper-container" nonLinear activeStep={this.state.activeStep} >
                            {this.steps.map((step, index) => (

                                <Step onClick={() => this.handleStep(index)} key={step.title}>
                                    <StepLabel>{step.title}</StepLabel>

                                </Step>
                            ))}
                        </Stepper>
                    </Paper>
                    <div>
                        <>
                            <Paper className="tabs-paper">
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
                                            variant="outlined" color="primary"
                                            onClick={this.handleNext}
                                            className={classes.button}
                                            disabled={this.disableNextStep()}
                                        >
                                            Next
                                    </Button>
                                        {(this.props.AuthStore.authData.user.admin || this.props.registrationStore.applicationData.applicationStatus !== "COMPLETED") && <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleSave}
                                            className={classes.button}
                                        //disabled={this.props.registrationStore.checkFormInValid}
                                        >
                                            Save
                                    </Button>}
                                    </div>

                                </div>
                            </Paper>
                        </>


                    </div>
                    </div>
     
                    </div>



                    {this.state.activeStep === this.steps.length && (
                        <Paper elevation={0} className={classes.resetContainer}>
                            <Typography>All steps completed - you&apos;re finished</Typography>
                            <Button onClick={this.handleReset} className={classes.button}>
                                Reset
          </Button>
                        </Paper>
                    )}

                </div>
                <Footer isApllication={true} hideNav={this.state.hideNav} />

            </>
        )
    };
}
export default withStyles(useStyles)(VerticalLinearStepper);
