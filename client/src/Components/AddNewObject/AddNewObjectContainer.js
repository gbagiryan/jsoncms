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

    const [FieldsArr, SetFieldsArr] = useState([]);
    const [Tag, SetTag] = useState('');
    const [TagsArr, SetTagsArr] = useState([]);
    const [Type, SetType] = useState(inputTypes[0].value);
    const [Key, SetKey] = useState('');
    const [Value, SetValue] = useState('');

    const handleChangeKey = (e) => {
        SetKey(e.target.value);
    }
    const handleChangeValue = (e) => {
        SetValue(e.target.value);
    }
    const handleEditorChange = (value) => {
        SetValue(value)
    }
    const handleUpload = (e) => {
        SetValue(e.target.files[0]);
    }
    const handleChangeType = (event) => {
        SetType(event.target.value);
        SetValue('');
    };
    const handleTagChange = (e) => {
        props.clearMessages();
        SetTag(e.target.value);
    }
    const handleAddTag = () => {
        if (Tag) {
            if (!TagsArr.includes(Tag)) {
                SetTagsArr([...TagsArr, Tag]);
            } else {
                props.setErrorMsg('Tags must be unique')
            }
        } else {
            props.setErrorMsg('Tag can\'t be empty');
        }
    }
    const handleDeleteTag = (index) => {
        SetTagsArr(TagsArr.filter((tag) => TagsArr.indexOf(tag) !== index));
    }
    const handleAddField = () => {
        if (Key && Value) {
            if (!FieldsArr.find((el) => el.Key === Key)) {
                SetFieldsArr([...FieldsArr, {Key, Value}]);
                SetKey('');
                SetValue('');
            } else {
                props.setErrorMsg('Keys of fields must be unique')
            }
        } else {
            props.setErrorMsg('Key and Value required')
        }
    }
    const handleDeleteField = (index) => {
        SetFieldsArr(FieldsArr.filter((field) => FieldsArr.indexOf(field) !== index));
    }

    const handleSubmit = (form) => {
        props.clearMessages();

        const formData = new FormData();

        formData.append('name', form.name)
        FieldsArr.map(field => {
            if (field.Value.__proto__ === File.prototype) {
                formData.append('fileKey', field.Key)
                formData.append('fileValue', field.Value)
            } else {
                formData.append('fieldKey', field.Key)
                formData.append('fieldValue', field.Value)
            }
        })
        TagsArr.map(tag => formData.append('tags', tag))
        props.addNewObject(formData);
    }

    return (
        <AddObjectReduxForm errorMsg={props.errorMsg} successMsg={props.successMsg} onSubmit={handleSubmit}
                            handleAddTag={handleAddTag} TagsArr={TagsArr} handleTagChange={handleTagChange}
                            handleAddField={handleAddField} FieldsArr={FieldsArr} handleDeleteTag={handleDeleteTag}
                            handleDeleteField={handleDeleteField} Type={Type} handleChangeType={handleChangeType}
                            inputTypes={inputTypes} handleEditorChange={handleEditorChange} handleUpload={handleUpload}
                            Value={Value} handleChangeValue={handleChangeValue} Key={Key}
                            handleChangeKey={handleChangeKey}/>
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