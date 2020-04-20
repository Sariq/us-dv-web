import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'

import './home-menu.scss'
const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5'
    },
})((props) => (
    <Menu className="menu-item"
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function HomeMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="home-menu-container">
            <div>
                <Link className="link-item" to="/home">
                    <Button
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        color="primary"

                    >
                        Home
                </Button>
                </Link>
            </div>
            <div>
            <Link className="link-item" to="/home/aboutus">
                <Button
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"

                >
                    About Us
                </Button>
                </Link>
            </div>

            <div>
                <Button
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                >
                    Info <ExpandMoreIcon />
                </Button>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <Link onClick={handleClose} style={{ textDecoration: 'none', color:'#a10532' }} className="link-item" to="/home/about-green-card">
                    <MenuItem className="menu-item">
                        <ListItemText primary="About the Green card" />
                    </MenuItem>
                    </Link>
                    <div style={{  borderTop:'1px solid #a10532' }}></div>
                    <Link onClick={handleClose} style={{ textDecoration: 'none', color:'#a10532' }} className="link-item" to="/home/statistics-eligible-countries">
                    <MenuItem>
                        <ListItemText primary="Statistics and eligible countries" />
                    </MenuItem>
                    </Link>
                    <div style={{  borderTop:'1px solid #a10532' }}></div>
                    <Link onClick={handleClose} style={{ textDecoration: 'none', color:'#a10532' }} className="link-item" to="/home/faq">
                    <MenuItem>
                        <ListItemText primary="FAQ" />
                    </MenuItem>
                    </Link>
                </StyledMenu>
            </div>
        </div>
    );
}
