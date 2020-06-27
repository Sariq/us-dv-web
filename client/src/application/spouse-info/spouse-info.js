import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import CountrySelect from '../../components/countrySelect'
import { TextField, withStyles, InputLabel, Select, MenuItem } from '@material-ui/core';
import "./spouse-info.scss"
import { DropzoneArea } from 'material-ui-dropzone'
import { render } from '@testing-library/react';
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
class SupouseInfo extends Component {

    state = {
        currentYear: new Date().getFullYear() - 18
    }
    onCountryChange = (value, fieldName) => {
        this.props.registrationStore.handleDataChange(fieldName, value, this.props.obj, null , this.props.subObj)
    }
    // const setSelectedImage = (files) => {
    //     // console.log(files)
    //     // if (files.length > 0) {
    //     //     setImagePath(URL.createObjectURL(files[0]));
    //     //     setImage(files);
    //     // }
    // }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment >
                <div className={`applicant-info-container spouse-info-container ${!this.props.AuthStore.authData.user.admin && this.props.registrationStore.applicationData.applicationStatus === "COMPLETED" ? 'application-completed' : ''}`}>
                    <div className="addressForm">
                        <Grid container spacing={5}>
                            <Grid container justify="flex-start" item xs={12} sm={6}>
                                <FormControl variant="outlined" className={`select-input ${classes.formControl}`}>
                                    <InputLabel id="passportStatus">Passport Status</InputLabel>
                                    <Select
                                        labelId="passportStatus"
                                        id="passportStatus"
                                        label="passportStatus"
                                        value={this.props && this.props.registrationStore.applicationData[this.props.obj][this.props.subObj].passportStatus}
                                        onChange={(event) => this.props.registrationStore.handleDataChange("passportStatus", event.target.value, this.props.obj, null , this.props.subObj )}
                                    >
                                        <MenuItem value="valid">Valid</MenuItem>
                                        <MenuItem value="lostOrExpired">Lost or Expired</MenuItem>
                                        <MenuItem value="neverOwnedAPassport">Never owned a passport</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                label="Outlined"
                                variant="outlined"
                                    required
                                    error={this.props && this.props.registrationStore.errors.passportNumber}
                                    helperText={this.props && this.props.registrationStore.errors.passportNumber ? "Invalid input" : null}
                                    id="passportNumber"
                                    name="passportNumber"
                                    label="Passport Number"
                                    type="number"
                                    fullWidth
                                    autoComplete="passportNumber"
                                    value={this.props && this.props.registrationStore.applicationData[this.props.obj][this.props.subObj].passportNumber}
                                    onChange={(event) => this.props.registrationStore.handleDataChange("passportNumber", event.target.value, this.props.obj, null , this.props.subObj )}
                                />
                            </Grid>
                            <Grid item className="bd-container" container direction="row"
                                justify="flex-start" sm={12} >

                                <Grid justify="flex-start" container item xs={12} sm={3}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="month">Month</InputLabel>
                                        <Select
                                            labelId="Month"
                                            id="Month"
                                            label="Month"
                                            value={this.props && this.props.registrationStore.applicationData[this.props.obj][this.props.subObj].month}
                                            onChange={(event) => this.props.registrationStore.handleDataChange("month", event.target.value, this.props.obj, null , this.props.subObj )}
                                        >
                                            {Array.from(new Array(12), (v, i) =>
                                                <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>

                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid justify="flex-start" container item xs={12} sm={3}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="year">Year</InputLabel>
                                        <Select
                                            labelId="year"
                                            id="year"
                                            label="year"
                                            value={this.props && this.props.registrationStore.applicationData[this.props.obj][this.props.subObj].year}
                                            onChange={(event) => this.props.registrationStore.handleDataChange("year", event.target.value, this.props.obj, null , this.props.subObj )}
                                        >
                                            {Array.from(new Array(90), (v, i) =>
                                                <MenuItem key={i} value={this.state.currentYear - i}>{this.state.currentYear - i}</MenuItem>

                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CountrySelect selectedCountry={this.props.registrationStore.applicationData[this.props.obj][this.props.subObj].issuingCountry} placeHolder="Issuing Country" onChange={(value) => this.onCountryChange(value,"issuingCountry")} />
                            </Grid>

                        </Grid>
                        <Grid item xs={12} sm={12} container className="image-upload-container"
                            justify="flex-start" sm={2} >
                            <DropzoneArea showPreviewsInDropzone={false} filesLimit={1}
                                acceptedFiles={['image/*']}
                                showPreviews={true}
                                dropzoneClass="drop-zone-container"
                            />
                        </Grid>




                    </div>
                </div>
            </React.Fragment>
        )
    };
}
export default withStyles(useStyles)(SupouseInfo);
