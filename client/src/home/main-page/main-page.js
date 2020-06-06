import React from 'react';
import "../home.scss"
import "./main-page.scss"

import AppBar from '@material-ui/core/AppBar';
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
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import { withStyles } from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck';
import { Link } from 'react-router-dom';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const passport = require('../../assests/images/passport.jpg');
const supportPhone = require('../../assests/images/support-phone.png');
const reviewIcon = require('../../assests/images/review-icon.png');
const submissionIcon = require('../../assests/images/submission-icon.png');
const resubmissionIcon = require('../../assests/images/resubmission-icon.png');
const personalIcon = require('../../assests/images/personal-icon.png');
const supportDays = require('../../assests/images/365-days-icon.png');
const howWeHelpImg = require('../../assests/images/how-we-help-back.jpg');
const agent1 = require('../../assests/images/pic01.jpg');


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
        borderBottom: 'solid 2px'
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
        id: 1,
        icon: reviewIcon,
        bodyText: "Review Guaranteed Entry",
        bodySubText: "Our experts review all applications prior to submission to the U.S state department, avoiding disqualification and guaranteeing the entry. We guarantee matching your application to the demanded requirements by the States department from all aspects."
    },
    {
        id: 2,
        icon: supportDays,
        bodyText: "Access at All  Times",
        bodySubText: "As life can be unexpected and full of happy occasions, such as having a new child or marriage, we provide full time access to the application enabling editing information and keeping the application up to date with the current status."
    },
    {
        id: 3,
        icon: supportPhone,
        class: "customer-care",
        bodyText: "Customer Care",
        bodySubText: "We welcome all applicants from all eligible countries. Therefore our customer service representatives are available 24/7, regardless of the time difference, to deliver the best service and answer all inquiries."
    },
    {
        id: 4,
        icon: resubmissionIcon,
        bodyText: "Resubmission Service",
        bodySubText: "Our dedication towards our clients to be successful is the reason we found success as well. This is the reason for us to provide the option to resubmit the application for upcoming DV lotteries maximizing opportunities to the limit."
    },
    {
        id: 5,
        icon: personalIcon,
        bodyText: "Personal 1 on 1 Consultation",
        bodySubText: "As thousands of people receive a Green Card every year, many seek out assistance to adapt their new life in America. We provide a personal immigration consultant to work with the applicant one on one and help secure employment, finding accommodation"
    },
    {
        id: 6,
        icon: submissionIcon,
        bodyText: "Customer Care",
        bodySubText: "The lottery opens for 4 to 5 weeks every fall, this gives limited time to finalize applications and complete the reviews, in addition many individuals report not being able to submit the application during this time due to technical issues that can cause"
    }
];
class MainPage extends React.Component {

