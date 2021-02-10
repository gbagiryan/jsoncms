import { compose } from 'redux'
import { WithAuthRedirect } from '../../Common/WithAuthRedirect'
import Main from './Main'
import React from 'react'
import { connect } from 'react-redux'
import { singleObjectData } from '../../Redux/Selectors/ObjectSelectors'
import { deleteObject, downloadFile } from '../../Redux/Reducers/ObjectReducer'

const MainContainer = (props) => {

  const handleDownload = (fileName) => {
    props.downloadFile(fileName)
  }

  const handleDeleteObject = () => {
    props.deleteObject(props.object._id)
  }

  return (
    <Main object={props.object} handleDeleteObject={handleDeleteObject} handleDownload={handleDownload}/>
  )
}

const mapStateToProps = (state) => ({
  object: singleObjectData(state)
})
const actionCreators = {
  deleteObject,
  downloadFile
}

export default compose(
  connect(mapStateToProps, actionCreators),
  WithAuthRedirect
)(MainContainer)