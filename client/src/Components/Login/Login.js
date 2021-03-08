import { Button, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { Error, Success } from '../../Common/Messages';
import { minLength, requiredField } from '../../Common/Validators';

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
    width: 350,
    border: '1px solid #3f51b5'
  }
}));
const Login = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paperStyle} elevation={8}>
      <Typography>Login</Typography>
      <div className={classes.form}>
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth
                       variant="outlined"
                       placeholder={'Username'}
                       name={'username'}
                       label={'Username'}
                       value={props.inputs.username}
                       onChange={props.handleInput}/>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth
                       variant="outlined"
                       placeholder={'Password'}
                       name={'password'}
                       label={'Password'}
                       type="password"
                       value={props.inputs.password}
                       onChange={props.handleInput}/>
          </Grid>
          <Button fullWidth
                  variant="contained"
                  color="primary"
                  onClick={props.handleSubmit}
                  className={classes.button}>Log in</Button>
        </Grid>
      </div>
    </Paper>
  );
};

export default Login;
