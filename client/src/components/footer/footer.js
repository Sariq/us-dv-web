import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'

import '../../home/home.scss'
import './footer.scss';
const logoImage = require('../../assests/images/us-dv-logo.png');
const logoWhiteImage = require('../../assests/images/us-dv-logo-white.png');

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


export default function Footer(props) {
  

    return (
        <footer id="footer">
            <div className="footer-left">
                        {!props.isApllication &&  <div className="apply-now-container">
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
                        </div>}
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
                       <div className="footer-text-container">
                            <div className="text">
                                © USA-DV organization is a private entity, USA-DV is not a governmental agency nor is affiliated with the U.S. government. Using the services provided for the Diversity Visa Program online application in dependent on agreeing on the Terms of Use. USA
                            </div>
                        </div>
                        </div>
                    </footer>
    );
}
