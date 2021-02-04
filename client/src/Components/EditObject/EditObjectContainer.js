import {EditObjectReduxForm} from "./EditObject";
import {singleObjectData} from "../../Redux/Selectors/ObjectSelectors";
import {fetchAnObject, updateObject} from "../../Redux/Reducers/ObjectReducer";
import {compose} from "redux";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";
import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {getErrorMsg, getSuccessMsg} from "../../Redux/Selectors/AppSelectors";
import {clearMessages, setErrorMsg} from "../../Redux/Reducers/AppReducer";
import {AddObjectReduxForm} from "../AddNewObject/AddNewObject";

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
        {value: 'array', label: 'array'},
        {value: 'object', label: 'object'},
        {value: 'file', label: 'file'},
        {value: 'rich-text', label: 'rich-text'}
    ];

    const [Tag, SetTag] = useState('');
    const [TagsArr, SetTagsArr] = useState([]);
    const [Field, SetField] = useState({key: '', value: ''});
    const [FieldsArr, SetFieldsArr] = useState([]);
    const [Type, SetType] = useState('');

    const handleChangeType = (event) => {
        SetType(event.target.value);
    };

    const handleTagChange = (e) => {
        SetTag(e.target.value);
    }
    const handleFieldChange = (e) => {
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

        const updatedObject = {
            name: formData.name,
            fields: FieldsArr,
            tags: TagsArr
        }
        props.updateObject(props.object._id, updatedObject)
    }

    return (
        <EditObjectReduxForm onSubmit={handleSubmit} handleAddTag={handleAddTag} TagsArr={TagsArr}
                             handleTagChange={handleTagChange} handleFieldChange={handleFieldChange}
                             handleAddField={handleAddField} FieldsArr={FieldsArr} handleDeleteTag={handleDeleteTag}
                             handleDeleteField={handleDeleteField} errorMsg={props.errorMsg}
                             successMsg={props.successMsg} Type={Type} handleChangeType={handleChangeType}
                             inputTypes={inputTypes}/>
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