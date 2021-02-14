import React, { useState } from 'react'
import { Grid, IconButton, MenuItem, TextField } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import ReactQuill from 'react-quill'
import ProgressWithPercentage from '../../Common/ProgressWithPercentage'
import Axios from 'axios'

const RecursiveForm = (props) => {
  const inputTypes = [
    { value: 'string', label: 'string' },
    { value: 'array', label: 'array' },
    { value: 'object', label: 'object' },
    { value: 'file', label: 'file' },
    { value: 'rich-text', label: 'rich-text' }
  ]

  const [SubObjects, SetSubObjects] = useState({})
  const [Checkbox, SetCheckbox] = useState(false)
  const [Type, SetType] = useState(inputTypes[0].value)
  const [UploadProgress, SetUploadProgress] = useState(0)

  // const handleEditorChange = (value) => {
  //   SetValue(value)
  // }
  // const handleUpload = async (e) => {
  //   SetUploadProgress(0)
  //   const formData = new FormData()
  //   formData.append('uploadedFile', e.target.files[0])
  //   const uploadedFileName = await Axios.post('/api/posts/uploadFile', formData, {
  //     onUploadProgress: progressEvent => {
  //       const { loaded, total } = progressEvent
  //       SetUploadProgress(Math.floor((loaded * 100) / total))
  //     }
  //   })
  //   SetValue(uploadedFileName.data)
  // }

  const handleChangeType = (event) => {
    SetType(event.target.value)
  }

  const handleChangeInput = (e) => {
    SetSubObjects({ ...SubObjects, [e.target.name]: e.target.value })
  }

  const handleAddSubObject = (SubSubObjects) => {

    SetSubObjects({ ...SubObjects, ...{ Key: SubObjects.Key, Value: SubSubObjects } })
    props.handleChangeObjects(SubObjects)

  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <TextField fullWidth variant="outlined" placeholder={'Key'} name={'Key'} label={'Key'}
                   onChange={handleChangeInput}/>
      </Grid>
      <Grid item xs={2}>
        <TextField
          id="standard-select"
          select
          label="Select"
          value={props.Type}
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
                   onChange={handleChangeInput}/>
      </Grid>
      }
      {Type === 'rich-text'
      &&
      <Grid item xs={12}>
        <ReactQuill value={props.Value} onChange={props.handleEditorChange}/>
      </Grid>
      }
      {Type === 'file'
      &&
      <Grid item xs={12}>
        <div>
          <input type={'file'} name={'upload'} onChange={props.handleUpload}/>
        </div>
        {(props.UploadProgress > 0)
        && <ProgressWithPercentage value={props.UploadProgress}/>
        }
      </Grid>
      }
      {Type === 'object'
      &&
      <div>
        <RecursiveForm SubObjects={SubObjects} handleChangeObjects={handleAddSubObject}
                       inputTypes={inputTypes}/>
      </div>
      }
      {Type === 'array'
      &&
      <div>
        array placeholder
      </div>
      }
    </Grid>
  )
}

export default RecursiveForm
