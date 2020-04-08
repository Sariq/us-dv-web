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
@inject('registrationStore','AuthStore','AppStore')
@observer
class ChildrenInfo extends Component {
//function ChildrenInfo({props,handleDataChange,index}) {
    // const classes = useStyles();

    // // const [image, setImage] = useState(Array);
    // const [country, setCountry] = useState(null);
    // const [value, setValue] = React.useState('female');
    // const [imagePath, setImagePath] = useState(null);

    // const handleChange = event => {
    //     setValue(event.target.value);
    // };
    handleGenderChange = (event, index) => {
        this.props.registrationStore.handleDataChange("gender", event.target.value, this.props.obj, this.props.index)

    }
    // function handleOnChange(value) {
    //     console.log(value)
    // }
    onCountryChange = (value, index) => {
        this.props.registrationStore.handleDataChange("country", value, this.props.obj, this.props.index)
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
     render(){
        const { classes } = this.props;

    return (
        <React.Fragment >
            <div className="applicant-info-container spouse-info-container">
                <div className="addressForm">
                <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <TextField
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
                            <CountrySelect selectedCountry={this.props.registrationStore.applicationData[this.props.obj][this.props.index].country} placeHolder="Country Of Birth" onChange={(c)=>this.onCountryChange(c,this.props.index)} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
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
                                 onChange={(e)=>this.handleGenderChange(e, this.props.index)} row>
                                    <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    
                    { <Grid item  container  className="image-upload-container"
                        justify="flex-start" sm={2} >
                        {/* <DropzoneArea showPreviewsInDropzone={true} filesLimit={1}
                            acceptedFiles={['image/jpeg']}

                            onChange={setSelectedImage}
                        /> */}
                        <MediaUploader icon="Camera"
              types="image/*"
              onChange={(event) =>this.handleImageChange(event)}/>
                    </Grid>}
                    



                </div>
            </div>
        </React.Fragment>
     
     )};
}
export default withStyles(useStyles)(ChildrenInfo);
