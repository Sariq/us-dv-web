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
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
const logo = require('../assests/images/us-dv-logo.png');


function Copyright() {
    return (
        <Typography variant="body2" align="center">
            {'Copyright © '}
            <Link to="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const drawerWidth = 240;


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
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: '#272533'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: 0,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));



class Home extends React.Component {
    state = {
        open: false,
        subMenuOpen: false
    }
    handleSubItemClick = (data, forceCloseSubMenu) => {
        if(data.subItems){
            this.setState({ subMenuOpen: !this.state.subMenuOpen })
        }else{
            if(forceCloseSubMenu){
                this.setState({ subMenuOpen: !this.state.subMenuOpen })
            }
            this.handleDrawerClose();
        }
    };
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };
    gotoLogin = () => {
        this.props.history.push('/login-page');
    }
    render() {
        const { classes } = this.props;

        return (
            <div className="home-container">

                <React.Fragment>
                    <div className={classes.root}>
                        <CssBaseline />
                        <div className="mobile-menu-container">
                            <AppBar
                                position="fixed"
                                className={clsx(classes.appBar, {
                                    [classes.appBarShift]: this.state.open,
                                })}
                            >
                                <Toolbar>
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={this.handleDrawerOpen}
                                        edge="start"
                                        className={`${clsx(classes.menuButton, this.state.open && classes.hide)} menu-btn`}
                                    >

                                        <MenuIcon />
                                    </IconButton>
                                    <Typography variant="h6" noWrap>
                                        US DV
                                 </Typography>
                                </Toolbar>
                            </AppBar>
                            <Drawer
                                className={classes.drawer}
                                variant="persistent"
                                anchor="left"
                                open={this.state.open}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                <div className={classes.drawerHeader}>
                                    <IconButton className="menu-btn" onClick={this.handleDrawerClose}>
                                        <ChevronLeftIcon />
                                    </IconButton>
                                </div>
                                <Divider />
                                <List>
                                    {[{ title: 'Home', page: '/home' }, { title: 'About Us', page: '/home/aboutus' },
                                    {
                                        title: 'Info',
                                        subItems: [{ title: 'About the Green card', page: '/home/about-green-card' },
                                        { title: 'Statistics and eligible countries', page: '/home/statistics-eligible-countries' },
                                        { title: 'FAQ', page: '/home/faq' },
                                    ]
                                    },
                                    { title: 'Apply Now', page: '/register' },
                                    ]
                                        .map((data, index) => (
                                            <>
                                                <Link className="link-item" to={data.page}>
                                                    <ListItem button key={data.title} onClick={()=>this.handleSubItemClick(data)}>
                                                        <ListItemText primary={data.title} />
                                                        {data.subItems ? this.state.subMenuOpen ? <ExpandLess /> : <ExpandMore /> : null}
                                                    </ListItem>
                                                </Link>

                                                {data.subItems &&
                                                    <Collapse in={this.state.subMenuOpen} timeout="auto" unmountOnExit>
                                                        <List component="div" disablePadding>
                                                            {data.subItems.map((item) => {
                                                                return (
                                                                    <Link className="link-item" to={item.page}>
                                                                        <ListItem button className={classes.nested} onClick={()=>this.handleSubItemClick(item, true)}>
                                                                            <ListItemText primary={item.title} />
                                                                        </ListItem>
                                                                    </Link>
                                                                )
                                                            })}
                                                        </List>
                                                    </Collapse>
                                                }
                                                <Divider />
                                            </>
                                        ))}
                                </List>
                            </Drawer>
                        </div>
                        <CssBaseline />
                        {/* 
                        <AppBar position="absolute" color="default" className="header">
                            <Toolbar>
                            <div className="header-content-container">
                                <div>
                                <Typography variant="h6" color="inherit" noWrap>
                                    Welcome to our Agency
          </Typography>
          </div>
          <div>
                                <Button
                                    onClick={this.gotoLogin}
                                    variant="contained" color="primary"
                                >
                                    LogIn
                  </Button>
                  </div>
                  </div>

                            </Toolbar>
                        </AppBar> */}
                        <main>
                            <div className="data-divider header"></div>

                            {/* Hero unit */}
                            <div className="header-container">
                                <div className="info-container">
                                    <Container className="info-section">
                                        <Grid container spacing={4}>
                                            <Grid container item sm={4} >
                                                {/* <img style={{height:'200px'}} src={logo} /> */}


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
                                <div className="apply-now">
                                    <Link className="link-item apply-btn" to="/login-page">
                                        <Button
                                            aria-controls="customized-menu"
                                            aria-haspopup="true"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Login
                </Button>
                                    </Link>
                                </div>
                            </div>
                            <Grid className="home-menu-grid">
                                <HomeMenu goTo={(page) => { this.goTo(page) }} />
                            </Grid>


                        </main>
                    </div>
                    <Switch>
                        <Route exact path="/home" component={MainPage} />
                        <Route exact path="/home/aboutus" component={AboutUs} />
                        <Route exact path="/home/about-green-card" component={AboutGreenCard} />
                        <Route exact path="/home/statistics-eligible-countries" component={StatisticsEligibleCountries} />
                        <Route exact path="/home/faq" component={FAQ} />

                        {/* <Route exact  path="/home/about-us" render={(props) => <AboutUs {...props} />} /> */}
                    </Switch>
                    {/* Footer */}
                    {/* <footer className={classes.footer}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Footer
          </Typography>
                        <Typography variant="subtitle1" align="center" component="p">
                            Something here to give the footer a purpose!
          </Typography>
                        <Copyright />
                    </footer> */}

                    {/* End footer */}
                    <footer id="footer">
                        <div className="inner">
                            <div className="content">
                                <section>
                                    <h3>Contact Info</h3>
                                    <p>XXX (Building)
        New York, NY 00000
        United States
        Phone : +1-000-000-0000
        Whatsapp: : +1-000-000-0000
        Email : csr@usa-dv.org

</p>
                                </section>
                                <section>
                                    <h4></h4>
                                    <ul className="alt">
                                        <li><a href="file:///C:/Users/Seree/Desktop/temp/index.html#">Terms of Use</a></li>
                                        <li><a href="file:///C:/Users/Seree/Desktop/temp/index.html#">Privacy Policy</a></li>
                                        <li><a href="file:///C:/Users/Seree/Desktop/temp/index.html#">FAQ</a></li>

                                    </ul>
                                </section>
                                <section>
                                    <h4>Follow Us</h4>
                                    <ul className="plain">
                                        <li><a href="file:///C:/Users/Seree/Desktop/temp/index.html#"><i className="icon fa-twitter">&nbsp;</i>Twitter</a></li>
                                        <li><a href="file:///C:/Users/Seree/Desktop/temp/index.html#"><i className="icon fa-facebook">&nbsp;</i>Facebook</a></li>
                                        <li><a href="file:///C:/Users/Seree/Desktop/temp/index.html#"><i className="icon fa-instagram">&nbsp;</i>Google</a></li>
                                        <li></li>
                                    </ul>
                                </section>
                            </div>
                            <div className="copyright">
                                © USA-DV organization is a private entity, USA-DV is not a governmental agency nor is affiliated with the U.S. government. Using the services provided for the Diversity Visa Program online application in dependent on agreeing on the Terms of Use.
        USA-DV is owned and operated by (Company name).
					</div>
                        </div>
                    </footer>
                </React.Fragment>
            </div>

        );
    }
}

export default withStyles(useStyles)(Home);
