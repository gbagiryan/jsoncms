import {RegisterReduxForm} from "./Register";
import {signUp} from "../../Redux/Reducers/AuthReducer";
import {connect} from "react-redux";
import React from "react";
import {Redirect} from "react-router-dom";
import {isAuthed} from "../../Redux/Selectors/AuthSelectors";

const RegisterContainer = (props) => {

    const handleSubmit = (formData) => {
        props.signUp(formData.username, formData.password);
    }
    if (props.isAuthed) {
        return <Redirect to={'/'}/>
    }
    return (
        <RegisterReduxForm onSubmit={handleSubmit}/>
    )
}

const mapStateToProps = (state) => ({
    isAuthed: isAuthed(state)
});
const actionCreators = {
    signUp
};

export default connect(mapStateToProps, actionCreators)(RegisterContainer);