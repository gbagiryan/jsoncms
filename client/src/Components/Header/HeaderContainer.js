import { connect } from 'react-redux';
import Header from './Header';
import { isAuthed } from '../../Redux/Selectors/AuthSelectors';
import { signOut } from '../../Redux/Reducers/AuthReducer';
import React from 'react';
import { setObjectData, setSingleObjectData } from '../../Redux/Reducers/ObjectReducer';

const HeaderContainer = (props) => {

  const handleClick = () => {
    props.signOut();
    props.setObjectData(null);
    props.setSingleObjectData(null);
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
  setObjectData,
  setSingleObjectData
};

export default connect(mapStateToProps, actionCreators)(HeaderContainer);