import React from 'react';
import { Button, Grid, IconButton, TextField } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import RecursiveForm from '../RecursiveForm/RecursiveForm';
import { Error, Success } from '../../Common/Messages';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: 200,
    width: 300,
    padding: theme.spacing(2)
  },
  objPreview: {
    margin: 'auto'
  },
  buttons: {
    margin: theme.spacing(1)
  }
}));
const EditObjForm = (props) => {
  const classes = useStyles();

  return (
    <Container>
      {props.initialObjs ?
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
          <Button onClick={props.handleDeleteObj}
                  variant="contained"
                  color="secondary"
                  className={classes.buttons}
                  endIcon={<DeleteForeverIcon/>}>Delete</Button>
          <Grid item xs={12}>
            <TextField variant="outlined"
                       size="small"
                       placeholder={'Name'}
                       name={'name'}
                       label={'Name'}
                       value={props.name}
                       onChange={props.handleNameChange}/>
          </Grid>

          <RecursiveForm initialObjs={props.initialObjs} handleChangeParent={props.handleChangeParent}/>

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
            <IconButton onClick={props.handleAddTag} color="primary">
              <AddCircleIcon/>
            </IconButton>
          </Grid>
          <Button type={'submit'}
                  variant="contained"
                  color="primary"
                  className={classes.buttons}
                  onClick={props.handleSubmit}>Save</Button>
        </Grid>
        : <h2>
          Choose an object to display
        </h2>
      }
    </Container>
  );
};

export default EditObjForm;
