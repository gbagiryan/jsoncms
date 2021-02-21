import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid, IconButton,
  makeStyles,
  Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  Typography
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RecursiveMain from './RecursiveMain';

const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: 200,
    width: 300,
    padding: theme.spacing(2)
  },
  objPreview: {
    margin: 'auto'
  },
  buttons: {
    textAlign: 'right'
  }
}));

const Main = (props) => {
  const classes = useStyles();

  return (
    <div>
      {props.obj
        ? <Grid item xs={9} className={classes.objPreview}>
          <Card elevation={4}>
            <div className={classes.buttons}>
              <Button onClick={props.handleDeleteObj}
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      endIcon={<DeleteForeverIcon/>}>Delete</Button>
              <Button component={Link} to={`/edit_obj/${props.obj._id}`} variant="contained"
                      color="primary" className={classes.button}
                      endIcon={<EditIcon/>}>Edit</Button>
            </div>
            <Card>
              <CardHeader
                title={props.obj.name}
              />
            </Card>

            <RecursiveMain setParentState={props.setParentState} objs={props.obj.objs}/>

            <CardContent>
              <p>Tags</p>
              <Typography variant="body1" color="primary" component="p">
                {props.obj.tags.map((tag) =>
                  (props.obj.tags.length > 1 ? tag + ', ' : tag)
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
  );
};

export default Main;
