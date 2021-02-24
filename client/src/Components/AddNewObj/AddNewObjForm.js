import React, { useState } from 'react';
import { Button, Grid, IconButton, TextField } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import RecursiveForm from '../RecursiveForm/RecursiveForm';
import { Error, Success } from '../../Common/Messages';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      marginTop: theme.spacing(3)
    }
  },
  fieldIcons: {
    marginTop: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  },
}));

const AddNewObjForm = (props) => {
  const classes = useStyles();

  const [addClicked, setAddClicked] = useState(false);

  return (
    <Container className={classes.root}>
      <Grid container spacing={2}>
        {props.errorMsg &&
        <Grid item xs={12}>
          <Error errorMsg={props.errorMsg}/>
        </Grid>
        }
        {props.successMsg &&
        <Grid item xs={12}>
          <Success successMsg={props.successMsg}/>
        </Grid>
        }
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            size="small"
            placeholder={'Name'}
            name={'Name'}
            label={'Name'}
            value={props.Name}
            onChange={props.handleNameChange}/>
          <IconButton color="primary"
                      className={classes.fieldIcons}
                      onClick={() => setAddClicked(true)}
          >
            <AddCircleIcon/>
          </IconButton>
        </Grid>

        <RecursiveForm handleChangeParent={props.handleChangeParent} addClicked={addClicked}
                       setAddClicked={setAddClicked}/>

        <Grid item xs={12}>
          {props.tagsArr.map((tag) =>
            <>
              {tag}
              <IconButton onClick={() => props.handleDeleteTag(props.tagsArr.indexOf(tag))}
                          color="primary">
                <HighlightOffIcon/>
              </IconButton>
              {', '}
            </>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined"
                     size="small"
                     placeholder={'Tag'}
                     name={'tag'}
                     label={'Tag'}
                     value={props.tag}
                     onChange={props.handleTagChange}/>
          <IconButton className={classes.fieldIcons} onClick={props.handleAddTag} color="primary">
            <AddCircleIcon/>
          </IconButton>
        </Grid>
        <Button type={'submit'} variant="contained" color="primary"
                className={classes.button} onClick={props.handleSubmit}>Save</Button>
      </Grid>
    </Container>
  );
};

export default AddNewObjForm;
