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
import './about-us.scss'
const passport = require('../../assests/images/passport.jpg');
const howWeHelpImg = require('../../assests/images/how-we-help-back.jpg');
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


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

const cards = [
    {
        icon: <WorkIcon />,
        bodyText: "Skilled Worker Visa",
        bodySubText: "Migrate as a skilled worker"
    },
    {
        icon: <WorkIcon />,
        bodyText: "Business Immigration Visa",
        bodySubText: "Relocate or invest in a new business abroad"
    },
    {
        icon: <WorkIcon />,
        bodyText: "Green Card",
        bodySubText: "Migrate to the USA"
    },
    {
        icon: <WorkIcon />,
        bodyText: "Family Visa",
        bodySubText: "Join Your Family"
    },
    {
        icon: <WorkIcon />,
        bodyText: "Visitor Visa",
        bodySubText: "Travel abroad for business or vacation"
    },
    {
        icon: <WorkIcon />,
        bodyText: "Work Permit",
        bodySubText: "Work and live abroad"
    }
];
class AboutUs extends React.Component {


    render() {
        const { classes } = this.props;

        return (
            <div className="tabs-pages">
                <div id="about-us-container" className="">

                    <React.Fragment>

                        <main>
                            <div className="live-work">
                                <div className="image-container">
                                    <div className="passport-image">
                                        <div className="vertical-us-dv">U  S  A  -  D  V</div>
                                        <img src={passport} alt="" />
                                    </div>
                                    <div className="employes-img">
                                        <img src={howWeHelpImg} alt="" />
                                    </div>
                                </div>
                                <div className="text-container">
                                    <div className="title">
                                    Welcome to Voyage Agency.
                                    </div>
                                    <div className="body">
                                        <div>
                                        USA-DV is a private company established by a team of immigrants and immigration experts.
                                        The Goal of USA-DV is to assist and assure the participation in the Diversity Visa Lottery, held by the Department of State in the fall of each year, then opening the way for the option to receive a permanent residency (Green Card) in the U.S.
                                        Although only a small portion of the world’s population is qualified to enter the Diversity Visa program, USA-DV has successfully reached out to clients from all over the globe, regardless of the distance and time difference, and we are pleased to have earned reputable name from our clients who happily reside currently in the United States of America.

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="about-us-container">
                                <div className="text-container">
                                    <div className="body-title">
                                        Our Services
                                </div>
                                    <p className="body-sub-title">
                                        USA-DV offers services designed to meet all needs of the applicant. We have decided to offer our service an assistance after years of experience which were enough to better educate our team to obtain all factors required for a successful simple process.
                                </p>
                                    <div className="body">
                                        <div>
                                            1) Application Review:
                                    </div>
                                        <div>
                                            Once the application is completed, the next step is a review by immigration professionals to assure meeting all requirements demanded by the Department of State, this includes but not limited to, accurate and correct filling of application from, matching personal photos to the up to date requirements and updates before and after submission to the State Department.
                                    </div>
                                        <div>
                                            2) Open Submission window:
                                    </div>
                                        <div>
                                            The Department of State is open to receive the Diversity Visa applications only from the beginning of October until the beginning of November, which can pose a problem for the applicant due to limited access or other technical failures, or missing the submission period. We allow you to prepare your application and we will review it and submit in on your behalf to enroll the application is the upcoming DVs.
                                    </div>
                                        <div>
                                            3) Access 24/7 365:
                                    </div>
                                        <div>
                                            Choosing our services will ensure granted access to the application at all times to make any modifications. This can be crucial as all information on the application needs to be up to date with the applicant’s status by the time of the submission. Our team understands that life is unpredictable, therefore changes can be made to the application at all times, from changing photos, updating passport information, adding children etc.
                                    </div>
                                        <div>
                                            4) Consular Process:
                                    </div>
                                        <div>
                                            In May every year, the results for the Diversity visa lottery announce 100,000 application as selectees for the opportunity to live as Lawful Permanent Resident (LPR) in the United States. The applicants are required to finish their consular process so 50,000 applications can be eventually chosen to provide their owners with the LPR visa, commonly known as the Green Card. To assign to date and location for the interview, we submit your documents after a professional review to the KCC (Kentucky Consular Center) and we will forward the invitation letter including the documents needed to present included to guide you to success.
                                    </div>
                                        <div>
                                            5) Personal Immigration Consultant:
                                    </div>
                                        <div>
                                            When applying for the Diversity Visa lottery, it is important to insure that the application is not neglected, Every Client deserves personal care, therefor a personal immigration consultant available at flexible times to keep you updated with the status and offer full guidance in a variety of topics, which can involve questions about employment, accommodation, health care and education.
                                    </div>
                                        <div>
                                            6) Resubmission:
                                    </div>
                                        <div>
                                            This service is offered to show our dedication to the success of every application. The service will include multiple submissions for the upcoming DV programs for a number of years depending on the chosen service, or until the LPR visa is successfully obtained.
                                    </div>
                                        <div>
                                            USA-DV is always available for any assistance this is why, in addition to the mentioned above we offer 24/7 customer support and we register every application with the hope to seeing the applicant in the United States as soon as possible.
                                    </div>
                                        <div>

                                        </div>
                                        <div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </main>
                    </React.Fragment>
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(AboutUs);
