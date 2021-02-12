import { connect } from 'react-redux'
import { addNewObject, sendFile } from '../../Redux/Reducers/ObjectReducer'
import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import { WithAuthRedirect } from '../../Common/WithAuthRedirect'
import { getErrorMsg, getSuccessMsg } from '../../Redux/Selectors/AppSelectors'
import { clearMessages, setErrorMsg } from '../../Redux/Reducers/AppReducer'
import { ObjectReduxForm } from '../ObjectForm/ObjectForm'

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

  const [InnerValue, SetInnerValue] = useState('')
  const [InnerKey, SetInnerKey] = useState('')
  const [InnerFields, SetInnerFields] = useState({})

  const handleInnerValueChange = (e) => {
    SetInnerValue(e.target.value)
  }
  const handleInnerKeyChange = (e) => {
    SetInnerKey(e.target.value)
  }
  const handleAddInnerField = () => {
    if (!InnerKey || !InnerValue) {
      props.setErrorMsg('Key and Value required')
    } else if (InnerFields[InnerKey]) {
      props.setErrorMsg('Keys must be unique')
    } else {
      props.clearMessages()
      SetInnerFields({ ...InnerFields, ...{ [InnerKey]: InnerValue } })
    }
  }
  const handleDeleteInnerField = (keyName) => {
    const { [keyName]: tmp, ...rest } = InnerFields
    SetInnerFields(rest)
  }

  const handleChangeKey = (e) => {
    SetKey(e.target.value)
  }
  const handleChangeValue = (e) => {
    SetValue(e.target.value)
  }
  const handleEditorChange = (value) => {
    SetValue(value)
  }
  const handleUpload = (e) => {
    alert(e.target.files[0])
    const formData = new FormData()
    formData.append('uploadedFile', e.target.files[0])
    props.sendFile(formData)
  }
  const handleChangeType = (event) => {
    SetType(event.target.value)
    SetValue('')
  }
  const handleTagChange = (e) => {
    props.clearMessages()
    SetTag(e.target.value)
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
  const handleDeleteTag = (index) => {
    SetTagsArr(TagsArr.filter((tag) => TagsArr.indexOf(tag) !== index))
  }
  const handleAddField = () => {
    if ((Key && Value) || (Key && InnerValue)) {
      if (!FieldsArr.find((el) => el.Key === Key)) {
        if (Type === 'array') {
          SetFieldsArr([...FieldsArr, { Key, Value: Value.trim().split(',') }])
        } else if (Type === 'object') {
          SetFieldsArr([...FieldsArr, { Key, Value: InnerFields }])
        } else {
          SetFieldsArr([...FieldsArr, { Key, Value }])
        }
      } else {
        props.setErrorMsg('Keys of fields must be unique')
      }
    } else {
      props.setErrorMsg('Key and Value required')
    }
  }
  const handleDeleteField = (index) => {
    SetFieldsArr(FieldsArr.filter((field) => FieldsArr.indexOf(field) !== index))
  }

  const handleSubmit = (form) => {
    props.clearMessages()

    const formData = new FormData()

    formData.append('name', form.name)
    FieldsArr.map(field => {
      if (field.Value.__proto__ === File.prototype) {
        formData.append('fileKey[]', field.Key)
        formData.append('fileValue', field.Value)
      } else {
        formData.append('fields[]', JSON.stringify({ Key: field.Key, Value: field.Value }))
      }
    })
    TagsArr.map(tag => formData.append('tags', tag))
    props.addNewObject(formData)
  }

  return (
    <ObjectReduxForm errorMsg={props.errorMsg} successMsg={props.successMsg} onSubmit={handleSubmit}
                        handleAddTag={handleAddTag} TagsArr={TagsArr} handleTagChange={handleTagChange}
                        handleAddField={handleAddField} FieldsArr={FieldsArr} handleDeleteTag={handleDeleteTag}
                        handleDeleteField={handleDeleteField} Type={Type} handleChangeType={handleChangeType}
                        inputTypes={inputTypes} handleEditorChange={handleEditorChange} handleUpload={handleUpload}
                        Value={Value} handleChangeValue={handleChangeValue} Key={Key}
                        handleChangeKey={handleChangeKey} handleInnerValueChange={handleInnerValueChange}
                        handleInnerKeyChange={handleInnerKeyChange} handleAddInnerField={handleAddInnerField}
                        InnerFields={InnerFields} handleDeleteInnerField={handleDeleteInnerField}/>
  )
}

const mapStateToProps = (state) => ({
  errorMsg: getErrorMsg(state),
  successMsg: getSuccessMsg(state)
})
const actionCreators = {
  addNewObject,
  clearMessages,
  setErrorMsg,
  sendFile
}

export default compose(
  connect(mapStateToProps, actionCreators),
  WithAuthRedirect
)(AddNewObjectContainer)