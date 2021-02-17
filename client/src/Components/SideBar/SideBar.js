import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles, Paper, TextField
} from '@material-ui/core';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link } from 'react-router-dom';
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
  paper: {
    minHeight: '100vh',
  },
  sidebarHead: {
    backgroundColor: '#3f51b5',
    color: 'white'
  }
});

const SideBar = (props) => {
  const classes = useStyles(props);

  return (
    <Paper elevation={4} className={classes.paper}>
      <List>
        <ListItem key={'head'} className={classes.sidebarHead}>
          <ListItemText primary={'My Objects'}/>
        </ListItem>
        <ListItem button key={'addObj'} component={Link} to={'/add_obj'}>
          <ListItemIcon><AddCircleIcon/></ListItemIcon>
          <ListItemText primary={'Add New Object'}/>
        </ListItem>
        <ListItem key={'standard-search'}>
          <TextField id="standard-search" label="Filter by tags" type="search" value={props.SearchField}
                     onChange={props.handleChange}/>
        </ListItem>
        <Divider/>
        {props.objs
          ? props.objs.map((obj) => (
            <MenuItem button onClick={() => props.handleClick(obj._id)} key={obj._id}
                      selected={props.SelectedItem === obj._id}>
              <ListItemIcon><EmojiObjectsIcon/></ListItemIcon>
              <ListItemText primary={obj.name}/>
            </MenuItem>))
          : null}
      </List>
    </Paper>
  );
};

export default SideBar;