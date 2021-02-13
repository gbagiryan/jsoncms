import { connect } from 'react-redux'
import { addNewObject } from '../../Redux/Reducers/ObjectReducer'
import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import { WithAuthRedirect } from '../../Common/WithAuthRedirect'
import { getErrorMsg, getSuccessMsg } from '../../Redux/Selectors/AppSelectors'
import { clearMessages, setErrorMsg } from '../../Redux/Reducers/AppReducer'
import { ObjectReduxForm } from '../ObjectForm/ObjectForm'
import Axios from 'axios'

const AddNewObjectContainer = (props) => {

  useEffect(() => {
    return () => {
      props.clearMessages()
    }
  }, [])

  const inputTypes = [
    { value: 'string', label: 'string' },
    { value: 'array', label: 'array' },
    { value: 'object', label: 'object' },
    { value: 'file', label: 'file' },
    { value: 'rich-text', label: 'rich-text' }
  ]

  const [FieldsArr, SetFieldsArr] = useState([])
  const [Tag, SetTag] = useState('')
  const [TagsArr, SetTagsArr] = useState([])
  const [Type, SetType] = useState(inputTypes[0].value)
  const [Key, SetKey] = useState('')
  const [Value, SetValue] = useState('')
  const [UploadProgress, SetUploadProgress] = useState(0)

  const handleChangeKey = (e) => {
    SetKey(e.target.value)
  }
  const handleChangeValue = (e) => {
    SetValue(e.target.value)
  }
  const handleEditorChange = (value) => {
    SetValue(value)
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
    SetValue(uploadedFileName.data)
  }
  const handleChangeType = (event) => {
    SetType(event.target.value)
    SetValue('')
  }
  const handleTagChange = (e) => {
    props.clearMessages()
    SetTag(e.target.value)
  }
  const handleAddField = () => {
    if (Key && Value) {
      if (!FieldsArr.find((el) => el.Key === Key)) {
        SetFieldsArr([...FieldsArr, { Key, Value }])
      } else {
        props.setErrorMsg('Keys of fields must be unique')
      }
    } else {
      props.setErrorMsg('Key and Value required')
    }
  }
  const handleAddTag = () => {
    if (Tag) {
      if (!TagsArr.includes(Tag)) {
        SetTagsArr([...TagsArr, Tag])
      } else {
        props.setErrorMsg('Tags must be unique')
      }
    } else {
      props.setErrorMsg('Tag can\'t be empty')
    }
  }
  const handleDeleteField = (index) => {
    SetFieldsArr(FieldsArr.filter((field) => FieldsArr.indexOf(field) !== index))
  }
  const handleDeleteTag = (index) => {
    SetTagsArr(TagsArr.filter((tag) => TagsArr.indexOf(tag) !== index))
  }

  const handleSubmit = (formData) => {
    props.clearMessages()
    const newObject = {
      name: formData.name,
      fields: FieldsArr,
      tags: TagsArr
    }
    props.addNewObject(newObject)
  }

  return (
    <ObjectReduxForm errorMsg={props.errorMsg} successMsg={props.successMsg} onSubmit={handleSubmit}
                     handleAddTag={handleAddTag} TagsArr={TagsArr} handleTagChange={handleTagChange}
                     handleAddField={handleAddField} FieldsArr={FieldsArr} handleDeleteTag={handleDeleteTag}
                     handleDeleteField={handleDeleteField} Type={Type} handleChangeType={handleChangeType}
                     inputTypes={inputTypes} handleEditorChange={handleEditorChange} handleUpload={handleUpload}
                     Value={Value} handleChangeValue={handleChangeValue} Key={Key}
                     handleChangeKey={handleChangeKey} UploadProgress={UploadProgress}/>
  )
}

const mapStateToProps = (state) => ({
  errorMsg: getErrorMsg(state),
  successMsg: getSuccessMsg(state)
})
const actionCreators = {
  addNewObject,
  clearMessages,
  setErrorMsg
}

export default compose(
  connect(mapStateToProps, actionCreators),
  WithAuthRedirect
)(AddNewObjectContainer)
