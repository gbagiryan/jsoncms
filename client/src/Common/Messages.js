import { makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2),
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export const Error = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert variant="outlined" severity="error">{props.errorMsg}</Alert>
    </div>
  );
};

export const Success = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert variant="outlined" severity="success">{props.successMsg}</Alert>
    </div>
  );
};
