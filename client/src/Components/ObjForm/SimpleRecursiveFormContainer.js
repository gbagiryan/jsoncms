import React, { useEffect } from 'react';
import SimpleRecursiveForm from './SimpleRecursiveForm';
import { Button } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  submitButton: {
    margin: theme.spacing(1)
  },
}));
const SimpleRecursiveFormContainer = (props) => {
  const classes = useStyles();

  return (
    <div>
      <SimpleRecursiveForm setParentState={props.setParentState} initialObjs={props.initialObjs}/>
      <Button className={classes.submitButton} type={'submit'} variant="contained" color="primary"
              onClick={props.handleSubmit}>Save</Button>
    </div>
  );
};

export default SimpleRecursiveFormContainer;
