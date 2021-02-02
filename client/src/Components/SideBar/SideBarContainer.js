import SideBar from "./SideBar";
import {connect} from "react-redux";
import {postData} from "../../Redux/Selectors/PostSelectors";

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