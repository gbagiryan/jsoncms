import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { renderTextField } from '../../Common/RenderTextFields';
import React from 'react';
import { minLength, passwordsMatch, required } from '../../Common/Validators';
import { Error, Success } from '../../Common/Messages';

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

const minLength6 = minLength(6);

const Register = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paperStyle} elevation={8}>
      <Typography>Register</Typography>
      <form className={classes.form} onSubmit={props.handleSubmit}>
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
            <Field fullWidth placeholder={'Username'} name={'username'} component={renderTextField}
                   label={'Username'}
                   type="username" validate={[required]}/>
          </Grid>
          <Grid item xs={12}>
            <Field fullWidth placeholder={'Password'} name={'password'} component={renderTextField}
                   label={'Password'}
                   type="password" validate={[required, minLength6]}/>
          </Grid>
          <Grid item xs={12}>
            <Field fullWidth placeholder={'Confirm Password'} name={'password2'} component={renderTextField}
                   label={'Confirm Password'}
                   type="password" validate={[required, passwordsMatch]}/>
          </Grid>
          <Button fullWidth type={'submit'} variant="contained" color="primary"
                  className={classes.button}>Register</Button>
        </Grid>
      </form>
    </Paper>
  );
};

export const RegisterReduxForm = reduxForm({ form: 'register' })(Register);