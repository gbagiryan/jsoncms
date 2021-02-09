import React from "react";
import {Button, Card, CardContent, CardHeader, Grid, makeStyles, Typography} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Parser from 'html-react-parser';
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    paper: {
        minHeight: 200,
        width: 300,
        padding: theme.spacing(2)
    },
    objectPreview: {
        margin: "auto"
    },
    buttons: {
        textAlign: 'right'
    }
}));

const Main = (props) => {
    const classes = useStyles();

    return (
        <div>
            {props.object
                ? <Grid item xs={9} className={classes.objectPreview}>
                    <Card elevation={4}>
                        <div className={classes.buttons}>
                            <Button onClick={props.handleDeleteObject}
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    endIcon={<DeleteForeverIcon/>}>Delete</Button>
                            <Button component={Link} to={`/edit_object/${props.object._id}`} variant="contained"
                                    color="primary" className={classes.button}
                                    endIcon={<EditIcon/>}>Edit</Button>
                        </div>
                        <Card>
                            <CardHeader
                                title={props.object.name}
                            />
                        </Card>
                        <CardContent>
                            <p>Fields</p>
                                {props.object.fields.map((field) => (
                                    <Grid container direction={'column'} spacing={1}>
                                        <Grid item xs={2}>
                                            {field.Key + ' : '}
                                        </Grid>
                                        <Grid item xs={10}>
                                            {field.FileName ?
                                                <Link to={`${field.Value}`}>{field.FileName}</Link>
                                                : field.Value.name ? field.Value.name : Parser(JSON.stringify(field.Value))}
                                        </Grid>
                                    </Grid>
                                ))}
                        </CardContent>
                        <CardContent>
                            <p>Tags</p>
                            <Typography variant="body1" color="primary" component="p">
                                {props.object.tags.map((tag) =>
                                    (props.object.tags.length > 1 ? tag + ', ' : tag)
                                )}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                : <div>
                    Chose an Object to display
                </div>
            }
        </div>
    )
}

export default Main;