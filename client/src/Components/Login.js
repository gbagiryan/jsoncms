import {Grid, makeStyles, Paper, TextField} from "@material-ui/core";

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
        border: '2px solid #3f51b5'
    }
}));
const Login = (props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paperStyle} elevation={8}>
            <form className={classes.form} onSubmit={props.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField required id="outlined-helperText" label="Username"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required id="outlined-helperText" label="Password"/>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
};

export default Login;