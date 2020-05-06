import React from 'react';
import "./mobile-side-menu.scss"
import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core';

import { Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
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



class MobileSideMenu extends React.Component {
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
    render(){
        const { classes } = this.props;

        return(
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
                {[{ title: 'Users List', page: '/users-list' }]
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

        )
    }
}
export default withStyles(useStyles)(MobileSideMenu);
