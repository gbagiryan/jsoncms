import {EditObjectReduxForm} from "./EditObject";
import {singleObjectData} from "../../Redux/Selectors/ObjectSelectors";
import {fetchAnObject, updateObject} from "../../Redux/Reducers/ObjectReducer";
import {compose} from "redux";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";
import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {getErrorMsg, getSuccessMsg} from "../../Redux/Selectors/AppSelectors";
import {clearMessages} from "../../Redux/Reducers/AppReducer";

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
                             successMsg={props.successMsg}/>
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
    clearMessages
};

export default compose(
    withRouter,
    connect(mapStateToProps, actionCreators),
    WithAuthRedirect
)(EditObjectContainer);