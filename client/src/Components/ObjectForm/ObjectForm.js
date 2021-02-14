import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  Paper,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow,
  TextField,
  Typography
} from '@material-ui/core'
import { Field, reduxForm } from 'redux-form'
import { renderTextField } from '../../Common/RenderTextFields'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import React from 'react'
import { maxLength, required } from '../../Common/Validators'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { Error, Success } from '../../Common/Messages'
import { renderFileInput } from '../../Common/renderFileInput'
import Parser from 'html-react-parser'
import { Link } from 'react-router-dom'
import ProgressWithPercentage from '../../Common/ProgressWithPercentage'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css";
import RecursiveForm from './RecursiveForm'

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
}))

const maxLength20 = maxLength(20)

const ObjectForm = (props) => {
  const classes = useStyles()

  return (
    <Paper className={classes.paperStyle} elevation={8}>
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
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Keys</TableCell>
                  <TableCell align="right">Values</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.FieldsArr.map((field) => (
                  <TableRow key={field._id}>
                    <TableCell component="th" scope="row">
                      {field.Key}
                    </TableCell>
                    <TableCell align="right">{field.Value.fileName ?
                      <>
                        {field.Value.originalName}
                        <IconButton
                          component={Link}
                          to={{ pathname: process.env.REACT_APP_SERVER_BASE_URL + field.Value.fileName }}
                          target={'_blank'}
                          color="primary">
                          <ExitToAppIcon/>
                        </IconButton>
                      </>
                      : field.Value.name ? field.Value.name : Parser(JSON.stringify(field.Value))}
                      <IconButton
                        onClick={() => props.handleDeleteField(props.FieldsArr.indexOf(field))}
                        color="primary">
                        <HighlightOffIcon/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <RecursiveForm handleChangeObjects={props.handleChangeObjects} objects={props.objects}/>

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
          <Button fullWidth type={'submit'} variant="contained" color="primary"
                  className={classes.button}>Save</Button>
        </Grid>
      </form>
    </Paper>
  )
}

export const ObjectReduxForm = reduxForm({ form: 'objectForm' })(ObjectForm)
