import React from 'react';
import { Button } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import EditRecursiveForm from './EditRecursiveForm';

const useStyles = makeStyles(theme => ({
  submitButton: {
    margin: theme.spacing(1)
  },
}));
const EditForm = (props) => {
  const classes = useStyles();

  return (
    <div>
      <EditRecursiveForm initialObjs={props.initialObjs} handleChangeParent={props.handleChangeParent}/>
      <Button className={classes.submitButton} type={'submit'} variant="contained" color="primary"
              onClick={props.handleSubmit}>Save</Button>
    </div>
  );
};

export default EditForm;
