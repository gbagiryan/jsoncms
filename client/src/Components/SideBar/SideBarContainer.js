import SideBar from "./SideBar";
import {connect} from "react-redux";
import {objectData} from "../../Redux/Selectors/ObjectSelectors";
import React, {useState} from "react";
import {fetchAnObject, getObjectsByTag} from "../../Redux/Reducers/ObjectReducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

const SideBarContainer = (props) => {

    const [SearchField, SetSearchField] = useState('');
    const [FilteredObjects, SetFilteredObjects] = useState([]);

    const handleChange = (e) => {
        SetSearchField(e.target.value);
        const filteredObjects = props.objects.filter((obj) => obj.tags.includes(e.target.value));
        SetFilteredObjects(filteredObjects);
    }

    const handleClick = (objectId) => {
        props.fetchAnObject(objectId);
        props.history.push("/");
    }

    return (
        <SideBar objects={SearchField.length > 0 ? FilteredObjects : props.objects} handleClick={handleClick}
                 SearchField={SearchField} handleChange={handleChange}/>
    )
}

const mapStateToProps = (state) => ({
    objects: objectData(state)
});
const actionCreators = {
    fetchAnObject,
    getObjectsByTag
};

export default compose(
    withRouter,
    connect(mapStateToProps, actionCreators)
)(SideBarContainer);