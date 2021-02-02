import {Button, Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import {Field, reduxForm} from "redux-form";
import {renderTextField} from "../../Common/RenderTextFields";
import React from "react";

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
            <form className={classes.form} onSubmit={props.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Field fullWidth placeholder={'Username'} name={'username'} component={renderTextField}
                               label={'Username'}
                               type="username"/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field fullWidth placeholder={'Password'} name={'password'} component={renderTextField}
                               label={'Password'}
                               type="password"/>
                    </Grid>
                    <Button fullWidth type={"submit"} variant="contained" color="primary"
                            className={classes.button}>Login</Button>
                </Grid>
            </form>
        </Paper>
    )
};

export const LoginReduxForm = reduxForm({form: 'login'})(Login);