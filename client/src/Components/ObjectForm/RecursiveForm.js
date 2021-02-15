import React, { useState } from 'react'
import {
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  Paper,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead, TableRow,
  TextField
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import ReactQuill from 'react-quill'
import ProgressWithPercentage from '../../Common/ProgressWithPercentage'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Parser from 'html-react-parser'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

const useStyles = makeStyles(theme => ({
  paperStyle: {
    padding: 20,
    margin: 'auto',
    width: 600,
    border: '1px solid #3f51b5'
  }
}))

const RecursiveForm = (props) => {
  const classes = useStyles()

  const inputTypes = [
    { value: 'string', label: 'string' },
    { value: 'array', label: 'array' },
    { value: 'object', label: 'object' },
    { value: 'file', label: 'file' },
    { value: 'rich-text', label: 'rich-text' }
  ]

  const [SubObjects, SetSubObjects] = useState({})
  const [SubObjectKey, SetSubObjectKey] = useState('')
  const [SubObjectValue, SetSubObjectValue] = useState('')

  const [Type, SetType] = useState(inputTypes[0].value)
  const [UploadProgress, SetUploadProgress] = useState(0)

  const handleChangeKey = (e) => {
    SetSubObjectKey(e.target.value)
  }
  const handleChangeValue = (e) => {
    SetSubObjectValue(e.target.value)
  }
  const handleAddSubObject = () => {
    SetSubObjects({ ...SubObjects, ...{ [SubObjectKey]: SubObjectValue } })
    props.parentCallback(SubObjects)
  }
  const parentCallback = (SubSubObjects) => {
    SetSubObjects({ ...SubObjects, ...{ [SubObjectKey]: SubSubObjects } })
  }
  const handleUpload = async (e) => {
    SetUploadProgress(0)
    const formData = new FormData()
    formData.append('uploadedFile', e.target.files[0])
    const uploadedFileName = await Axios.post('/api/posts/uploadFile', formData, {
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent
        SetUploadProgress(Math.floor((loaded * 100) / total))
      }
    })
    SetSubObjectValue(uploadedFileName.data)
  }

  const handleChangeType = (event) => {
    SetType(event.target.value)
  }

  return (
    <Paper className={classes.paperStyle} elevation={8}>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Keys</TableCell>
              <TableCell align="right">Values</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(SubObjects).map((subObject, i) =>
              <TableRow key={subObject}>
                <TableCell component="th" scope="row">
                  {subObject}
                </TableCell>
                <TableCell align="right">{SubObjects[subObject].fileName ?
                  <>
                    {SubObjects[subObject].originalName}
                    <IconButton
                      component={Link}
                      to={{ pathname: process.env.REACT_APP_SERVER_BASE_URL + SubObjects[subObject].fileName }}
                      target={'_blank'}
                      color="primary">
                      <ExitToAppIcon/>
                    </IconButton>
                  </>
                  : SubObjects[subObject].name ? SubObjects[subObject].name : Parser(JSON.stringify(SubObjects[subObject]))}
                  <IconButton
                    // onClick={() => props.handleDeleteField(props.Objects.indexOf(object))}
                    color="primary">
                    <HighlightOffIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField fullWidth variant="outlined" placeholder={'Key'} name={'Key'} label={'Key'}
                     value={SubObjectKey} onChange={handleChangeKey}/>
        </Grid>
        <Grid item xs={2}>
          <TextField
            id="standard-select"
            select
            label="Select"
            value={Type}
            onChange={handleChangeType}
            helperText="Select type"
          >
            {inputTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={handleAddSubObject} color="primary">
            <AddCircleIcon/>
          </IconButton>
        </Grid>
        {Type === 'string'
        &&
        <Grid item xs={12}>
          <TextField fullWidth variant="outlined" placeholder={'Value'} name={'Value'} label={'Value'}
                     value={SubObjectValue} onChange={handleChangeValue}/>
        </Grid>
        }
        {Type === 'rich-text'
        &&
        <Grid item xs={12}>
          <ReactQuill value={props.Value} onChange={html => handleChangeValue({ target: { value: html } })}/>
        </Grid>
        }
        {Type === 'file'
        &&
        <Grid item xs={12}>
          <div>
            <input type={'file'} name={'upload'} onChange={handleUpload}/>
          </div>
          {(UploadProgress > 0)
          && <ProgressWithPercentage value={UploadProgress}/>
          }
        </Grid>
        }
        {Type === 'object'
        &&
        <div>
          <RecursiveForm parentCallback={parentCallback}/>
        </div>
        }
        {Type === 'array'
        &&
        <div>
          array placeholder
        </div>
        }
      </Grid>
    </Paper>
  )
}

export default RecursiveForm
