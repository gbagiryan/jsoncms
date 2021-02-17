import { compose } from 'redux';
import { WithAuthRedirect } from '../../Common/WithAuthRedirect';
import Main from './Main';
import React from 'react';
import { connect } from 'react-redux';
import { singleObjData } from '../../Redux/Selectors/ObjSelectors';
import { deleteObj } from '../../Redux/Reducers/ObjReducer';

const MainContainer = (props) => {

  const handleDeleteObj = () => {
    props.deleteObj(props.obj._id);
  };
  return (
    <Main obj={props.obj} handleDeleteObj={handleDeleteObj}/>
  );
};

const mapStateToProps = (state) => ({
  obj: singleObjData(state)
});
const actionCreators = {
  deleteObj
};

export default compose(
  connect(mapStateToProps, actionCreators),
  WithAuthRedirect
)(MainContainer);