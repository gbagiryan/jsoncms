import { connect } from 'react-redux';
import Header from './Header';
import { isAuthed } from '../../Redux/Selectors/AuthSelectors';
import { signOut } from '../../Redux/Reducers/AuthReducer';
import React from 'react';
import { setObjData, setSingleObjData } from '../../Redux/Reducers/ObjReducer';

const HeaderContainer = (props) => {

  const handleClick = () => {
    props.signOut();
    props.setObjData(null);
    props.setSingleObjData(null);
  };

  return (
    <Header handleClick={handleClick} isAuthed={props.isAuthed}/>
  );
};

const mapStateToProps = (state) => ({
  isAuthed: isAuthed(state)
});
const actionCreators = {
  signOut,
  setObjData,
  setSingleObjData
};

export default connect(mapStateToProps, actionCreators)(HeaderContainer);