    goTo = (page) => {
        alert(page)
        //this.props.history.push(page);
    }
    render() {
        const { classes } = this.props;


        return (
            <div className="home-container main-page-container">

                <React.Fragment>

                    <main>
                        <Grid className="consultation-section" container direction="row" >
                            <div className="layer">

                                <div className="us-dv-text-container">
                                    <div className="text prof" >
                                        Professionals in the immigration sector with over 20 years of experience.
                                </div>
                                    <div justify="flex-start" className="us-dv-header-text " >
                                        <span className="usa-dv-text">USA-DV</span> Organization
                                </div>
                                    <div className="text need" >
                                        All you need for a green card in one place.
                                </div>
                                    <Grid container className="btns-container">
                                        <Link style={{ marginTop: '25px' }} className="link-item apply-now-btn" to="/register">
                                            <Button
                                                aria-controls="customized-menu"
                                                aria-haspopup="true"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Apply Now
                                </Button>
                                        </Link>
                                        <Link style={{ marginTop: '25px' }} className="link-item contact-us-btn" to="/register">
                                            <Button
                                                aria-controls="customized-menu"
                                                aria-haspopup="true"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Contact Us
                                </Button>
                                        </Link>
                                    </Grid>


                                </div>
                            </div>
                        </Grid>
                        <div className="how-do-we-help">
                            <div className="description-container">
                                <div className="title">
                                    How do we Help?
                                </div>

                                <div className="body">
                                    USA-DV is dedicated to provide all solutions, guidance and
                                    information for obtaining permanent residence in the United States.
                                </div>
                            </div>
                            <Container className="categories-cards-container" maxWidth="md">
                                <div >
                                    <Grid container spacing={6}>
                                        {cards.map(card => (
                                            <Grid className="card-container" key={card.id} item xs={12} sm={6} md={4}>
                                                <Card className={`${classes.card} ${card.class}`}>

                                                    <CardContent className={classes.cardContent}>
                                                        <div className="icon-container">
                                                            {/* {card.icon} */}
                                                            <img className="icon-img" src={card.icon} alt="" />
                                                        </div>
                                                        <div className="text">
                                                            {card.bodyText}
                                                        </div>
                                                        <div className="sub-text">
                                                            {card.bodySubText}
                                                        </div>
                                                    </CardContent>
                                                    <CardActions>

                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            </Container>
                        </div>


                        <div className="live-work">
                            <div className="image-container">
                                <div className="passport-image">
                                    <img src={passport} alt="" />
                                </div>
                                <div className="employes-img">
                                    <img src={howWeHelpImg} alt="" />
                                </div>
                            </div>
                            <div className="text-container">
                                <div className="title">
                                    Live and work in the United States.
                                    </div>

                                <div className="body">
                                    Every year at the 4th of July, the United States of America celebrates its independence, and for over 200 years, the country that was built by hard working pioneers and patriots seeking a better life, has been the destination for people from all over the world who also aim for a higher goal in terms of career, education, equality and most importantly freedom. As a result , conducted under the Immigration and Nationality Act (INA) of 1965 and administered by the Department of State, the DV lottery is held annually to provide 50,000 permanent resident visas to countries under-represented in the United States. <p>For further information please go to <span className="goto-faq">FAQ</span> </p>
                                </div>
                                <Link className="link-item contact-us-btn" to="/register">
                                    <Button
                                        aria-controls="customized-menu"
                                        aria-haspopup="true"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Contact Us
                                </Button>
                                </Link>
                            </div>

                        </div>



                        <div className="our-success-stories">
                            <div className="title-container">
                                <div className="title">Our Success Stories</div>
                                <p className="sub-title">The dedicated team of immigration consoultants in USA-DV takes
                                    pride in your success, listen to what our clients have to say. </p>
                            </div>
                            <CarouselProvider className="our-success-stories-slider"
                                naturalSlideWidth={100}
                                naturalSlideHeight={125}
                                totalSlides={3}
                                visibleSlides={3}
                            >
                                <ButtonBack className="back-btn">{"<"}</ButtonBack>
                                <Slider className="slider-items">
                                    <Slide className="slide-item" index={0}>
                                        <div className="testimonials">
                                            <div className="content">
                                                <div className="image">
                                                    <img src={agent1} alt="" />
                                                </div>
                                                <div className="blockquote">
                                                    <div>Im grateful to USA-DV organization for helping me win the green card, I submitted my application in 2016 and after 3 years my application was selected. Waiting for this long can be frustrating, but USA-DV was always in touch with us providing guidance and updates on the application status which made the process feel very smooth and comfortable.</div>
                                                </div>
                                                <div className="divider"></div>
                                                <div className="author">
                                                    <div className="agent-info">
                                                        <div className="agent-name">Jane Doe</div>
                                                        <div className="agent-title">CEO - ABC Inc.</div>
                                                    </div>
                                                    <div className="quote">
                                                        ""
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </Slide>
                                    <Slide className="slide-item" index={1}>
                                        <div className="testimonials">
                                            <div className="content">
                                                <div className="blockquote">
                                                    <p>In May 2019 I was contacted by USA-DV and they informed me that my application was selected in the DV lottery, it was very exciting and and confusing at the same time, but I was thankful to USA-DV for going even beyond and assisting me with  finding a good job, house and make sure that my children are registered in schools.</p>
                                                </div>
                                                <div className="author">
                                                    <div className="image">
                                                        {/* <img src="./index_files/pic03.jpg" alt=""> */}
                                                    </div>
                                                    <p className="credit">- <strong>John Doe</strong> <span>CEO - ABC Inc.</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </Slide>
                                    <Slide className="slide-item" index={2}>
                                        <div className="testimonials">
                                            <div className="content">
                                                <div className="blockquote">
                                                    <p>The service I received from USA-DV is described only as committed  and professional, not only did they guide me through the entire consular procedure after my winning announcement and made sure that all documents were reviewed and submitted to the right place in the right time , they also gave excellent and professional consultancy for my business investments in the United States.</p>
                                                </div>
                                                <div className="author">
                                                    <div className="image">
                                                        {/* <img src="./index_files/pic02.jpg" alt=""> */}
                                                    </div>
                                                    <p className="credit">- <strong>Janet Smith</strong> <span>CEO - ABC Inc.</span></p>
                                                </div>

                                            </div>
                                        </div>
                                    </Slide>
                                </Slider>
                                <ButtonNext className="next-btn">></ButtonNext>
                            </CarouselProvider>
                        </div>

                    </main>

                </React.Fragment>
            </div>

        );
    }
}

export default withStyles(useStyles)(MainPage);
