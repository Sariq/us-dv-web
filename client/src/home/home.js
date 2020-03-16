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
import Link from '@material-ui/core/Link';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import { withStyles } from '@material-ui/styles';
import WorkIcon from '@material-ui/icons/Work';
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck';
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


const useStyles = makeStyles(theme => ({
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

                        <Grid className="consultation-section" container direction="row" justify="center" alignItems="center">
                            <Grid container justify="center" item xs="12" sm="6">
                                <Typography variant="h2" color="red" justify="flex-start" alignItems="flex-start" className="text" >
                                    US Immigration Consultancy
                        </Typography>
                                <Typography variant="h2" color="red" className="text" >
                                    & Visa Services
                        </Typography>
                            </Grid>
                            <Grid item xs="12" sm="2">
                                <Card className="card">
                                    <CardContent >
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Need a Consultation?
                      </Typography>
                                        <Button onClick={() => this.props.history.push('/application')} variant="contained" color="primary">
                                            REQUEST A CALLBACK
                      </Button>
                                        <Button onClick={() => this.props.history.push('/register')} variant="contained" color="primary">
                                            CONTACT US
                      </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Container maxWidth="md">
                            <div className="categories-cards-container">
                                <div className="visa-categories-title-container">
                                    <div className="text">
                                        Visa Categories
                                    </div>
                                </div>
                                {/* End hero unit */}
                                <Grid container spacing={4}>
                                    {cards.map(card => (
                                        <Grid item key={card} xs={12} sm={6} md={4}>
                                            <Card className={classes.card}>

                                                <CardContent className={classes.cardContent}>
                                                    <div className="icon-container">
                                                        {card.icon}
                                                    </div>
                                                    <div className="text">
                                                        {card.bodyText}
                                                    </div>
                                                    <div className="sub-text">
                                                        {card.bodySubText}
                                                    </div>
                                                </CardContent>
                                                <CardActions>
                                                    <div className="more-info">
                                                        MORE INFO
                      </div>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        </Container>
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
                        <div className="data-divider"></div>

                    </main>
                    {/* Footer */}
                    <footer className={classes.footer}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Footer
          </Typography>
                        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
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
