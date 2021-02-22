import {
  IconButton,
  makeStyles,
  MenuItem,
  TextField
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ReactQuill from 'react-quill';
import Axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      marginTop: theme.spacing(3)
    }
  },
  rtfEditor: {
    margin: theme.spacing(1),
    width: 400,
    '& .ql-container': {
      minHeight: 100
    }
  },
  fieldIcons: {
    marginTop: theme.spacing(2)
  },
  innerObj: {
    marginLeft: theme.spacing(10)
  }
}));

const RecursiveMain = (props) => {

  const classes = useStyles();

  const inputTypes = [
    { value: 'string', label: 'string' },
    { value: 'array', label: 'array' },
    { value: 'object', label: 'object' },
    { value: 'file', label: 'file' },
    { value: 'rich-text', label: 'rich-text' }
  ];

  const [objs, setObjs] = useState([{ __key: '', __value: '', __type: inputTypes[0].value }]);

  const [uploadProgress, setUploadProgress] = useState([]);

  useEffect(() => {
    props.setParentState(objs, props.parentIndex);
  }, [objs]);

  const handleChangeInput = (event, index) => {
    const values = [...objs];
    values[index][event.target.name] = event.target.value;
    setObjs(values);
  };
  const handleUpload = async (event, index) => {
    const formData = new FormData();
    formData.append('uploadedFile', event.target.files[0]);
    const uploadedFileName = await Axios.post('/api/posts/uploadFile', formData, {
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent;
        const uploads = [...uploadProgress];
        uploads[index] = (Math.floor((loaded * 100) / total));
        setUploadProgress(uploads);
      }
    });
    const values = [...objs];
    values[index][event.target.name] = event.target.value;
    values[index].__value = uploadedFileName.data;
    setObjs(values);
  };
  const handleChangeType = (event, index) => {
    const values = [...objs];
    values[index].__value = '';
    values[index].__type = event.target.value;
    setObjs(values);
  };

  const getInnerState = (subObjects, parentIndex) => {
    const values = [...objs];
    values[parentIndex].__key = objs[parentIndex].__key;
    values[parentIndex].__value = { ...subObjects };
    values[parentIndex].__type = objs[parentIndex].__type;
    setObjs(values);
  };

  const handleAddField = () => {
    setObjs([...objs, { __key: '', __value: '', __type: inputTypes[0].value }]);
  };

  const handleRemoveField = (index) => {
    const values = [...objs];
    values.splice(index, 1);
    setObjs(values);
  };

  return (
    <div>
      {Object.keys(props.objs).map((objKey, index) =>
        <div>
          <TextField
            placeholder={'Key'}
            name={'__key'}
            value={props.objs[objKey].__key}
            variant="outlined"
            size="small"
            label={'Key'}
            onChange={(event) => handleChangeInput(event, index)}/>
          {props.objs[objKey].__type === 'string' &&
          <TextField
            placeholder={'Value'}
            name={'__value'}
            value={props.objs[objKey].__value}
            variant="outlined"
            size="small"
            label={'Value'}
            onChange={(event) => handleChangeInput(event, index)}/>
          }
          {props.objs[objKey].__type === 'file' &&
          <>
            <input type={'file'} name={'upload'} onChange={(event) => handleUpload(event, index)}/>
            {/*{(uploadProgress[index] > 0)*/}
            {/*&& <ProgressWithPercentage value={uploadProgress[index]} index={index} file={field.__value}/>*/}
            {/*}*/}
          </>
          }
          <TextField
            id="standard-select"
            select
            name={'__type'}
            value={props.objs[objKey].__type}
            onChange={(event) => handleChangeType(event, index)}
          >{inputTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>
          <IconButton color="primary" className={classes.fieldIcons} onClick={handleAddField}>
            <AddCircleIcon/>
          </IconButton>
          {objs.length > 1 &&
          <IconButton color="secondary" className={classes.fieldIcons} onClick={() => handleRemoveField(index)}>
            <RemoveCircleIcon/>
          </IconButton>
          }
          <div className={classes.innerObj}>
            {props.objs[objKey].__type === 'object' &&
            <RecursiveMain setParentState={getInnerState} parentIndex={index} objs={props.objs[objKey].__value}/>}
            {props.objs[objKey].__type === 'rich-text' &&
            <ReactQuill className={classes.rtfEditor} value={props.objs[objKey].__value}
                        onChange={html => handleChangeInput({ target: { value: html, name: '__value' } }, index)}/>}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecursiveMain;