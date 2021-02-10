import React from 'react'
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
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Parser from 'html-react-parser'
import { Link } from 'react-router-dom'
import GetAppIcon from '@material-ui/icons/GetApp'

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
}))

const Main = (props) => {
  const classes = useStyles()

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
                    {props.object.fields.map((field) => (
                      <TableRow key={field._id}>
                        <TableCell component="th" scope="row">
                          {field.Key}
                        </TableCell>
                        <TableCell align="right">{field.FileName ?
                          <div>
                            {field.FileName}
                            <IconButton
                              onClick={() => props.handleDownload(field.Value)}
                              color="primary">
                              <GetAppIcon/>
                            </IconButton>
                          </div>
                          : field.Value.name ? field.Value.name : Parser(JSON.stringify(field.Value))}
                        </TableCell>
                      </TableRow>
                    ))}
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
  )
}

export default Main