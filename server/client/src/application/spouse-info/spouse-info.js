import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import CountrySelect from '../../components/countrySelect'
import { TextField, withStyles, InputLabel, Select, MenuItem } from '@material-ui/core';
import "./spouse-info.scss"
import { DropzoneArea } from 'material-ui-dropzone'


const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function SupouseInfo({handleDataChange,props}) {
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
    function handleOnChange(value) {
        console.log(value)

    }
    const onCountryChange = (value) => {
        setCountry(value);
        handleDataChange("country", value)
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
                        <Grid container justify="flex-start" item xs={12} sm={6}>
                            <FormControl className={`select-input ${classes.formControl}`}>
                                <InputLabel id="demo-simple-select-label">Passport Status</InputLabel>
                                <Select
                                    labelId="passportStatus"
                                    id="passportStatus"
                                    value={passportStatus}
                                    value={props && props.registrationStore.applicationData.spouseInfo.passportStatus}
                                    onChange={(event) => handleDataChange("passportStatus", event.target.value)}
                                >
                                    <MenuItem value="valid">Valid</MenuItem>
                                    <MenuItem value="lostOrExpired">Lost or Expired</MenuItem>
                                    <MenuItem value="neverOwnedAPassport">Never owned a passport</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="passportNumber"
                                name="passportNumber"
                                label="Passport Number"
                                type="number"
                                fullWidth
                                autoComplete="passportNumber"
                                value={props && props.registrationStore.applicationData.spouseInfo.passportNumber}
                                onChange={(event) => handleDataChange("passportNumber", event.target.value)}
                            />
                        </Grid>
                        <Grid item className="bd-container" container direction="row"
                            justify="flex-start" sm={12} >

                            <Grid justify="flex-start" container item xs={12} sm={2}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="month">Month</InputLabel>
                                    <Select
                                        labelId="Month"
                                        id="Month"
                                        value={props && props.registrationStore.applicationData.spouseInfo.month}
                                        onChange={(event) => handleDataChange("month", event.target.value)}
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
                                        value={props && props.registrationStore.applicationData.spouseInfo.year}
                                        onChange={(event) => handleDataChange("year", event.target.value)}
                                    >
                                        {Array.from(new Array(90), (v, i) =>
                                            <MenuItem value={currentYear - i}>{currentYear - i}</MenuItem>

                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CountrySelect placeHolder="Issuing Country" onChange={onCountryChange} />
                        </Grid>

                    </Grid>
                    {image.length == 0 && <Grid item  container  className="image-upload-container"
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
export default (SupouseInfo);
