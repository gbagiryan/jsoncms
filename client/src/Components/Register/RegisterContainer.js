import {RegisterReduxForm} from "./Register";
import {signUp} from "../../Redux/Reducers/AuthReducer";
import {connect} from "react-redux";

const RegisterContainer = (props) => {

    const handleSubmit = (formData) => {
        props.signUp(formData.username, formData.password);
    }
    return (
        <RegisterReduxForm onSubmit={handleSubmit}/>
    )
}

const mapStateToProps = (state) => ({})
const actionCreators = {
    signUp
}

export default connect(mapStateToProps, actionCreators)(RegisterContainer);