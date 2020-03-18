import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import ReactPhoneInput from 'react-phone-input-2';
import { makeStyles } from '@material-ui/core/styles';
import CountrySelect from '../../components/countrySelect'
import { TextField, withStyles, InputLabel, Select, MenuItem } from '@material-ui/core';
import "./address-contact.scss"

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function AddressContact({handleDataChange, props}) {
    const classes = useStyles();
    const [day, setDay] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [maritalStatus, setMaritalStatus] = useState(null);
    const [education, setEducation] = useState(null);
    const [country, setCountry] = useState(null);
    const [value, setValue] = React.useState('female');
    const handleChange = event => {
        setValue(event.target.value);
    };
    function handleOnChange(value) {
        console.log(value)
        handleDataChange("phone", value)

    }
    const onCountryChange = (value) => {
        setCountry(value);
        handleDataChange("country", value)
    }
    const currentYear = new Date().getFullYear() - 18;

    return (
        <React.Fragment >
            <div className="applicant-info-container">
                <div className="addressForm">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="email"
                                name="email"
                                label="Email"
                                fullWidth
                                autoComplete="email"
                                value={props && props.registrationStore.applicationData.addressContact.email}
                                onChange={(event) => handleDataChange("email", event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="additionalEmail"
                                name="additionalEmail"
                                label="Additional Email"
                                fullWidth
                                autoComplete="additionalEmail"
                                value={props && props.registrationStore.applicationData.addressContact.additionalEmail}
                                onChange={(event) => handleDataChange("additionalEmail", event.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <CountrySelect placeHolder="Country Of Birth" onChange={onCountryChange} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="cityOfBirth"
                                name="cityOfBirth"
                                label="City of Birth"
                                fullWidth
                                autoComplete="cityOfBirth"
                                value={props && props.registrationStore.applicationData.addressContact.cityOfBirth}
                                onChange={(event) => handleDataChange("cityOfBirth", event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="street"
                                name="street"
                                label="Street"
                                fullWidth
                                autoComplete="street"
                                value={props && props.registrationStore.applicationData.addressContact.street}
                                onChange={(event) => handleDataChange("street", event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="houseNumber"
                                name="houseNumber"
                                label="House Number"
                                type="number"
                                fullWidth
                                autoComplete="houseNumber"
                                value={props && props.registrationStore.applicationData.addressContact.houseNumber}
                                onChange={(event) => handleDataChange("houseNumber", event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="postalCode"
                                name="postalCode"
                                label="Postal Code"
                                type="number"
                                fullWidth
                                autoComplete="postalCode"
                                value={props && props.registrationStore.applicationData.addressContact.postalCode}
                                onChange={(event) => handleDataChange("postalCode", event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="poBox"
                                name="poBox"
                                label="Po. box"
                                fullWidth
                                autoComplete="poBox"
                                value={props && props.registrationStore.applicationData.addressContact.poBox}
                                onChange={(event) => handleDataChange("poBox", event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ReactPhoneInput defaultCountry={'us'} onChange={handleOnChange} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </React.Fragment>
    );
}
export default (AddressContact);
