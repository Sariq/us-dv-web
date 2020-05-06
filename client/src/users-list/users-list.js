import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import { CircularProgress, FormControl, MenuItem, Select, Checkbox, InputLabel } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle, Button, TablePagination, Grid, TextField, Box } from '@material-ui/core';
import * as AppConstants from "../infra/constants";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import { Collapse, AppBar, Toolbar, Typography, Link } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MobileSideMenu from '../components/mobile-side-menu/mobile-side-menu'
import "./users-list.scss"
const drawerWidth = 240;

const useStyles = theme => ({
  table: {
    minWidth: 650,
    marginTop: 10
  },
  formControl: {
    minWidth: 160,
  },
  checkBox: {
    marginTop: 16
  },
  root: {
   
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
});


@inject('AuthStore', 'UsersStore')
@observer
class UsersList extends Component {
  state = {
    selecteUserId: null,
    openDeleteApplicationDialog: false,
    rowsPerPage: 10,
    applicationStatusFilter: false,
    leadStatusFilter: false,
    "applicationData.applicationStatus": null,
    leadStatus: null
  }
  componentDidMount() {
    this.props.UsersStore.getUsersList(1, this.state.rowsPerPage, this.state.seacrh);
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };
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
  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  editApplication = (userId) => {
    this.props.history.push('/application/' + userId);
  }
  deleteApplication = (userId) => {
    this.setState({ selecteUserId: userId, openDeleteApplicationDialog: true })
  }
  onCloseDeleteApplicationDialog = () => {
    this.setState({ openDeleteApplicationDialog: false });
  }
  deleteApplicationById = () => {
    this.props.UsersStore.deleteApplicationById(this.state.selecteUserId).then(res => this.setState({ openDeleteApplicationDialog: false })
    )
  }
  handleChangePage = (event, newPage) => {
    this.props.UsersStore.getUsersList(newPage + 1, this.state.rowsPerPage, this.state.seacrh);
  };
  handleChangeRowsPerPage = (event) => {
    this.props.UsersStore.getUsersList(1, Number(event.target.value), this.state.seacrh);
    this.setState({ rowsPerPage: Number(event.target.value) })
  };
  handleSearchChange = (value) => {
    this.props.UsersStore.getUsersList(1, this.state.rowsPerPage, value);
    this.setState({ search: value });
  };
  handleApplicationStatusFilter = (flag) => {
    if (!flag) {
      delete this.filterData["applicationData.applicationStatus"];
    }
    this.setState({ applicationStatusFilter: flag });
  }
  handleApplicationFilterChange = (value) => {
    this.setState({ "applicationData.applicationStatus": value });
  }

  handleLeadStatusFilter = (flag) => {
    console.log(flag)
    if (!flag) {
      delete this.filterData.leadStatus;
    }
    this.setState({ leadStatusFilter: flag });
  }
  handleLeadStatusFilterChange = (value) => {
    this.setState({ leadStatus: value });
  }

  filterData = {};
  filterUsersList = () => {
    let applyFilterFlag = false;
    if (this.state.applicationStatusFilter && this.state["applicationData.applicationStatus"]) {
      this.filterData["applicationData.applicationStatus"] = this.state["applicationData.applicationStatus"];
      applyFilterFlag = true;
    }
    if (this.state.leadStatusFilter && this.state.leadStatus) {
      this.filterData.leadStatus = this.state.leadStatus;
      applyFilterFlag = true;
    }
    //if(applyFilterFlag){
    this.props.UsersStore.getUsersList(1, this.state.rowsPerPage, this.state.search, this.filterData);
    //}

  }
  applyFilter = () => {
    this.filterUsersList();
  }
  render() {
    const { classes } = this.props;

    if (!this.props.UsersStore.usersList) {
      return (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>)
    } else {
      console.log(this.props.UsersStore.usersList.users)

    }
    return (
      <div className="users-list-container">
        <div className={classes.root}>
          <MobileSideMenu/>
                    <Grid container justify="flex-start"
            direction="row" spacing={5}>
            <Grid item >
              <TextField
                id="search"
                name="search"
                label="Search"
                autoComplete="search"
                onChange={(event) => this.handleSearchChange(event.target.value)}
              />          </Grid>

            <Grid  item alignItems="flex-end" >
              <Checkbox className={classes.checkBox}
                onChange={(event) => this.handleLeadStatusFilter(event.target.checked)}
                checked={this.state.leadStatusFilter}
                color="primary" name="leadStatus" />

              <FormControl className={`select-input ${classes.formControl}`}>
                <InputLabel id="leadStatus">Lead Status</InputLabel>
                <Select
                  labelId="leadStatus"
                  id="leadStatus"
                  onChange={(event) => this.handleLeadStatusFilterChange(event.target.value)}

                >
                  <MenuItem value="NEW">New</MenuItem>
                  <MenuItem value="NEW_PAID">New Paid</MenuItem>
                  <MenuItem value="CALL_BACK">Call Back</MenuItem>
                  <MenuItem value="NOT_INTERESTED">Not Interested</MenuItem>
                  <MenuItem value="RECALL">Recall</MenuItem>
                  <MenuItem value="PAYMENT">Payment</MenuItem>
                  <MenuItem value="SUCCESSFUL">Successful</MenuItem>
                  <MenuItem value="COLLECTION">Collection</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid  item alignItems="flex-end" >
              <Checkbox className={classes.checkBox}
                onChange={(event) => this.handleApplicationStatusFilter(event.target.checked)}
                checked={this.state.applicationStatusFilter}
                color="primary" name="saveAddress" />
              <FormControl className={`select-input ${classes.formControl}`}>
                <InputLabel id="appluicationStatus">Application Status</InputLabel>

                <Select
                  labelId="appluicationStatus"
                  id="appluicationStatus"
                  onChange={(event) => this.handleApplicationFilterChange(event.target.value)}

                >
                  <MenuItem value="COMPLETED">Completed</MenuItem>
                  <MenuItem value="PENDING">Pending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid  style={{ alignSelf: 'center' }} item alignItems="flex-end">
              <Button variant="contained" onClick={this.applyFilter} color="primary">
                Filter
          </Button>
            </Grid>
          </Grid>
          <TableContainer className={classes.table} component={Paper} >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>User Name</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Lead Status</TableCell>

                  <TableCell align="right">Actions</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.UsersStore.usersList.users.map(row => (
                  <TableRow key={row._id}>
                    <TableCell >{row.userName}</TableCell>
                    <TableCell >{row.registrationData.firstName}</TableCell>
                    <TableCell >{row.registrationData.lastName}</TableCell>
                    <TableCell className={row.applicationData && row.applicationData.applicationStatus}>{row.applicationData && row.applicationData.applicationStatus}</TableCell>
                    <TableCell >
                      <FormControl className={`select-input ${classes.formControl}`}>
                        <Select
                          labelId="leadStatus"
                          id="leadStatus"
                          value={row.leadStatus}
                          onChange={(event) => this.props.UsersStore.handleLeadStatusChange(event.target.value, row._id)}
                        >
                          <MenuItem value="NEW">New</MenuItem>
                          <MenuItem value="NEW_PAID">New Paid</MenuItem>
                          <MenuItem value="CALL_BACK">Call Back</MenuItem>
                          <MenuItem value="NOT_INTERESTED">Not Interested</MenuItem>
                          <MenuItem value="RECALL">Recall</MenuItem>
                          <MenuItem value="PAYMENT">Payment</MenuItem>
                          <MenuItem value="SUCCESSFUL">Successful</MenuItem>
                          <MenuItem value="COLLECTION">Collection</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>

                    <TableCell className="actions-container" align="right">
                      <div onClick={() => this.editApplication(row._id)}><EditIcon color="primary" /></div>
                      <div onClick={() => this.deleteApplication(row._id)}><DeleteIcon color="secondary" /></div>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={this.props.UsersStore.usersList.numOfResults}
            rowsPerPage={this.state.rowsPerPage}
            page={Number(this.props.UsersStore.usersList.currentPage) - 1}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
          {this.state.openDeleteApplicationDialog && <Dialog
            keepMounted aria-labelledby="simple-dialog-title" open={this.state.openDeleteApplicationDialog}
            onClose={() => this.setState({ openDeleteApplicationDialog: false })}

            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="alert-dialog-slide-title">{"Delete Application"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Please Confirm delete application
          </DialogContentText>
            </DialogContent>
            <DialogActions>

              <Button onClick={this.onCloseDeleteApplicationDialog} color="primary">
                Cancel
          </Button>
              <Button onClick={this.deleteApplicationById} color="primary">
                Confirm
          </Button>
            </DialogActions>
          </Dialog>}
        </div>
      </div>

    );
  }
}

export default withStyles(useStyles)(UsersList);