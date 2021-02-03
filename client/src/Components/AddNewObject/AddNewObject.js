import {Button, Grid, IconButton, makeStyles, Paper, Typography} from "@material-ui/core";
import {Field, reduxForm} from "redux-form";
import {renderTextField} from "../../Common/RenderTextFields";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import React from "react";
import {maxLength, required} from "../../Common/Validators";

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

const maxLength20 = maxLength(20);

const AddNewObject = (props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paperStyle} elevation={8}>
            <Typography>Add New Object</Typography>
            <form className={classes.form} onSubmit={props.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Field fullWidth placeholder={'Name'} name={'name'} component={renderTextField}
                               label={'Name'} validate={[required, maxLength20]}/>
                    </Grid>
                    <Grid item xs={12}>
                        {props.FieldsArr.map((field) =>
                            <p>{field.key + ':' + field.value}</p>
                        )}
                    </Grid>
                    <Grid item xs={5}>
                        <Field fullWidth placeholder={'Key'} name={'key'} component={renderTextField}
                               label={'Key'} onChange={props.handleFieldChange} validate={[required]}/>
                    </Grid>
                    <Grid item xs={5}>
                        <Field fullWidth placeholder={'Value'} name={'value'} component={renderTextField}
                               label={'Value'} onChange={props.handleFieldChange} validate={[required]}/>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton onClick={props.handleAddField} color="primary">
                            <AddCircleIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        {props.TagsArr.map((tag) =>
                            tag + ', '
                        )}
                    </Grid>
                    <Grid item xs={10}>
                        <Field fullWidth placeholder={'Tag'} name={'tag'} component={renderTextField}
                               label={'Tag'} onChange={props.handleTagChange} validate={[required]}/>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton onClick={props.handleAddTag} color="primary">
                            <AddCircleIcon/>
                        </IconButton>
                    </Grid>
                    <Button fullWidth type={"submit"} variant="contained" color="primary"
                            className={classes.button}>Add</Button>
                </Grid>
            </form>
        </Paper>
    )
}

export const AddObjectReduxForm = reduxForm({form: 'addObject'})(AddNewObject);