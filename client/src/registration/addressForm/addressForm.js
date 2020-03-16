import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ReactPhoneInput from 'react-phone-input-2';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import CountrySelect from '../../components/countrySelect'

import { TextField, withStyles, InputLabel, Select, MenuItem } from '@material-ui/core';
import "./addressForm.scss"
const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function AddressForm({ handleDataChange, props, obj }) {
    const classes = useStyles();
    const [day, setDay] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [country, setCountry] = useState(null);
    const handleChannelChange = (attr, value) => {
        this.props.handleDataChange(attr, value);
    };
    function handleOnChange(value) {
        handleDataChange("phone", value, obj)
    }
    const onCountryChange = (value) => {
        setCountry(value);
        handleDataChange("country", value, obj)
    }
    const currentYear = new Date().getFullYear() - 18;

    return (
        <React.Fragment >
           
            <div className="addressForm">
          
                <Typography variant="h6" gutterBottom>
                    Persona Details
      </Typography>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First name"
                            fullWidth
                            autoComplete="fname"
                            value={props && props.registrationStore.registrationData.personalDetails.firstName}
                            onChange={(event) => handleDataChange("firstName", event.target.value, obj)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last name"
                            fullWidth
                            autoComplete="lname"
                            value={props && props.registrationStore.registrationData.personalDetails.lastName}
                            onChange={(event) => handleDataChange("lastName", event.target.value, obj)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="Email"
                            name="Email"
                            label="Email"
                            fullWidth
                            autoComplete="email"
                            value={props && props.registrationStore.registrationData.personalDetails.email}
                            onChange={(event) => handleDataChange("email", event.target.value, obj)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <CountrySelect onChange={onCountryChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ReactPhoneInput value={props && props.registrationStore.registrationData.personalDetails.phone} defaultCountry={'us'} onChange={handleOnChange} />
                    </Grid>
                </Grid>

                <Grid className="bd-container" container direction="row"
                    justify="flex-start" spacing={10}>
                    <Grid direction="row" justify="flex-start" container item xs={12} sm={2}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Day</InputLabel>
                            <Select
                                labelId="Day"
                                id="Day"
                                value={props.registrationStore.registrationData.personalDetails.day}
                                onChange={(event) => handleDataChange("day", event.target.value, obj)}
                            >
                                {Array.from(new Array(31), (v, i) =>
                                    <MenuItem value={i + 1}>{i + 1}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid justify="flex-start" container item xs={12} sm={2}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="month">Month</InputLabel>
                            <Select
                                labelId="Month"
                                value={props.registrationStore.registrationData.personalDetails.month}
                                onChange={(event) => handleDataChange("month", event.target.value, obj)}
                            >
                                {Array.from(new Array(12), (v, i) =>
                                    <MenuItem value={i + 1}>{i + 1}</MenuItem>

                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid justify="flex-start" container item xs={12} sm={2}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="year">Year</InputLabel>
                            <Select
                                labelId="year"
                                id="year"
                                value={props.registrationStore.registrationData.personalDetails.year}
                                onChange={(event) => handleDataChange("year", event.target.value, obj)}
                            >
                                {Array.from(new Array(90), (v, i) =>
                                    <MenuItem value={currentYear - i}>{currentYear - i}</MenuItem>

                                )}
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>

            </div>
        </React.Fragment>
    );
}
export default (AddressForm);
