import {connect} from "react-redux";
import {AddObjectReduxForm} from "./AddNewObject";
import {addNewObject} from "../../Redux/Reducers/ObjectReducer";
import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {WithAuthRedirect} from "../../Common/WithAuthRedirect";
import {getErrorMsg, getSuccessMsg} from "../../Redux/Selectors/AppSelectors";
import {clearMessages, setErrorMsg} from "../../Redux/Reducers/AppReducer";

const AddNewObjectContainer = (props) => {

    useEffect(() => {
        return () => {
            props.clearMessages()
        }
    }, []);

    const inputTypes = [
        {value: 'string', label: 'string'},
        {value: 'array', label: 'array'},
        {value: 'object', label: 'object'},
        {value: 'file', label: 'file'},
        {value: 'rich-text', label: 'rich-text'}
    ];

    const [Tag, SetTag] = useState('');
    const [TagsArr, SetTagsArr] = useState([]);
    const [Field, SetField] = useState({key: '', value: ''});
    const [FieldsArr, SetFieldsArr] = useState([]);
    const [Type, SetType] = useState(inputTypes[0].value);

    const handleChangeType = (event) => {
        SetType(event.target.value);
    };

    const handleTagChange = (e) => {
        props.clearMessages();
        SetTag(e.target.value);
    }
    const handleFieldChange = (e) => {
        props.clearMessages();
        const {name, value} = e.target;
        SetField({...Field, [name]: value});
    }
    const handleAddTag = () => {
        if (!TagsArr.includes(Tag)) {
            SetTagsArr([...TagsArr, Tag]);
        } else {
            props.setErrorMsg('Tags must be unique')
        }
    }
    const handleDeleteTag = (index) => {
        console.log(index)
        SetTagsArr(TagsArr.filter((tag) => TagsArr.indexOf(tag) !== index));
    }
    const handleAddField = () => {
        if (!FieldsArr.find((el) => el.key === Field.key)) {
            SetFieldsArr([...FieldsArr, Field]);
        } else {
            props.setErrorMsg('Keys of fields must be unique')
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
                            successMsg={props.successMsg} Type={Type} handleChangeType={handleChangeType}
                            inputTypes={inputTypes}/>
    )
}

const mapStateToProps = (state) => ({
    errorMsg: getErrorMsg(state),
    successMsg: getSuccessMsg(state)
})
const actionCreators = {
    addNewObject,
    clearMessages,
    setErrorMsg
}

export default compose(
    connect(mapStateToProps, actionCreators),
    WithAuthRedirect
)(AddNewObjectContainer);