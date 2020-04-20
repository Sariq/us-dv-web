import React from 'react';
import "./home.scss"
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
import HomeMenu from '../components/home-menu/home-menu';
import MainPage from './main-page/main-page';
import AboutUs from './about-us/about-us';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import AboutGreenCard from "./info/about-green-card/about-green-card";
import FAQ from "./info/faq/faq";
import StatisticsEligibleCountries from "./info/Statistics-eligible-countries/Statistics-eligible-countries";
function Copyright() {
    return (
        <Typography variant="body2"  align="center">
            {'Copyright © '}
            <Link  to="https://material-ui.com/">
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
        backgroundColor: '#272533',
        padding: theme.spacing(6),
        color: 'white'
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
class Home extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div className="home-container">

                <React.Fragment>
                    <CssBaseline />
                    <AppBar position="absolute" color="default" className="header">
                        <Toolbar>
                            <Typography variant="h6" color="inherit" noWrap>
                                Welcome to our Agency
          </Typography>
                        </Toolbar>
                    </AppBar>
                    <main>
                        {/* Hero unit */}
                        <div className="info-container">
                            <Container className="info-section">
                                <Grid container spacing={4}>
                                    <Grid container item sm={4} >
                                        <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
                                            LOGO
              </Typography>
                                    </Grid>
                                    <Grid container item justify="flex-end" sm={8} direction="row">
                                        <Grid container sm={4} spacing={4} direction="row" alignItems="center" item>
                                            <Grid item>
                                                <PhoneIcon />
                                            </Grid>
                                            <Grid item>
                                                <Grid container alignItems="flex-start" item>
                                                    Phone
                        </Grid>
                                                <Grid item>
                                                    1-888-123-45678
                        </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid container sm={4} spacing={4} direction="row" alignItems="center" item>
                                            <Grid item>
                                                <MailOutlineIcon />
                                            </Grid>
                                            <Grid item>
                                                <Grid container alignItems="flex-start" item>
                                                    E-mail us
                            </Grid>
                                                <Grid item>
                                                    info@demolink.org
                            </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid container sm={4} spacing={4} direction="row" alignItems="center" item>
                                            <Grid item>
                                                <AccessTimeIcon />
                                            </Grid>
                                            <Grid item>
                                                <Grid item>
                                                    Opening Time
                        </Grid>
                                                <Grid item>
                                                    08.00 - 18.00
                        </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Container>
                        </div>
                        <Grid className="home-menu-grid">
                            <HomeMenu goTo={(page) => { this.goTo(page) }} />
                        </Grid>


                    </main>
                    <Switch>
                        <Route exact path="/home" component={MainPage} />

                        <Route exact path="/home/aboutus" component={AboutUs} />
                        <Route exact path="/home/about-green-card" component={AboutGreenCard} />
                        <Route exact path="/home/statistics-eligible-countries" component={StatisticsEligibleCountries} />
                        <Route exact path="/home/faq" component={FAQ} />

                        {/* <Route exact  path="/home/about-us" render={(props) => <AboutUs {...props} />} /> */}
                    </Switch>
                    {/* Footer */}
                    <footer className={classes.footer}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Footer
          </Typography>
                        <Typography variant="subtitle1" align="center"  component="p">
                            Something here to give the footer a purpose!
          </Typography>
                        <Copyright />
                    </footer>
                    {/* End footer */}
                </React.Fragment>
            </div>

        );
    }
}

export default withStyles(useStyles)(Home);
