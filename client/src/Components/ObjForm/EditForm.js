import React from 'react';
import { Button, Grid, IconButton, TextField } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import EditRecursiveForm from './EditRecursiveForm';
import { Error, Success } from '../../Common/Messages';
import NewRecursiveForm from './NewRecursiveForm';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles(theme => ({
  submitButton: {
    margin: theme.spacing(1)
  },
}));
const EditForm = (props) => {
  const classes = useStyles();

  return (
    <div>
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
          <Grid item xs={12}>
            <TextField fullWidth variant="outlined" placeholder={'Name'} name={'Name'} label={'Name'}
                       value={props.Name} onChange={props.handleNameChange}/>
          </Grid>

          <EditRecursiveForm initialObjs={props.initialObjs} handleChangeParent={props.handleChangeParent}/>

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
        : <div>
          <h2>Choose an object to display</h2>
        </div>
      }
    </div>
    // <div>
    //   {props.initialObjs ?
    //     <div>
    //       <EditRecursiveForm initialObjs={props.initialObjs} handleChangeParent={props.handleChangeParent}/>
    //       <Button className={classes.submitButton} type={'submit'} variant="contained" color="primary"
    //               onClick={props.handleSubmit}>Save</Button>
    //     </div>
    //     : <div>
    //       <h2>Choose an object to display</h2>
    //     </div>
    //   }
    // </div>
  );
};

export default EditForm;
