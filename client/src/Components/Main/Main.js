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
  objectPreview: {
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
              <TableContainer component={Paper}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Keys</TableCell>
                      <TableCell align="right">Values</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(props.object.fields).map((field, i) =>
                      <TableRow key={field}>
                        <TableCell component="th" scope="row">
                          {field}
                        </TableCell>
                        <TableCell align="right">{props.object.fields[field].fileName ?
                          <div>
                            {props.object.fields[field].originalName}
                            <IconButton
                              component={Link}
                              to={{ pathname: process.env.REACT_APP_SERVER_BASE_URL + props.object.fields[field].fileName }}
                              target={'_blank'}
                              color="primary">
                              <ExitToAppIcon/>
                            </IconButton>
                          </div>
                          : props.object.fields[field].name ? props.object.fields[field].name : Parser(JSON.stringify(props.object.fields[field]))}
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
  );
};

export default Main;
