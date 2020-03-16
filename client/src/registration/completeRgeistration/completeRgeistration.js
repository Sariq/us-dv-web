import React from 'react';
import Typography from '@material-ui/core/Typography';
import AuthStore from '../../stores/AuthStore'
import Button from '@material-ui/core/Button';
import './completeRgeistration.scss'

export default function CompleteRgeistration({ props }) {
  const login = () => {
    AuthStore.login();
  }
  return (
    <React.Fragment>
      <div className="complete-registration-container">
        <Typography variant="h5" gutterBottom>
          Registration Completed!
          <div>User Name : <span className="password-text">{props.AuthStore.authData && props.AuthStore.authData.user.userName}</span></div>

          <div>Password : <span className="password-text">{props.AuthStore.authData && props.AuthStore.authData.user.password}</span></div>
        </Typography>
        <Typography variant="subtitle1">
          Register your application for the Diversity visa – 1 year
    </Typography>
        <Typography variant="subtitle1">
          35$
    </Typography>
        <Button onClick={login}>
          Back
                    </Button>
      </div>
    </React.Fragment>
  );
}