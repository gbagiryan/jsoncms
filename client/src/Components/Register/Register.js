import { Button, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { Error, Success } from '../../Common/Messages';
import { minLength, passwordsMatch, requiredField } from '../../Common/Validators';

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

const Register = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paperStyle} elevation={8}>
      <Typography>Register</Typography>
      <div className={classes.form}>
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
            <TextField fullWidth
                       variant="outlined"
                       placeholder={'Username'}
                       name={'username'}
                       label={'Username'}
                       value={props.inputs.username}
                       error={props.invalidFields.username && props.invalidFields.username[0]}
                       helperText={props.invalidFields.username && props.invalidFields.username[0]}
                       onBlur={(event) => props.validate(event, 'Username', [requiredField])}
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
                       error={props.invalidFields.password && props.invalidFields.password[0]}
                       helperText={props.invalidFields.password && props.invalidFields.password[0]}
                       onBlur={(event) => props.validate(event, 'Password', [requiredField, minLength])}
                       onChange={props.handleInput}/>
          </Grid>
          <Button fullWidth
                  variant="contained"
                  color="primary"
                  onClick={props.handleSubmit}
                  className={classes.button}>Register</Button>
        </Grid>
      </div>
    </Paper>
  );
};

export default Register;
