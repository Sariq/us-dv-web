import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import { withStyles } from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck';
import "./about-green-card.scss";
const passport = require('../../../assests/images/passport.jpg');
const howWeHelpImg = require('../../../assests/images/how-we-help-back.jpg');
const glassPassport = require('../../../assests/images/glass-passport.png');



const useStyles = (theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
        marginTop: 100
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

class AboutGreenCard extends React.Component {


    render() {
        const { classes } = this.props;

        return (
            <div className="tabs-pages">

                <div className="about-green-card">

                    <React.Fragment>

                        <main>
                            <div className="live-work">
                                <div className="image-container">
                                    <div className="passport-image">
                                        <div className="vertical-us-dv">U  S  A  -  D  V</div>
                                        <img src={passport} alt="" />
                                    </div>
                                    <div className="employes-img glass-passport-image">
                                        <img src={glassPassport} alt="" />
                                    </div>
                                </div>
                                <div className="text-container">
                                    <div className="title">
                                        About the Green card
                                    </div>
                                    <div className="body">
                                        <div>The Immigration and Nationality Act (INA) of 1990 provided an alternative immigration structure to the United States, to the previous immigration procedures offered by the 1965 Immigration and Naturalization act, which focused on obtaining visas through employment and family members sponsorship.</div>
                                        <div>One of the main contributions on the INA is increasing the immigration rates by introducing the Diversity Visa program.

At the moment there are over 10 million Green Card holders in the United States who are also eligible for citizenship.

The DV program in conducted under the Department of state and the lottery system was specificly chosen to offer equal opportunity for citizens in countries under-represented in terms of immigration rates.</div>
                                    </div>
                                </div>
                            </div>
                            <div className="about-us-container">
                                <div className="text-container">

                                    <div className="body">

                                        <div className="body-title">Requirements</div>

                                        <p className="body-sub-title">Participation in the Diversity visa program is dependent on 5 factors:</p>

                                        <p>A) Birth in an eligible country :  Participation in the Diversity Visa program is blocked for countries which received 55,000 or higher Permanent Residency visas in the last 5 years, this includes visas obtained through the DV program or alternative immigration programs.</p>

                                        <p>B) Education :  A minimum of a High School diploma or equivalent of at least 12 of education needs to be confirmed</p>

                                        <p>C) Medical Status:  Applicant and all depandads included need to be at good medical condition.</p>

                                        <p>D) Criminal clearance :</p>

                                        <p>Applicants with criminal background will be disqualified. This will be confirmed by submitting documents in preparation for the consular process.</p>

                                        <p></p>

                                        <p>Application Form :</p>

                                        <p>Filling out the Diversity Visa application requires providing basic infoirmation about the applicant and his family.  </p>

                                        <p>A) First and last name as printed on the passport.</p>


                                        <p>B) Date of birth</p>

                                        <p>C) country of birth (regardless of nationality)</p>

                                        <p>D) Nationality</p>

                                        <p>E) country of residence</p>

                                        <p>F) marital status</p>

                                        <p>G) Education and level of english  H) Occupation</p>

                                        <p>I) Passport ionfo (number, issuing coiuntry and expiry date)</p>

                                        <p>J) Personal passport type photo</p>

                                        <p></p>

                                        <p>WINNERS:  </p>

                                        <p>On the May every year, 100,000 applications are selected for the opportunity to obtain a permamnent residency visa (Green Card )to the U.S.</p>

                                        <p>From these application , 50,000 are selected through the i counsolar procvess to finally receive their visa and become lawful premamanent residents in the United states of America.</p>

                                        <p>Details concerning the consular process and interview are privided in the floowing section.</p>

                                        <p></p>

                                        <p>Interview/ Consular process:  </p>

                                        <p>This Process aims to select the 50,000 applications from the total 100,00 announced, and this process begins after the application has been selected and documents have been sumbitted to the KCC. Completing thios process successfully depents on a number of factors:</p>

                                        <p></p>

                                        <p>1) First come First Serve:  The applications and documents which will be submited the earliest, will have the earliest interviews. This is important for securing the applicant&rsquo;s place in the first 50,000 interviews.    </p>

                                        <p>2) verifying accuracy and intergrity of the application. This requires sending official documents as proof of the information provided.</p>

                                        <p>3) Verifying medical status and criminal clearance.</p>

                                        <p></p>

                                        <p> 4) General interview: Self description, Occupation description and stating the objectives in pursuing permanent residence in USA.</p>

                                        <p></p>

                                        <p>The interviews generally begin in the month of August that follows the date of the winners announcments which is in May the same year, This allows process documents and scheduel dates for the interviews in the embassys or counsolates of the eligible countires. Upon completing the consular process succesfuly, the applicant will have 6 months to enter the United States of America and recievbe the permanent residency visa. This period can be extended providing a reasonable alliby and depandant on maintaining a good medical status and criminal clearnce.  </p>

                                        <p>Righs of a Lawful Permanent resident (Greencard holder:)  </p>

                                        <p>LPR visa holders receive all rights similar to any citizen on the United States. This includes health care and primary education benifits, work and pay equal taxes, open a business or own and invest into personal rpobery in the U.S. including many more.  </p>

                                        <p>Immigrants under the LPR visa are also eligible to apply to a passport and citizenship after 5 years of residence. The key difference relies in participating in the president elections, in temrs of coting or being votred for, or occupying posistions that require high security clearance, citizens who were not born in the United States are not permitted to those rights.</p>                                </div>

                                </div>
                            </div>

                        </main>


                    </React.Fragment>
                </div>
            </div>

        );
    }
}

export default withStyles(useStyles)(AboutGreenCard);
