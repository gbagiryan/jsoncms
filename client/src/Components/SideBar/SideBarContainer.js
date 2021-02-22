import SideBar from './SideBar';
import { connect } from 'react-redux';
import { getObjData } from '../../Redux/Selectors/ObjSelectors';
import React, { useState } from 'react';
import { getObjsByTag, setSingleObjData } from '../../Redux/Reducers/ObjReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

const SideBarContainer = (props) => {

  const [SearchField, SetSearchField] = useState('');
  const [FilteredObjs, SetFilteredObjs] = useState([]);
  const [SelectedItem, SetSelectedItem] = useState('');

  const handleChange = (e) => {
    SetSearchField(e.target.value);
    const filteredObjs = props.objs.filter((obj) => obj.tags.includes(e.target.value));
    SetFilteredObjs(filteredObjs);
  };

  const handleClick = (objId) => {
    SetSelectedItem(objId);
    props.setSingleObjData(props.objs.find((obj) => obj._id === objId));
    props.history.push('/');
  };

  return (
    <SideBar objs={SearchField.length > 0 ? FilteredObjs : props.objs} handleClick={handleClick}
             SearchField={SearchField} handleChange={handleChange} SelectedItem={SelectedItem}/>
  );
};

const mapStateToProps = (state) => ({
  objs: getObjData(state)
});
const actionCreators = {
  getObjsByTag,
  setSingleObjData
};

export default compose(
  withRouter,
  connect(mapStateToProps, actionCreators)
)(SideBarContainer);