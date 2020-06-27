import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import ReactPhoneInput from 'react-phone-input-2';
import CountrySelect from '../../components/countrySelect'
import { TextField, withStyles, InputLabel, Select, MenuItem } from '@material-ui/core';
import "./address-contact.scss"
import { inject, observer } from "mobx-react";

const useStyles = (theme => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
@inject('registrationStore', 'AuthStore')
@observer
class AddressContact extends Component {

    onCountryChange = (value, fieldName) => {
        this.props.registrationStore.handleDataChange(fieldName, value, this.props.obj, null, this.props.subObj)
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment >
                <div className={`applicant-info-container ${!this.props.AuthStore.authData.user.admin && this.props.registrationStore.applicationData.applicationStatus === "COMPLETED" ? 'application-completed' : ''}`}>
                    <div className="addressForm">
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="outlined"
                                    variant="outlined"
                                    required
                                    error={this.props && this.props.registrationStore.errors.email}
                                    helperText={this.props && this.props.registrationStore.errors.email ? "Invalid input" : null}
                                    id="email"
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    autoComplete="email"
                                    value={this.props && this.props.registrationStore.applicationData[this.props.obj].email}
                                    onChange={(event) => this.props.registrationStore.handleDataChange("email", event.target.value, this.props.obj)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="outlined"
                                    variant="outlined"
                                    required
                                    error={this.props && this.props.registrationStore.errors.additionalEmail}
                                    helperText={this.props && this.props.registrationStore.errors.additionalEmail ? "Invalid input" : null}
                                    id="additionalEmail"
                                    name="additionalEmail"
                                    label="Additional Email"
                                    fullWidth
                                    autoComplete="additionalEmail"
                                    value={this.props && this.props.registrationStore.applicationData[this.props.obj].additionalEmail}
                                    onChange={(event) => this.props.registrationStore.handleDataChange("additionalEmail", event.target.value, this.props.obj)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <CountrySelect selectedCountry={this.props.registrationStore.applicationData[this.props.obj] && this.props.registrationStore.applicationData[this.props.obj].cor} placeHolder="Country Of Residence" onChange={(value) => this.onCountryChange(value, "cor")} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="outlined"
                                    variant="outlined"
                                    required
                                    error={this.props && this.props.registrationStore.errors.cob}
                                    helperText={this.props && this.props.registrationStore.errors.cob ? "Invalid input" : null}
                                    id="cityOfBirth"
                                    name="cityOfBirth"
                                    label="City of Birth"
                                    fullWidth
                                    autoComplete="cityOfBirth"
                                    value={this.props && this.props.registrationStore.applicationData[this.props.obj].cob}
                                    onChange={(event) => this.props.registrationStore.handleDataChange("cob", event.target.value, this.props.obj)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="outlined"
                                    variant="outlined"
                                    required
                                    error={this.props && this.props.registrationStore.errors.street}
                                    helperText={this.props && this.props.registrationStore.errors.street ? "Invalid input" : null}
                                    id="street"
                                    name="street"
                                    label="Street"
                                    fullWidth
                                    autoComplete="street"
                                    value={this.props && this.props.registrationStore.applicationData[this.props.obj].street}
                                    onChange={(event) => this.props.registrationStore.handleDataChange("street", event.target.value, this.props.obj)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="outlined"
                                    variant="outlined"
                                    required
                                    error={this.props && this.props.registrationStore.errors.houseNumber}
                                    helperText={this.props && this.props.registrationStore.errors.houseNumber ? "Invalid input" : null}
                                    id="houseNumber"
                                    name="houseNumber"
                                    label="House Number"
                                    type="number"
                                    fullWidth
                                    autoComplete="houseNumber"
                                    value={this.props && this.props.registrationStore.applicationData[this.props.obj].houseNumber}
                                    onChange={(event) => this.props.registrationStore.handleDataChange("houseNumber", event.target.value, this.props.obj)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="outlined"
                                    variant="outlined"
                                    required
                                    error={this.props && this.props.registrationStore.errors.postalCode}
                                    helperText={this.props && this.props.registrationStore.errors.postalCode ? "Invalid input" : null}
                                    id="postalCode"
                                    name="postalCode"
                                    label="Postal Code"
                                    type="number"
                                    fullWidth
                                    autoComplete="postalCode"
                                    value={this.props && this.props.registrationStore.applicationData[this.props.obj].postalCode}
                                    onChange={(event) => this.props.registrationStore.handleDataChange("postalCode", event.target.value, this.props.obj)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="outlined"
                                    variant="outlined"
                                    required
                                    error={this.props && this.props.registrationStore.errors.poBox}
                                    helperText={this.props && this.props.registrationStore.errors.poBox ? "Invalid input" : null}
                                    id="poBox"
                                    name="poBox"
                                    label="Po. box"
                                    fullWidth
                                    autoComplete="poBox"
                                    value={this.props && this.props.registrationStore.applicationData[this.props.obj].poBox}
                                    onChange={(event) => this.props.registrationStore.handleDataChange("poBox", event.target.value, this.props.obj)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <ReactPhoneInput

                                    value={this.props && this.props.registrationStore.applicationData[this.props.obj].phone}
                                    onChange={(value) => this.props.registrationStore.handleDataChange("phone", value, this.props.obj)}
                                    defaultCountry={'us'}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </React.Fragment>
        )
    };
}
export default withStyles(useStyles)(AddressContact);
