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
import {Dialog,DialogActions,DialogContentText,DialogContent,DialogTitle, Button} from '@material-ui/core';

import "./users-list.scss"
const useStyles = theme => ({
    table: {
      minWidth: 650,
      
    },
  });

@inject('AuthStore','UsersStore')
@observer
class UsersList extends Component {
  state = {
    selecteUserId:null,
    openDeleteApplicationDialog: false
  }
    componentDidMount(){
        this.props.UsersStore.getUsersList();
    }  

    editApplication = (userId) => {
      this.props.history.push('/application/' + userId);
    }
    deleteApplication = (userId) => {
      this.setState({selecteUserId : userId, openDeleteApplicationDialog:true})
    }
    onCloseDeleteApplicationDialog = () => {
      this.setState({openDeleteApplicationDialog:false});
    }
    deleteApplicationById = () => {
      this.props.UsersStore.deleteApplicationById(this.state.selecteUserId).then(res=>this.setState({openDeleteApplicationDialog:false})
      )
    }
    render() {
        const { classes } = this.props;

          if(!this.props.UsersStore.usersList){
              return (
              <Backdrop className={classes.backdrop} open={true}>
              <CircularProgress color="inherit" />
          </Backdrop>)
          }else{
            console.log( this.props.UsersStore.usersList.users)

          }
      return (
          <div className="users-list-container">

        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell align="right">Actions</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.UsersStore.usersList.users.map(row => (
              <TableRow key={row._id}>
     
                <TableCell >{row.registrationData.firstName}</TableCell>
                <TableCell >{row.registrationData.lastName}</TableCell>
                <TableCell className="actions-container"  align="right">
                  <div onClick={() => this.editApplication(row._id)}><EditIcon/></div>
                  <div onClick={() => this.deleteApplication(row._id)}><DeleteIcon/></div>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      { this.state.openDeleteApplicationDialog && <Dialog
       keepMounted aria-labelledby="simple-dialog-title" open={this.state.openDeleteApplicationDialog}
       onClose={()=>this.setState({openDeleteApplicationDialog:false})}

       aria-labelledby="alert-dialog-slide-title"
       aria-describedby="alert-dialog-slide-description">
                 <DialogTitle id="alert-dialog-slide-title">{"Delete Application"}</DialogTitle>
                 <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please Confirm delete application
          </DialogContentText>
        </DialogContent>
      <DialogActions>
      
          <Button onClick={this.onCloseDeleteApplicationDialog}  color="primary">
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