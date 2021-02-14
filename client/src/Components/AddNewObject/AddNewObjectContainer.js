import { connect } from 'react-redux'
import { addNewObject } from '../../Redux/Reducers/ObjectReducer'
import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import { WithAuthRedirect } from '../../Common/WithAuthRedirect'
import { getErrorMsg, getSuccessMsg } from '../../Redux/Selectors/AppSelectors'
import { clearMessages, setErrorMsg } from '../../Redux/Reducers/AppReducer'
import RecursiveForm from '../ObjectForm/RecursiveForm'
import { ObjectReduxForm } from '../ObjectForm/ObjectForm'

const AddNewObjectContainer = (props) => {

  useEffect(() => {
    return () => {
      props.clearMessages()
    }
  }, [])

  const [FieldsArr, SetFieldsArr] = useState([])
  const [Tag, SetTag] = useState('')
  const [TagsArr, SetTagsArr] = useState([])

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
  // const handleDeleteField = (index) => {
  //   SetFieldsArr(FieldsArr.filter((field) => FieldsArr.indexOf(field) !== index))
  // }
  // const handleDeleteTag = (index) => {
  //   SetTagsArr(TagsArr.filter((tag) => TagsArr.indexOf(tag) !== index))
  // }

  const handleSubmit = (formData) => {
    props.clearMessages()
    const newObject = {
      name: formData.name,
      fields: FieldsArr,
      tags: TagsArr
    }
    props.addNewObject(newObject)
  }

  const [objects, setObject] = useState([])

  const handleChangeObjects = (SubObjects) => {
    setObject([{ ...SubObjects }])
  }
  console.log(objects)

  return (
    <ObjectReduxForm errorMsg={props.errorMsg} successMsg={props.successMsg} onSubmit={handleSubmit}
                     handleAddTag={handleAddTag} TagsArr={TagsArr} handleTagChange={handleTagChange}
                     FieldsArr={FieldsArr}
                     handleChangeObjects={handleChangeObjects} objects={objects}/>
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
