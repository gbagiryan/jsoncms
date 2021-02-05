import {Button, Grid, IconButton, makeStyles, MenuItem, Paper, TextField, Typography} from "@material-ui/core";
import {Field, reduxForm} from "redux-form";
import {renderTextField} from "../../Common/RenderTextFields";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import React from "react";
import {maxLength, required} from "../../Common/Validators";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {Error, Success} from "../../Common/Messages";
import ReactQuill from "react-quill";
import {renderFileInput} from "../../Common/renderFileInput";

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
        width: 600,
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
                        <Field fullWidth placeholder={'Name'} name={'name'} component={renderTextField}
                               label={'Name'} validate={[required, maxLength20]}/>
                    </Grid>
                    <Grid item xs={12}>
                        {props.FieldsArr.map((field) =>
                            <div>
                                {field.Key + ':' + field.Value}
                                <IconButton onClick={() => props.handleDeleteField(props.FieldsArr.indexOf(field))}
                                            color="primary">
                                    <HighlightOffIcon/>
                                </IconButton>
                            </div>
                        )}
                    </Grid>
                    <Grid item xs={8}>
                        <Field fullWidth placeholder={'Key'} name={'key'} component={renderTextField}
                               label={'Key'} onChange={props.handleChangeKey}/>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="standard-select"
                            select
                            label="Select"
                            value={props.Type}
                            onChange={props.handleChangeType}
                            helperText="Select type"
                        >
                            {props.inputTypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton onClick={props.handleAddField} color="primary">
                            <AddCircleIcon/>
                        </IconButton>
                    </Grid>
                    {props.Type === 'string'
                    &&
                    <Grid item xs={12}>
                        <Field fullWidth placeholder={'Value'} name={'value'} component={renderTextField}
                               label={'Value'} onChange={props.handleChangeValue}/>
                    </Grid>
                    }
                    {props.Type === 'rich-text'
                    &&
                    <Grid item xs={12}>
                        <ReactQuill value={props.Value} onChange={props.handleEditorChange}/>
                    </Grid>
                    }
                    {props.Type === 'file'
                    &&
                    <Grid item xs={12}>
                        <div>
                            <Field name={'upload'} type={'file'} component={renderFileInput}
                                   handleUpload={props.handleUpload}/>
                        </div>
                    </Grid>
                    }
                    <Grid item xs={12}>
                        {props.TagsArr.map((tag) =>
                            <>
                                {tag}
                                <IconButton onClick={() => props.handleDeleteTag(props.TagsArr.indexOf(tag))}
                                            color="primary">
                                    <HighlightOffIcon/>
                                </IconButton>
                                {', '}
                            </>
                        )}
                    </Grid>
                    <Grid item xs={10}>
                        <Field fullWidth placeholder={'Tag'} name={'tag'} component={renderTextField}
                               label={'Tag'} onChange={props.handleTagChange}/>
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