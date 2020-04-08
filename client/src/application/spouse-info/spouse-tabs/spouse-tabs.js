import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { inject, observer } from "mobx-react";
import {withStyles} from '@material-ui/core';

class TabPanel extends Component {

  render(){
    const { children, value, index, ...other } = this.props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )};
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = (theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

@inject('registrationStore')
@observer
class ScrollableTabsButtonAuto extends Component {
  handleChange = (event, newValue) => {
    this.props.registrationStore.activeSubObj = this.props.tabs[newValue].subObj;
    this.props.registrationStore.spouseInfoActiveTab = newValue;
    console.log(newValue)

  };
  componentDidMount(){
    console.log(this.props.registrationStore.spouseInfoActiveTab)
    this.props.registrationStore.activeSubObj = this.props.tabs[this.props.registrationStore.spouseInfoActiveTab].subObj;
  }
render(){
  const { classes } = this.props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={this.props.registrationStore.spouseInfoActiveTab}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {this.props.tabs.map((tab, i) => {
            return <Tab key={i} label={tab.title} {...a11yProps(i)} />
          })}
        </Tabs>
      </AppBar>
      {this.props.tabs.map((tab, i) => {
        return <TabPanel key={i}  value={this.props.registrationStore.spouseInfoActiveTab} index={i}>
          {tab.cmp}
        </TabPanel>
      })}
    </div>
  )};
}
export default withStyles(useStyles)(ScrollableTabsButtonAuto);
