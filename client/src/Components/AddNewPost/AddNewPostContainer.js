import {connect} from "react-redux";
import {AddPostReduxForm} from "./AddNewPost";
import {addNewPost} from "../../Redux/Reducers/PostReducer";
import React, {useState} from "react";
import {compose} from "redux";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";

const AddNewPostContainer = (props) => {

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
    const handleAddField = () => {
        if (Field.key && Field.value) {
            SetFieldsArr([...FieldsArr, Field]);
        }
    }

    const handleSubmit = (formData) => {
        const newPost = {
            name: formData.name,
            post: FieldsArr,
            tags: TagsArr
        }
        props.addNewPost(newPost);
    }

    return (
        <AddPostReduxForm onSubmit={handleSubmit} handleAddTag={handleAddTag} TagsArr={TagsArr}
                          handleTagChange={handleTagChange} handleFieldChange={handleFieldChange}
                          handleAddField={handleAddField} FieldsArr={FieldsArr}/>
    )
}

const mapStateToProps = (state) => ({})
const actionCreators = {
    addNewPost
}

export default compose(
    connect(mapStateToProps, actionCreators),
    WithAuthRedirect
)(AddNewPostContainer);