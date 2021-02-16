import { compose } from 'redux';
import { WithAuthRedirect } from '../../Common/WithAuthRedirect';
import Main from './Main';
import React from 'react';
import { connect } from 'react-redux';
import { singleObjectData } from '../../Redux/Selectors/ObjectSelectors';
import { deleteObject } from '../../Redux/Reducers/ObjectReducer';

const MainContainer = (props) => {

  const handleDeleteObject = () => {
    props.deleteObject(props.object._id);
  };
console.log(props.object)
  return (
    <Main object={props.object} handleDeleteObject={handleDeleteObject}/>
  );
};

const mapStateToProps = (state) => ({
  object: singleObjectData(state)
});
const actionCreators = {
  deleteObject
};

export default compose(
  connect(mapStateToProps, actionCreators),
  WithAuthRedirect
)(MainContainer);