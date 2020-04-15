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
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle, Button, TablePagination, Grid, TextField,Box } from '@material-ui/core';

import "./users-list.scss"
const useStyles = theme => ({
  table: {
    minWidth: 650,
    marginTop:10
  },
});


@inject('AuthStore', 'UsersStore')
@observer
class UsersList extends Component {
  state = {
    selecteUserId: null,
    openDeleteApplicationDialog: false,
    rowsPerPage: 10,
    seacrh: ""
  }
  componentDidMount() {
    this.props.UsersStore.getUsersList(1, this.state.rowsPerPage, this.state.seacrh);
  }

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
        <Grid container justify="flex-start" m={2}
          alignItems="flex-start" direction="row" spacing={5}>
          <Grid item  >
            <TextField

              id="search"
              name="search"
              label="Search"
              autoComplete="search"
              onChange={(event) => this.handleSearchChange(event.target.value)}
            />
          </Grid>
        </Grid>
          <TableContainer className={classes.table} component={Paper}>
            <Table  aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Status</TableCell>

                  <TableCell align="right">Actions</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.UsersStore.usersList.users.map(row => (
                  <TableRow key={row._id}>

                    <TableCell >{row.registrationData.firstName}</TableCell>
                    <TableCell >{row.registrationData.lastName}</TableCell>
                    <TableCell className={row.applicationData && row.applicationData.isApplicationCompleted ? "completed" : "pending"}>{row.applicationData && row.applicationData.isApplicationCompleted ? "Completed" : "Pending"}</TableCell>

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

    );
  }
}

export default withStyles(useStyles)(UsersList);