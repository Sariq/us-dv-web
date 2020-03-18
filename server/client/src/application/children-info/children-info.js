import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import CountrySelect from '../../components/countrySelect'
import { TextField, withStyles, InputLabel, Select, MenuItem } from '@material-ui/core';
import "./children-info.scss"
import { DropzoneArea } from 'material-ui-dropzone'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function ChildrenInfo({props,handleDataChange,index}) {
    const classes = useStyles();
    const [day, setDay] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [image, setImage] = useState(Array);
    const [passportStatus, setPassportStatus] = useState(null);
    const [country, setCountry] = useState(null);
    const [value, setValue] = React.useState('female');
    const [imagePath, setImagePath] = useState(null);

    const handleChange = event => {
        setValue(event.target.value);
    };
    function handleGenderChange(event,index) {
        handleDataChange("gender", event.target.value,index)
    }
    function handleOnChange(value) {
        console.log(value)
    }
    const onCountryChange = (value, index) => {
        setCountry(value);
        handleDataChange("country", value,index)
    }
    const setSelectedImage = (files) => {
        console.log(files)
        setImagePath(URL.createObjectURL(files[0]));

        setImage(files);
    }
    const currentYear = new Date().getFullYear() - 18;

    return (
        <React.Fragment >
            <div className="applicant-info-container spouse-info-container">
                <div className="addressForm">
                <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="First name"
                                fullWidth
                                autoComplete="fname"
                                value={props && props.registrationStore.applicationData.childrenInfo[index] && props.registrationStore.applicationData.childrenInfo[index].firstName}
                                onChange={(event) => handleDataChange("firstName", event.target.value,index)}
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
                                value={props && props.registrationStore.applicationData.childrenInfo[index] && props.registrationStore.applicationData.childrenInfo[index].lastName}
                                onChange={(event) => handleDataChange("lastName", event.target.value,index)}
                            />
                        </Grid>
                        <Grid container justify="flex-start" item xs={12} sm={6}>
                            <TextField
                                required
                                id="middleName"
                                name="middleName"
                                label="Middle Name"
                                fullWidth
                                autoComplete="middleName"
                                value={props && props.registrationStore.applicationData.childrenInfo[index] && props.registrationStore.applicationData.childrenInfo[index].middleName}
                                onChange={(event) => handleDataChange("middleName", event.target.value,index)}
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary" name="saveAddress" value="yes" />}
                                label="Don't have middle name"
                            />
                        </Grid>
                      
                        <Grid item xs={12} sm={6}>
                            <CountrySelect placeHolder="Country Of Birth" onChange={(c)=>onCountryChange(c,index)} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="cityOfBirth"
                                name="cityOfBirth"
                                label="City of Birth"
                                fullWidth
                                autoComplete="cityOfBirth"
                                value={props && props.registrationStore.applicationData.childrenInfo[index] && props.registrationStore.applicationData.childrenInfo[index].cityOfBirth}
                                onChange={(event) => handleDataChange("cityOfBirth", event.target.value,index)}
                            />
                        </Grid>
                        <Grid container justify="flex-start" item xs={12} sm={6}>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={props && props.registrationStore.applicationData.childrenInfo[index].gender} onChange={(e)=>handleGenderChange(e, index)} row>
                                    <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    
                    { <Grid item  container  className="image-upload-container"
                        justify="flex-start" sm={2} >
                        <DropzoneArea showPreviewsInDropzone={true} filesLimit={1}
                            acceptedFiles={['image/jpeg']}

                            onChange={setSelectedImage}
                        />
                    </Grid>}
                    



                </div>
            </div>
        </React.Fragment>
    );
}
export default (ChildrenInfo);
