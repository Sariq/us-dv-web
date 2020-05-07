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
import './Statistics-eligible-countries.scss'
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

class StatisticsEligibleCountries extends React.Component {

  
    render() {
        const { classes } = this.props;

        return (
            <div className="home-container statistics-eligible-countries-container">

                <React.Fragment>

                    <main>

                        <div className="about-us-container">
                            <div className="text-container">
                                <h2 className="title">
                                    About Us
                                </h2>
                                <div className="sub-title">
                                    Welcome to Voyage Agency.
                                </div>
                                <div className="body">
                                    Our Agency  was established in 2000, Voyage is a private immigration company with a team of highly experienced migration consultants for the Canada, USA, Europe and Australia clients from across the globe wishing to apply for a visa. Voyage Agency provides fee-based services in addition to the official government charges to advise, assist and represent our clients through the often-complex visa application process.
                                </div>
                                <div className="footer">
                                    <span className="need">
                                        Need a consultation?
                                    </span>
                                    <span>
                                        Call us today 1-888-123-45678  or  e-mail us: info@demolink.org
                                    </span>
                                </div>
                            </div>
                        </div>

                    </main>
 
                    {/* End footer */}
                </React.Fragment>
            </div>

        );
    }
}

export default withStyles(useStyles)(StatisticsEligibleCountries);
