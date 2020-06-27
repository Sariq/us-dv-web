import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import CountrySelect from '../../components/countrySelect'
import { TextField, withStyles, InputLabel, Select, MenuItem } from '@material-ui/core';
import "./children-info.scss"
import { DropzoneArea } from 'material-ui-dropzone'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import MediaUploader from "../../components/mediaUploader";
import { inject, observer } from "mobx-react";

const useStyles = (theme => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
@inject('registrationStore', 'AuthStore', 'AppStore')
@observer
class ChildrenInfo extends Component {

    state = {
        currentYear: new Date().getFullYear() - 18
    }
    handleGenderChange = (event, index) => {
        this.props.registrationStore.handleDataChange("gender", event.target.value, this.props.obj, this.props.index)

    }
    // function handleOnChange(value) {
    //     console.log(value)
    // }
    onCountryChange = (value, fieldName, index) => {
        this.props.registrationStore.handleDataChange(fieldName, value, this.props.obj, this.props.index)
    }
    // const setSelectedImage = (files) => {
    //     console.log(files)
    //    // setImagePath(URL.createObjectURL(files[0]));

    //     //setImage(files);
    // }
    handleImageChange = (event) => {
        console.log("xxx")
        const files = event.target.files;
        if (files && files.length) {
            const filesArray = Array.from(files);
            //this.setState({uploadingFile: true});

            this.props.AppStore.uploadMedia(filesArray)
                .then((uploadedFiles) => {
                    if (uploadedFiles && uploadedFiles[0] && uploadedFiles[0].media_url) {
                        //this.handleDataChange(uploadedFiles[0].media_url, "image");
                    } else {
                        //this.handleDataChange(null, "image");
                    }
                })
            //.finally(() => this.setState({uploadingFile: false}));
        }
    };
    // currentYear = new Date().getFullYear() - 18;
    render() {
        const { classes } = this.props;

        return (
            <React.Fragment >
                <div className={`applicant-info-container spouse-info-container ${!this.props.AuthStore.authData.user.admin && this.props.registrationStore.applicationData.applicationStatus === "COMPLETED" ? 'application-completed' : ''}`}>
                    <div className="addressForm">
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="outlined"
                                    variant="outlined"
                                    required
                                    error={this.props && this.props.registrationStore.errors.firstName}
                                    helperText={this.props && this.props.registrationStore.errors.firstName ? "Invalid input" : null}
                                    id="firstName"
                                    name="firstName"
                                    label="First name"
                                    fullWidth
                                    autoComplete="fname"
                                    value={this.props.registrationStore.applicationData[this.props.obj][this.props.index] && this.props.registrationStore.applicationData[this.props.obj][this.props.index].firstName}
                                    onChange={(event) => this.props.registrationStore.handleDataChange("firstName", event.target.value, this.props.obj, this.props.index)}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="outlined"
                                    variant="outlined"
                                    required
                                    id="lastName"
                                    name="lastName"
                                    label="Last name"
                                    fullWidth
                                    autoComplete="lname"
                                    value={this.props.registrationStore.applicationData[this.props.obj][this.props.index] && this.props.registrationStore.applicationData[this.props.obj][this.props.index].lastName}
                                    onChange={(event) => this.props.registrationStore.handleDataChange("lastName", event.target.value, this.props.obj, this.props.index)}

                                />
                            </Grid>
                            <Grid container justify="flex-start" item xs={12} sm={6}>
                                <TextField
                                    label="outlined"
                                    variant="outlined"
                                    required
                                    id="middleName"
                                    name="middleName"
                                    label="Middle Name"
                                    fullWidth
                                    autoComplete="middleName"
                                    value={this.props.registrationStore.applicationData[this.props.obj][this.props.index] && this.props.registrationStore.applicationData[this.props.obj][this.props.index].middleName}
                                    onChange={(event) => this.props.registrationStore.handleDataChange("middleName", event.target.value, this.props.obj, this.props.index)}
                                />
                                <FormControlLabel
                                    control={<Checkbox color="primary" name="saveAddress" value="yes" />}
                                    label="Don't have middle name"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <CountrySelect selectedCountry={this.props.registrationStore.applicationData[this.props.obj][this.props.index].cob} placeHolder="Country Of Birth" onChange={(c) => this.onCountryChange(c, "cob", this.props.index)} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="outlined"
                                    variant="outlined"
                                    required
                                    id="cityOfBirth"
                                    name="cityOfBirth"
                                    label="City of Birth"
                                    fullWidth
                                    autoComplete="cityOfBirth"
                                    value={this.props.registrationStore.applicationData[this.props.obj][this.props.index] && this.props.registrationStore.applicationData[this.props.obj][this.props.index].cityOfBirth}
                                    onChange={(event) => this.props.registrationStore.handleDataChange("cityOfBirth", event.target.value, this.props.obj, this.props.index)}
                                />
                            </Grid>
                            <Grid container justify="flex-start" item xs={12} sm={6}>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup aria-label="gender" name="gender1"
                                        value={this.props.registrationStore.applicationData[this.props.obj][this.props.index] && this.props.registrationStore.applicationData[this.props.obj][this.props.index].gender}
                                        onChange={(e) => this.handleGenderChange(e, this.props.index)} row>
                                        <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>


                        <Grid className="bd-container" container direction="row"
                            justify="flex-start" spacing={10}>
                            <Grid direction="row" justify="flex-start" container item xs={12} sm={2}>
                                <FormControl variant="outlined" className={`select-input ${classes.formControl}`}>
                                    <InputLabel id="Day">Day</InputLabel>
                                    <Select
                                        labelId="Day"
                                        id="Day"
                                        label="Day"
                                        value={this.props.registrationStore.applicationData[this.props.obj][this.props.index].day}
                                        onChange={(event) => this.props.registrationStore.handleDataChange("day", event.target.value, this.props.obj, this.props.index, this.props.subObj)}
                                    >
                                        {Array.from(new Array(31), (v, i) =>
                                            <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid justify="flex-start" container item xs={12} sm={2}>
                                <FormControl variant="outlined" className={`select-input ${classes.formControl}`}>
                                    <InputLabel id="Month">Month</InputLabel>
                                    <Select
                                        labelId="Month"
                                        id="Month"
                                        label="Month"

                                        value={this.props.registrationStore.applicationData[this.props.obj][this.props.index].month}
                                        onChange={(event) => this.props.registrationStore.handleDataChange("month", event.target.value, this.props.obj, this.props.index, this.props.subObj)}
                                    >
                                        {Array.from(new Array(12), (v, i) =>
                                            <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid justify="flex-start" container item xs={12} sm={2}>
                                <FormControl variant="outlined" className={`select-input ${classes.formControl}`}>
                                    <InputLabel id="year">Year</InputLabel>
                                    <Select
                                        labelId="year"
                                        id="year"
                                        label="year"
                                        value={this.props.registrationStore.applicationData[this.props.obj][this.props.index].year}
                                        onChange={(event) => this.props.registrationStore.handleDataChange("year", event.target.value, this.props.obj, this.props.index, this.props.subObj)}
                                    >
                                        {Array.from(new Array(90), (v, i) =>
                                            <MenuItem key={i} value={this.state.currentYear - i}>{this.state.currentYear - i}</MenuItem>

                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>


                        {<Grid item container className="image-upload-container"
                            justify="flex-start" sm={2} >
                            {/* <DropzoneArea showPreviewsInDropzone={true} filesLimit={1}
                            acceptedFiles={['image/jpeg']}

                            onChange={setSelectedImage}
                        /> */}
                            <MediaUploader icon="Camera"
                                types="image/*"
                                onChange={(event) => this.handleImageChange(event)} />
                        </Grid>}




                    </div>
                </div>
            </React.Fragment>

        )
    };
}
export default withStyles(useStyles)(ChildrenInfo);
