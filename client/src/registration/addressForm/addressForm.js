import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ReactPhoneInput from 'react-phone-input-2';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import CountrySelect from '../../components/countrySelect'
import { inject, observer } from "mobx-react";

import { TextField, withStyles, InputLabel, Select, MenuItem } from '@material-ui/core';
import "./addressForm.scss"
const useStyles = (theme => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
@inject('registrationStore')
@observer
class AddressForm extends Component {
    // function AddressForm({ handleDataChange, props, obj }) {

    handleOnChange = (value) => {
        this.props.registrationStore.handleRegisterDataChange("phone", value, this.props.obj)
    }
    onCountryChange = (value, fieldName) => {
        this.props.registrationStore.handleRegisterDataChange(fieldName, value, this.props.obj)
    }

    currentYear = new Date().getFullYear() - 18;
    render() {
        const { classes } = this.props;
        console.log(this.props.registrationStore)
        if (!this.props.registrationStore.registrationData || !this.props.registrationStore.registrationData.personalDetails) {
            return <div></div>
        }
        return (
            <React.Fragment >

                <div className="addressForm">

                    <Typography variant="h6" gutterBottom>
                        Persona Details
                    </Typography>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="outlined"
                                variant="outlined"
                                required
                                error={this.props.registrationStore.errors.firstName}
                                id="firstName"
                                name="firstName"
                                label="First name"
                                fullWidth
                                autoComplete="fname"
                                value={this.props.registrationStore.registrationData.personalDetails.firstName || ""}
                                onChange={(event) => this.props.registrationStore.handleRegisterDataChange("firstName", event.target.value, this.props.obj)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="outlined"
                                variant="outlined"
                                required
                                error={this.props.registrationStore.errors.lastName}
                                id="lastName"
                                name="lastName"
                                label="Last name"
                                fullWidth
                                autoComplete="lname"
                                value={this.props.registrationStore.registrationData.personalDetails.lastName || ""}
                                onChange={(event) => this.props.registrationStore.handleRegisterDataChange("lastName", event.target.value, this.props.obj)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="outlined"
                                variant="outlined"
                                required
                                error={this.props.registrationStore.errors.email}
                                id="Email"
                                name="Email"
                                label="Email"
                                fullWidth
                                autoComplete="email"
                                value={this.props.registrationStore.registrationData.personalDetails.email || ""}
                                onChange={(event) => this.props.registrationStore.handleRegisterDataChange("email", event.target.value, this.props.obj)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>

                            <CountrySelect selectedCountry={this.props.registrationStore.registrationData.personalDetails.cob} isValid={this.props.registrationStore.errors.cob} placeHolder={this.props.registrationStore.registrationData.personalDetails.cob} placeHolder="Country Of Birth" onChange={(value) => this.onCountryChange(value, "cob")} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ReactPhoneInput value={this.props && this.props.registrationStore.registrationData.personalDetails.phone} defaultCountry={'us'} onChange={this.handleOnChange} />
                        </Grid>
                    </Grid>

                    <Grid className="bd-container" container direction="row"
                        justify="flex-start" spacing={10}>
                        <Grid direction="row" justify="flex-start" container item xs={12} sm={2}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="Day">Day</InputLabel>
                                <Select
                                    labelId="Day"
                                    id="Day"
                                    label="Day"
                                    value={this.props.registrationStore.registrationData.personalDetails.day || ""}
                                    onChange={(event) => this.props.registrationStore.handleRegisterDataChange("day", event.target.value, this.props.obj)}
                                >
                                    {Array.from(new Array(31), (v, i) =>
                                        <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid justify="flex-start" container item xs={12} sm={2}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="Month">Month</InputLabel>
                                <Select
                                    labelId="Month"
                                    label="Month"
                                    value={this.props.registrationStore.registrationData.personalDetails.month || ""}
                                    onChange={(event) => this.props.registrationStore.handleRegisterDataChange("month", event.target.value, this.props.obj)}
                                >
                                    {Array.from(new Array(12), (v, i) =>
                                        <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>

                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid justify="flex-start" container item xs={12} sm={2}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="year">Year</InputLabel>
                                <Select
                                    labelId="year"
                                    id="year"
                                    label="year"
                                    value={this.props.registrationStore.registrationData.personalDetails.year || ""}
                                    onChange={(event) => this.props.registrationStore.handleRegisterDataChange("year", event.target.value, this.props.obj)}
                                >
                                    {Array.from(new Array(90), (v, i) =>
                                        <MenuItem key={i} value={this.currentYear - i}>{this.currentYear - i}</MenuItem>

                                    )}
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>

                </div>
            </React.Fragment>
        )
    };
}
export default withStyles(useStyles)(AddressForm);
