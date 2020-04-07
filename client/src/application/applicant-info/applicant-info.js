import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ReactPhoneInput from 'react-phone-input-2';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import CountrySelect from '../../components/countrySelect'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import { TextField, withStyles, InputLabel, Select, MenuItem } from '@material-ui/core';
import "./applicant-info.scss"
import { inject, observer } from "mobx-react";

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
@inject('registrationStore', 'AuthStore')
@observer
class ApllicantInfo extends Component {
    // classes = useStyles();
    state = {
        currentYear: new Date().getFullYear() - 18
    }
    handleGenderChange = (event) => {
        this.props.registrationStore.handleDataChange("gender", event.target.value, this.props.obj)
    }
    onCountryChange = (value) => {
        this.props.registrationStore.handleDataChange("country", value, this.props.obj)
    }
    componentDidUpdate() {
        if (this.props.AuthStore.authData && !this.props.AuthStore.authData.user && this.props.AuthStore.authData.user.token) {
            this.props.AuthStore.getUserData();
        }
    }
    render() {
        const { classes } = this.props;
        //            { (Object.keys(this.props.registrationStore.applicationData[this.props.obj]).length === 0 ||  Object.keys(this.props.registrationStore.applicationData[this.props.obj]).length > 0) && <div className="applicant-info-container">

        return (
            <React.Fragment >
                <div className="applicant-info-container">

                    <div className="addressForm">
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    error={this.props.registrationStore.errors.firstName}
                                    helperText={this.props.registrationStore.errors.firstName ? "Invalid input" : null}

                                    id="firstName"
                                    name="firstName"
                                    label="First name"
                                    fullWidth
                                    autoComplete="fname"

                                    // defaultValue={this.props.registrationStore.applicationData[this.props.obj] && this.props.registrationStore.applicationData[this.props.obj].firstName}
                                    value={this.props.registrationStore.applicationData[this.props.obj] && this.props.registrationStore.applicationData[this.props.obj].firstName}
                                    onChange={(event) => this.props.registrationStore.handleDataChange("firstName", event.target.value, this.props.obj)}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    error={this.props.registrationStore.errors.lastName}
                                    helperText={this.props.registrationStore.errors.lastName ? "Invalid input" : null}
                                    id="lastName"
                                    name="lastName"
                                    label="Last name"
                                    fullWidth
                                    autoComplete="lname"
                                    value={this.props.registrationStore.applicationData[this.props.obj] && this.props.registrationStore.applicationData[this.props.obj].lastName}
                                    onChange={(event) => this.props.registrationStore.handleDataChange("lastName", event.target.value, this.props.obj)}

                                />
                            </Grid>
                            <Grid container justify="flex-start" item xs={12} sm={6}>
                                <TextField
                                    required
                                    error={this.props.registrationStore.errors.middleName}
                                    helperText={this.props.registrationStore.errors.middleName ? "Invalid input" : null}
                                    id="middleName"
                                    name="middleName"
                                    label="Middle Name"
                                    fullWidth
                                    value={this.props.registrationStore.applicationData[this.props.obj] && this.props.registrationStore.applicationData[this.props.obj].middleName}
                                    onChange={(event) => this.props.registrationStore.handleDataChange("middleName", event.target.value, this.props.obj)}

                                />
                                <FormControlLabel
                                    control={<Checkbox color="primary" name="saveAddress" value="yes" />}
                                    label="Don't have middle name"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <CountrySelect selectedCountry={this.props.registrationStore.applicationData[this.props.obj].country} placeHolder="Country Of Birth" onChange={this.onCountryChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={this.props.registrationStore.errors.cityOfBirth}
                                    helperText={this.props.registrationStore.errors.cityOfBirth ? "Invalid input" : null}
                                    required
                                    id="cityOfBirth"
                                    name="cityOfBirth"
                                    label="City of Birth"
                                    fullWidth
                                    autoComplete="cityOfBirth"
                                    value={this.props.registrationStore.applicationData[this.props.obj] && this.props.registrationStore.applicationData[this.props.obj].cityOfBirth}
                                    onChange={(event) => this.props.registrationStore.handleDataChange("cityOfBirth", event.target.value, this.props.obj)}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CountrySelect selectedCountry={this.props.registrationStore.applicationData[this.props.obj] && this.props.registrationStore.applicationData[this.props.obj].country} placeHolder="Country Of Residence" onChange={this.onCountryChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    error={this.props.registrationStore.errors.nationality}
                                    helperText={this.props.registrationStore.errors.nationality ? "Invalid input" : null}
                                    id="nationality"
                                    name="nationality"
                                    label="Nationality"
                                    fullWidth
                                    autoComplete="nationality"
                                    value={this.props.registrationStore.applicationData[this.props.obj] && this.props.registrationStore.applicationData[this.props.obj].nationality}
                                    onChange={(event) => this.props.registrationStore.handleDataChange("nationality", event.target.value, this.props.obj)}
                                />
                            </Grid>
                            <Grid container justify="flex-start" item xs={12} sm={6}>
                                <FormControl className={`select-input ${classes.formControl}`}>
                                    <InputLabel id="demo-simple-select-label">Marital Status</InputLabel>
                                    <Select
                                        labelId="maritalStatus"
                                        id="maritalStatus"

                                        value={this.props.registrationStore.applicationData[this.props.obj].maritalStatus}
                                        onChange={(event) => this.props.registrationStore.handleDataChange("maritalStatus", event.target.value, this.props.obj)}
                                    >
                                        <MenuItem value={"single"}>Single</MenuItem>
                                        <MenuItem value="married">Married</MenuItem>
                                        <MenuItem value="divorced">Divorced</MenuItem>
                                        <MenuItem value="Widowed">Widowed</MenuItem>

                                    </Select>
                                </FormControl>
                                {this.props.registrationStore.applicationData[this.props.obj] && this.props.registrationStore.applicationData[this.props.obj].maritalStatus === "married" && <FormControlLabel
                                    control={<Checkbox color="primary" name="saveAddress" value="yes" />}
                                    label="My spouse in a U.S. Citizen"
                                />}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    error={this.props.registrationStore.errors.childrenNumber}
                                    helperText={this.props.registrationStore.errors.childrenNumber ? "Invalid input" : null}
                                    id="childrenNumber"
                                    name="childrenNumber"
                                    label="Children Number"
                                    type="number"
                                    fullWidth
                                    autoComplete="childrenNumber"
                                    value={this.props.registrationStore.applicationData[this.props.obj] && this.props.registrationStore.applicationData[this.props.obj].childrenNumber}
                                    onChange={(event) => this.props.registrationStore.handleDataChange("childrenNumber", event.target.value, this.props.obj)}

                                />
                            </Grid>
                            <Grid container justify="flex-start" item xs={12} sm={6}>
                                <FormControl className={`select-input ${classes.formControl}`}>
                                    <InputLabel id="demo-simple-select-label">Education</InputLabel>
                                    <Select
                                        labelId="education"
                                        id="education"
                                        value={this.props.registrationStore.applicationData[this.props.obj] && this.props.registrationStore.applicationData[this.props.obj].education}
                                        onChange={(event) => this.props.registrationStore.handleDataChange("education", event.target.value, this.props.obj)}
                                    >
                                        <MenuItem value="highSchool">High School</MenuItem>
                                        <MenuItem value="diplomaIncomplete">Diploma Incomplete</MenuItem>
                                        <MenuItem value="highSchoolDiploma">High school Diploma</MenuItem>
                                        <MenuItem value="graduateLevelCourses">Graduate level courses</MenuItem>
                                        <MenuItem value="bachelorsDegree">Bachelors Degree</MenuItem>
                                        <MenuItem value="masterDegree">Master Degree</MenuItem>
                                        <MenuItem value="phd">Phd</MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid container justify="flex-start" item xs={12} sm={6}>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup aria-label="gender" name="gender1" value={this.props.registrationStore.applicationData[this.props.obj] && this.props.registrationStore.applicationData[this.props.obj].gender} onChange={this.handleGenderChange} row>
                                        <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>



                        <Grid className="bd-container" container direction="row"
                            justify="flex-start" spacing={10}>
                            <Grid direction="row" justify="flex-start" container item xs={12} sm={2}>
                                <FormControl className={`select-input ${classes.formControl}`}>
                                    <InputLabel id="demo-simple-select-label">Day</InputLabel>
                                    <Select
                                        labelId="Day"
                                        id="Day"
                                        value={this.props.registrationStore.applicationData[this.props.obj] && this.props.registrationStore.applicationData[this.props.obj].day}
                                        onChange={(event) => this.props.registrationStore.handleDataChange("day", event.target.value, this.props.obj)}
                                    >
                                        {Array.from(new Array(31), (v, i) =>
                                            <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid justify="flex-start" container item xs={12} sm={2}>
                                <FormControl className={`select-input ${classes.formControl}`}>
                                    <InputLabel id="month">Month</InputLabel>
                                    <Select
                                        labelId="Month"
                                        id="Month"
                                        value={this.props.registrationStore.applicationData[this.props.obj] && this.props.registrationStore.applicationData[this.props.obj].month}
                                        onChange={(event) => this.props.registrationStore.handleDataChange("month", event.target.value, this.props.obj)}
                                    >
                                        {Array.from(new Array(12), (v, i) =>
                                            <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid justify="flex-start" container item xs={12} sm={2}>
                                <FormControl className={`select-input ${classes.formControl}`}>
                                    <InputLabel id="year">Year</InputLabel>
                                    <Select
                                        labelId="year"
                                        id="year"
                                        value={this.props.registrationStore.applicationData[this.props.obj] && this.props.registrationStore.applicationData[this.props.obj].year}
                                        onChange={(event) => this.props.registrationStore.handleDataChange("year", event.target.value, this.props.obj)}
                                    >
                                        {Array.from(new Array(90), (v, i) =>
                                            <MenuItem key={i} value={this.state.currentYear - i}>{this.state.currentYear - i}</MenuItem>

                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>

                        </Grid>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default withStyles(useStyles)(ApllicantInfo);
