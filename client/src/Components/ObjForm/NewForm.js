import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Error, Success } from '../../Common/Messages';
import 'react-quill/dist/quill.snow.css';
import RecursiveForm from './RecursiveForm';
import NewRecursiveForm from './NewRecursiveForm';

const useStyles = makeStyles(theme => ({
  form: {
    margin: theme.spacing(2)
  },
  button: {
    margin: '16px auto'
  },
  paperStyle: {
    padding: 20,
    margin: 'auto',
    minHeight: 450,
    width: 600,
    border: '1px solid #3f51b5'
  }
}));

const ObjForm = (props) => {
  const classes = useStyles();

  return (
    <div>
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
          <TextField fullWidth variant="outlined" placeholder={'Name'} name={'Name'} label={'Name'}
                     value={props.Name} onChange={props.handleNameChange}/>
        </Grid>

        <NewRecursiveForm setParentValue={props.setParentValue}/>

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
        <Grid item xs={10}>
          <TextField fullWidth variant="outlined" placeholder={'Tag'} name={'tag'} label={'Tag'}
                     value={props.tag} onChange={props.handleTagChange}/>
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={props.handleAddTag} color="primary">
            <AddCircleIcon/>
          </IconButton>
        </Grid>
        <Button fullWidth type={'submit'} variant="contained" color="primary"
                className={classes.button} onClick={props.handleSubmit}>Save</Button>
      </Grid>
    </div>
  );
};

export default ObjForm;
