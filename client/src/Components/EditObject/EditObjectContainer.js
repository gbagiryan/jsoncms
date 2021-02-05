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
    const handleChangeType = (e) => {
        SetType(e.target.value);
        SetValue('');
    };
    const handleTagChange = (e) => {
        props.clearMessages();
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
        if (!FieldsArr.find((el) => el.key === Key)) {
            SetFieldsArr([...FieldsArr, {Key, Value}]);
            SetKey('');
            SetValue('');
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
                             Value={Value} handleChangeValue={handleChangeValue} Key={Key} handleChangeKey={handleChangeKey}/>
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