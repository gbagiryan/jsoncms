import {EditObjectReduxForm} from "./EditObject";
import {singleObjectData} from "../../Redux/Selectors/ObjectSelectors";
import {fetchAnObject, updateObject} from "../../Redux/Reducers/ObjectReducer";
import {compose} from "redux";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../Common/WithAuthRedirect";
import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {getErrorMsg, getSuccessMsg} from "../../Redux/Selectors/AppSelectors";
import {clearMessages, setErrorMsg} from "../../Redux/Reducers/AppReducer";

const EditObjectContainer = (props) => {

    useEffect(() => {
        return () => {
            props.clearMessages()
        }
    }, []);

    useEffect(() => {
        const objectId = props.match.params.objectId
        props.fetchAnObject(objectId);
    }, []);

    useEffect(() => {
        if (props.object) {
            SetFieldsArr(props.object.fields);
            SetTagsArr(props.object.tags);
        }
    }, [props.object]);


    const inputTypes = [
        {value: 'string', label: 'string'},
        {value: 'rich-text', label: 'rich-text'},
        {value: 'file', label: 'file'},
        {value: 'array', label: 'array'},
        {value: 'object', label: 'object'}
    ];

    const [FieldsArr, SetFieldsArr] = useState([]);
    const [Tag, SetTag] = useState('');
    const [TagsArr, SetTagsArr] = useState([]);
    const [Type, SetType] = useState(inputTypes[0].value);
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');

    const handleChangeValue = (e) => {
        setValue(e.target.value);
    }
    const handleEditorChange = (value) => {
        setValue(value)
    }
    const handleUpload = (e) => {
        setValue(e.target.files[0]);
    }
    const handleChangeKey = (e) => {
        setKey(e.target.value)
    }
    const handleChangeType = (e) => {
        SetType(e.target.value);
        setValue('');
    };
    const handleTagChange = (e) => {
        SetTag(e.target.value);
    }
    const handleAddTag = () => {
        if (!TagsArr.includes(Tag)) {
            SetTagsArr([...TagsArr, Tag]);
        } else {
            props.setErrorMsg('Tags must be unique')
        }
    }
    const handleDeleteTag = (index) => {
        SetTagsArr(TagsArr.filter((tag) => TagsArr.indexOf(tag) !== index));
    }
    const handleAddField = () => {
        if (!FieldsArr.find((el) => el.key === key)) {
            SetFieldsArr([...FieldsArr, {key, value}]);
            setKey('');
            setValue('');
        } else {
            props.setErrorMsg('Keys of fields must be unique')
        }
    }
    const handleDeleteField = (index) => {
        SetFieldsArr(FieldsArr.filter((field) => FieldsArr.indexOf(field) !== index));
    }

    const handleSubmit = (formData) => {
        props.clearMessages();
        const updatedObject = {
            name: formData.name,
            fields: FieldsArr,
            tags: TagsArr
        }
        props.updateObject(props.object._id, updatedObject)
    }

    return (
        <EditObjectReduxForm errorMsg={props.errorMsg} successMsg={props.successMsg} onSubmit={handleSubmit}
                             handleAddTag={handleAddTag} TagsArr={TagsArr} handleTagChange={handleTagChange}
                             handleAddField={handleAddField} FieldsArr={FieldsArr} handleDeleteTag={handleDeleteTag}
                             handleDeleteField={handleDeleteField} Type={Type} handleChangeType={handleChangeType}
                             inputTypes={inputTypes} handleEditorChange={handleEditorChange} handleUpload={handleUpload}
                             key={key} handleChangeKey={handleChangeKey} value={value}
                             handleChangeValue={handleChangeValue}/>
    )
}

const mapStateToProps = (state) => ({
    object: singleObjectData(state),
    errorMsg: getErrorMsg(state),
    successMsg: getSuccessMsg(state)
});
const actionCreators = {
    updateObject,
    fetchAnObject,
    clearMessages,
    setErrorMsg
};

export default compose(
    withRouter,
    connect(mapStateToProps, actionCreators),
    WithAuthRedirect
)(EditObjectContainer);