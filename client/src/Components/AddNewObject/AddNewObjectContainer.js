import {connect} from "react-redux";
import {AddObjectReduxForm} from "./AddNewObject";
import {addNewObject} from "../../Redux/Reducers/ObjectReducer";
import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";
import {getErrorMsg, getSuccessMsg} from "../../Redux/Selectors/AppSelectors";
import {clearMessages} from "../../Redux/Reducers/AppReducer";

const AddNewObjectContainer = (props) => {

    useEffect(() => {
        return () => {
            props.clearMessages()
        }
    }, []);

    const [Tag, SetTag] = useState('');
    const [TagsArr, SetTagsArr] = useState([]);
    const [Field, SetField] = useState({key: '', value: ''});
    const [FieldsArr, SetFieldsArr] = useState([]);

    const handleTagChange = (e) => {
        SetTag(e.target.value);
    }
    const handleFieldChange = (e) => {
        const {name, value} = e.target;
        SetField({...Field, [name]: value});
        console.log(Field)
    }
    const handleAddTag = () => {
        Tag && SetTagsArr([...TagsArr, Tag]);
    }
    const handleDeleteTag = (index) => {
        SetTagsArr(TagsArr.filter((tag) => TagsArr.indexOf(tag) !== index));
    }
    const handleAddField = () => {
        if (Field.key && Field.value) {
            SetFieldsArr([...FieldsArr, Field]);
        }
    }
    const handleDeleteField = (index) => {
        SetFieldsArr(FieldsArr.filter((field) => FieldsArr.indexOf(field) !== index));
    }

    const handleSubmit = (formData) => {
        props.clearMessages();
        const newObject = {
            name: formData.name,
            fields: FieldsArr,
            tags: TagsArr
        }
        props.addNewObject(newObject);
    }

    return (
        <AddObjectReduxForm onSubmit={handleSubmit} handleAddTag={handleAddTag} TagsArr={TagsArr}
                            handleTagChange={handleTagChange} handleFieldChange={handleFieldChange}
                            handleAddField={handleAddField} FieldsArr={FieldsArr} handleDeleteTag={handleDeleteTag}
                            handleDeleteField={handleDeleteField} errorMsg={props.errorMsg}
                            successMsg={props.successMsg}/>
    )
}

const mapStateToProps = (state) => ({
    errorMsg: getErrorMsg(state),
    successMsg: getSuccessMsg(state)
})
const actionCreators = {
    addNewObject,
    clearMessages
}

export default compose(
    connect(mapStateToProps, actionCreators),
    WithAuthRedirect
)(AddNewObjectContainer);