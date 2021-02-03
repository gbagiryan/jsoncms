import {connect} from "react-redux";
import {AddObjectReduxForm} from "./AddNewObject";
import {addNewObject} from "../../Redux/Reducers/ObjectReducer";
import React, {useState} from "react";
import {compose} from "redux";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";
import {EditObjectReduxForm} from "../EditObject/EditObject";

const AddNewObjectContainer = (props) => {

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
                            handleDeleteField={handleDeleteField}/>
    )
}

const mapStateToProps = (state) => ({})
const actionCreators = {
    addNewObject
}

export default compose(
    connect(mapStateToProps, actionCreators),
    WithAuthRedirect
)(AddNewObjectContainer);