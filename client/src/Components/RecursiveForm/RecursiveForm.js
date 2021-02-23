import React, { useEffect, useState } from 'react';
import { IconButton, makeStyles, MenuItem, TextField } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ReactQuill from 'react-quill';
import ProgressWithPercentage from '../../Common/ProgressWithPercentage';
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
      // minHeight: 100
    }
  },
  fieldIcons: {
    marginTop: theme.spacing(2)
  },
  innerObj: {
    marginLeft: theme.spacing(10)
  }
}));

const RecursiveForm = (props) => {

  const classes = useStyles();

  const inputTypes = [
    { value: 'string', label: 'string' },
    { value: 'array', label: 'array' },
    { value: 'object', label: 'object' },
    { value: 'file', label: 'file' },
    { value: 'rich-text', label: 'rich-text' }
  ];

  const [objs, setObjs] = useState([{ __key: '', __value: '', __type: inputTypes[0].value }]);
  const [hasChanged, setHasChanged] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([]);

  useEffect(() => {
    if (props.initialObjs) {
      handleAddInitialFields(props.initialObjs);
    }
  }, [props.initialObjs]);

  useEffect(() => {
    if (hasChanged) {
      props.handleChangeParent(objs, props.parentIndex);
      setHasChanged(false);
    }
  }, [hasChanged]);

  const handleGetChildObj = (childObjs, index) => {
    const values = [...objs];
    values[index].__key = objs[index].__key;
    values[index].__value = { ...childObjs };
    values[index].__type = objs[index].__type;
    setObjs(values);
    setHasChanged(true);
  };

  const handleAddInitialFields = (initialObjs) => {
    setObjs(Object.values(initialObjs));
  };

  const handleChangeInput = (event, index) => {
    const values = [...objs];
    values[index][event.target.name] = event.target.value;
    setObjs(values);
    setHasChanged(true);
  };

  const handleChangeType = (event, index) => {
    const values = [...objs];
    values[index].__type = event.target.value;
    values[index].__value = '';
    setObjs(values);
    setHasChanged(true);
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

  const handleAddField = () => {
    setObjs([...objs, { __key: '', __value: '', __type: inputTypes[0].value }]);
  };

  const handleRemoveField = (index) => {
    const values = [...objs];
    values.splice(index, 1);
    setObjs(values);
  };

  return (
    <div className={classes.root}>
      {objs.map((fieldKey, index) =>
        <div>
          <TextField
            placeholder={'Key'}
            name={'__key'}
            value={objs[index].__key}
            variant="outlined"
            size="small"
            label={'Key'}
            onChange={(event) => handleChangeInput(event, index)}
          />
          {objs[index].__type === 'string' &&
          <TextField
            placeholder={'Value'}
            name={'__value'}
            value={objs[index].__value}
            variant="outlined"
            size="small"
            label={'Value'}
            onChange={(event) => handleChangeInput(event, index)}
          />
          }
          {objs[index].__type === 'file' &&
          <>
            <input type={'file'} name={'upload'} onChange={(event) => handleUpload(event, index)}/>
            {(uploadProgress[index] > 0)
            && <ProgressWithPercentage value={uploadProgress[index]} index={index} file={objs[index].__value}/>
            }
          </>
          }
          <TextField
            id="standard-select"
            select
            name={'__type'}
            value={objs[index].__type}
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
            {objs[index].__type === 'object' &&
            <RecursiveForm initialObjs={objs[index].__value} handleChangeParent={handleGetChildObj}
                           parentIndex={index}/>}
            {objs[index].__type === 'rich-text' &&
            <ReactQuill className={classes.rtfEditor} value={objs[index].__value}
                        onChange={html => handleChangeInput({ target: { value: html, name: '__value' } }, index)}/>}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecursiveForm;
