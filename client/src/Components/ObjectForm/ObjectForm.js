import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow,
  TextField
} from '@material-ui/core'
import { renderTextField } from '../../Common/RenderTextFields'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import React from 'react'
import { maxLength, required } from '../../Common/Validators'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { Error, Success } from '../../Common/Messages'
import Parser from 'html-react-parser'
import { Link } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import 'react-quill/dist/quill.snow.css'
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
          <TextField fullWidth variant="outlined" placeholder={'Name'} name={'Name'} label={'Name'}
                     value={props.Name} onChange={props.handleNameChange}/>
        </Grid>
        {/*<TableContainer component={Paper}>*/}
        {/*  <Table className={classes.table}>*/}
        {/*    <TableHead>*/}
        {/*      <TableRow>*/}
        {/*        <TableCell>Keys</TableCell>*/}
        {/*        <TableCell align="right">Values</TableCell>*/}
        {/*      </TableRow>*/}
        {/*    </TableHead>*/}
        {/*    <TableBody>*/}
        {/*      {props.Objects.map((object) => (*/}
        {/*        <TableRow key={object._id}>*/}
        {/*          <TableCell component="th" scope="row">*/}
        {/*            {object.Key}*/}
        {/*          </TableCell>*/}
        {/*          <TableCell align="right">{object.Value.fileName ?*/}
        {/*            <>*/}
        {/*              {object.Value.originalName}*/}
        {/*              <IconButton*/}
        {/*                component={Link}*/}
        {/*                to={{ pathname: process.env.REACT_APP_SERVER_BASE_URL + object.Value.fileName }}*/}
        {/*                target={'_blank'}*/}
        {/*                color="primary">*/}
        {/*                <ExitToAppIcon/>*/}
        {/*              </IconButton>*/}
        {/*            </>*/}
        {/*            : object.Value.name ? object.Value.name : Parser(JSON.stringify(object.Value))}*/}
        {/*            <IconButton*/}
        {/*              // onClick={() => props.handleDeleteField(props.Objects.indexOf(object))}*/}
        {/*              color="primary">*/}
        {/*              <HighlightOffIcon/>*/}
        {/*            </IconButton>*/}
        {/*          </TableCell>*/}
        {/*        </TableRow>*/}
        {/*      ))}*/}
        {/*    </TableBody>*/}
        {/*  </Table>*/}
        {/*</TableContainer>*/}

        <RecursiveForm handleChangeObjects={props.handleChangeObjects} Objects={props.Objects}/>

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
          <TextField fullWidth variant="outlined" placeholder={'Tag'} name={'Tag'} label={'Tag'}
                     value={props.Tag} onChange={props.handleTagChange}/>
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={props.handleAddTag} color="primary">
            <AddCircleIcon/>
          </IconButton>
        </Grid>
        <Button fullWidth type={'submit'} variant="contained" color="primary"
                className={classes.button} onClick={props.handleSubmit}>Save</Button>
      </Grid>
    </Paper>
  )
}

export default ObjectForm
