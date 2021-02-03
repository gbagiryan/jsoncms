import SideBar from "./SideBar";
import {connect} from "react-redux";
import {objectData} from "../../Redux/Selectors/ObjectSelectors";
import React from "react";

const SideBarContainer = (props) => {

    return (
        <SideBar objects={props.objects}/>
    )
}

const mapStateToProps = (state) => ({
    objects: objectData(state)
});
const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(SideBarContainer);