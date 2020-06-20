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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockIcon from '@material-ui/icons/Lock';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
//const logo = require('../assests/images/us-dv-logo.svg');
const logoImage = require('../assests/images/us-dv-logo.png');

const logoWhiteImage = require('../assests/images/us-dv-logo-white.png');

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
        //width: `calc(100% - ${drawerWidth}px)`,
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

const usefullLinks = [
    { text: "Home", to: "/home" },
    { text: "About Us", to: "/about-us" },
    { text: "Info", to: "/info" },
    { text: "Blog", to: "/blog" },
    { text: "Contact", to: "/contact" },
];
const informationLinks = [
    { text: "Privacy Policy", to: "/privacy-policy" },
    { text: "FAQS", to: "/faq" },
    { text: "Terms of Use", to: "/terms-of-use" }
];

class Home extends React.Component {
  
    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    resize() {
        let currentHideNav = (window.innerWidth <= 1300);
        if (currentHideNav !== this.state.hideNav) {
            this.setState({hideNav: currentHideNav});
        }
    }
    state = {
        open: false,
        subMenuOpen: false,
        hideNav: false
    }
    handleSubItemClick = (data, forceCloseSubMenu) => {
        if (data.subItems) {
            this.setState({ subMenuOpen: !this.state.subMenuOpen })
        } else {
            if (forceCloseSubMenu) {
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
                    <div >
                        <div className="header-container">
                            <div className="info-container">
                                <Container className="info-section">

                                    <div container sm={4} xs={4} direction="row" alignItems="center" item>
                                        <div item>
                                            <PhoneIcon fontSize="small" />
                                        </div>
                                        <div item>
                                            1-888-123-45678
                                                        </div>
                                    </div>
                                    <div container sm={4} xs={4} direction="row" alignItems="center" item>
                                        <div item>
                                            <MailOutlineIcon />
                                        </div>
                                        <div item>
                                            info@demolink.org
                                                        </div>
                                    </div>
                                    <div container sm={4} xs={4} direction="row" alignItems="center" item>
                                        <div item>
                                            <AccessTimeIcon />
                                        </div>
                                        <div item>
                                            08.00 - 18.00
                                                        </div>

                                    </div>


                                </Container>
                            </div>
                            <div className="log-in-out-container">
                                <Container className="log-in-out-section">

                                    <div item>
                                        <PersonAddIcon />
                                    </div>
                                    <div item>
                                        <Link className="link-item contact-us-btn" to="/register">
                                            Sign up
                                                    </Link>
                                    </div>
                                    <div className={"divider"} item>
                                        /
                                                </div>
                                    <div item>
                                        <LockIcon />
                                    </div>
                                    <div item>
                                        <Link className="link-item contact-us-btn" to="/login-page">
                                            Login
                                                    </Link>
                                    </div>


                                </Container>
                            </div>
                            <div className="apply-now-container">
                                <Container className="apply-now-section">
                                    <Grid container>
                                        <Grid container item justify="flex-start" sm={12} direction="row">
                                            <Grid container sm={12} direction="row" alignItems="center" item>
                                                <Grid item>
                                                    <Link className="link-item contact-us-btn" to="/register">
                                                        <Button
                                                        > APPLY NOW</Button>
                                                    </Link>
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Container>
                            </div>
                        </div>

                        <div className="mobile-menu-container">
                            <div className="menu-btn-logo-container">
                                <div>
                                    <img  src={logoImage} alt="" />
                                </div>

                                <div>
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={this.handleDrawerOpen}
                                        edge="start"
                                        className={`${clsx(classes.menuButton, this.state.open && classes.hide)} menu-btn`}
                                    >

                                        <MenuIcon />
                                    </IconButton>
                                </div>
                            </div>
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
                                                    <ListItem button key={data.title} onClick={() => this.handleSubItemClick(data)}>
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
                                                                        <ListItem button className={classes.nested} onClick={() => this.handleSubItemClick(item, true)}>
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

                        <Grid className="home-menu-grid">
                            <HomeMenu goTo={(page) => { this.goTo(page) }} />
                        </Grid>


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
                        <div className="apply-now-container">
                            <div className="text-container">
                                Registration is open, So you
                                Can apply now with Us.
                            </div>
                            <div className="btn-container">
                                <Link className="link-item contact-us-btn" to="/register">
                                    <Button
                                        aria-controls="customized-menu"
                                        aria-haspopup="true"
                                        variant="contained"
                                        color="primary"
                                    > APPLY NOW</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="information">
                            <Grid  container direction="row" alignItems="center" item>
                                <Grid sm={3} item>
                                    <div>
                                        <img src={logoWhiteImage} alt="" />
                                    </div>
                                    <div className="logo-info-container">
                                        <span className="logo-title">USA-DV </span>
                                        <span className="logo-text">
                                            organization
                                            All you need for a green card in one place.
                                        </span>
                                    </div>
                                </Grid>
                                <Grid sm={2} item className="links-list-container">
                                    <div className="usefull-links-container">
                                        <div className="title">
                                            Useful Links
                                        </div>
                                        <div className="list">
                                            {usefullLinks.map((link) =>
                                                <Link className="link-item contact-us-btn" to={link.to}>
                                                    <div className="item">
                                                        <span className="arrow">>>  </span>
                                                        <span className="text">{link.text}</span>
                                                    </div>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid sm={2} item className="links-list-container">
                                    <div className="usefull-links-container">
                                        <div className="title">
                                            Information
                                        </div>
                                        <div className="list">
                                            {informationLinks.map((link) =>
                                                <Link className="link-item contact-us-btn" to={link.to}>
                                                    <div className="item">
                                                        <span className="arrow">>>  </span>
                                                        <span className="text">{link.text}</span>
                                                    </div>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid sm={3} item className="links-list-container">
                                    <div className="contact-us-container">
                                        <div className="title">
                                            Contact Us
                                        </div>

                                        <div className="row">
                                            XXX (Building) New York, NY 00000
                                            United States
                                        </div>
                                        <div className="row">
                                            <span> +1-000-000-0000</span><span className="email">csr@usa-dv.org</span>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                       {!this.state.hideNav && <div className="footer-text-container">
                            <div className="text">
                                © USA-DV organization is a private entity, USA-DV is not a governmental agency nor is affiliated with the U.S. government. Using the services provided for the Diversity Visa Program online application in dependent on agreeing on the Terms of Use. USA
                            </div>
                        </div>}
                        {/* <div className="inner">
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
                        </div> */}
                    </footer>
                </React.Fragment>
            </div >

        );
    }
}

export default withStyles(useStyles)(Home);
