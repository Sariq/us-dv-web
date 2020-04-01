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
import "./users-list.scss"
const useStyles = theme => ({
    table: {
      minWidth: 650,
      
    },
  });

@inject('AuthStore','UsersStore')
@observer
class UsersList extends Component {
    componentDidMount(){
        this.props.UsersStore.getUsersList();
    }  

    editApplication = (userId) => {
      this.props.UsersStore.usersList = null;
        //this.props.history.push('/application/' + userId);

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
                <TableCell align="right" onClick={() => this.editApplication(row._id)}><div><EditIcon/></div></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>

      );
    }
  }
  
  export default withStyles(useStyles)(UsersList);