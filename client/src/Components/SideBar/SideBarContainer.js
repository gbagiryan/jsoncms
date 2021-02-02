import SideBar from "./SideBar";
import {connect} from "react-redux";
import {postData} from "../../Redux/Selectors/PostSelectors";
import React from "react";

const SideBarContainer = (props) => {

    return (
        <SideBar posts={props.posts}/>
    )
}

const mapStateToProps = (state) => ({
    posts: postData(state)
});
const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(SideBarContainer);