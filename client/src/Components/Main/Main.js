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
              <Button onClick={props.handleDeleteObject}
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
            <CardContent>
              <TableContainer component={Paper}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Keys</TableCell>
                      <TableCell align="right">Values</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(props.obj.objs).map((obj, i) =>
                      <TableRow key={obj}>
                        <TableCell component="th" scope="row">
                          {obj}
                        </TableCell>
                        <TableCell align="right">{props.obj.objs[obj].fileName ?
                          <div>
                            {props.obj.objs[obj].originalName}
                            <IconButton
                              component={Link}
                              to={{ pathname: process.env.REACT_APP_SERVER_BASE_URL + props.obj.objs[obj].fileName }}
                              target={'_blank'}
                              color="primary">
                              <ExitToAppIcon/>
                            </IconButton>
                          </div>
                          : props.obj.objs[obj].name ? props.obj.objs[obj].name : Parser(JSON.stringify(props.obj.objs[obj]))}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
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
