import React, { useEffect, useState } from 'react';
import RecursiveForm from './RecursiveForm';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import { Button, Grid, IconButton, TextField } from '@material-ui/core';
import { Error, Success } from '../../Common/Messages';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ConfirmDialog from '../../Common/ConfirmDialog';
import Axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      marginTop: theme.spacing(3)
    }
  },
  fieldIcons: {
    marginTop: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  },
}));

const FormContainer = (props) => {
  const classes = useStyles();

  const inputTypes = [
    { value: 'string', label: 'string' },
    { value: 'array', label: 'array' },
    { value: 'object', label: 'object' },
    { value: 'file', label: 'file' },
    { value: 'rich-text', label: 'rich-text' }
  ];
  const [objs, setObjs] = useState([{ __key: '', __value: '', __type: inputTypes[0].value }]);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });

  useEffect(() => {
    if (props.initialObjs) {
      handleAddInitialFields(props.initialObjs);
    }
  }, [props.initialObjs]);

  const handleAddInitialFields = (initialObjs) => {
    setObjs(Object.values(initialObjs));
  };

  console.log('RENDER');

  const [uploadProgress, setUploadProgress] = useState([]);

  const changeItemByIndex = (strIndex, cb) => {
    if (!strIndex) {
      setObjs(cb(objs));
    } else {
      const updatedObjs = JSON.parse(JSON.stringify(objs));
      const str = strIndex.split('.');
      let objAtIndex = updatedObjs;
      for (let i = 0; i < str.length; i++) {
        if (i === str.length - 1) {
          objAtIndex[str[i]] = cb(objAtIndex[str[i]]);
        }
        objAtIndex = objAtIndex[str[i]].__value;
      }
      setObjs(updatedObjs);
    }
  };

  const handleChildInput = (event, strIndex) => {
    changeItemByIndex(strIndex, (obj) => {
      obj[event.target.name] = event.target.value;
      return obj;
    });
  };

  const handleChangeChildType = (event, strIndex) => {
    changeItemByIndex(strIndex, (obj) => {
      obj.__type = event.target.value;
      if (event.target.value === 'object' || event.target.value === 'array') {
        obj.__value = [{ __key: '', __value: '', __type: inputTypes[0].value }];
      }
      return obj;
    });
  };

  const handleAdd = (strIndex) => {
    changeItemByIndex(strIndex, (obj) => {
      if (!strIndex) {
        return [...obj, { __key: '', __value: '', __type: inputTypes[0].value }];
      } else {
        console.log(obj.__value);
        obj.__value.push({ __key: '', __value: '', __type: inputTypes[0].value });
        return obj;
      }
    });
  };
  const handleRemove = (strIndex, index) => {
    changeItemByIndex(strIndex, (obj) => {
      if (!strIndex) {
        const temp = [...obj];
        temp.splice(index, 1);
        return temp;
      } else {
        obj.__value.splice(index, 1);
        console.log(obj);
        return obj;
      }
    });
    setConfirmDialog({ ...confirmDialog, isOpen: false });
  };

  const handleUpload = async (event, strIndex) => {
    const formData = new FormData();
    formData.append('uploadedFile', event.target.files[0]);
    const uploadedFileName = await Axios.post('/api/backoffice/uploadFile', formData, {
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent;
        changeItemByIndex(strIndex, (obj) => {
          obj.uploadProgress = (Math.floor((loaded * 100) / total));
          return obj;
        });
      }
    });
    changeItemByIndex(strIndex, (obj) => {
      obj[event.target.name] = event.target.value;
      obj.__value = uploadedFileName.data;
      return obj;
    });
  };

  return (
    <Container className={classes.root}>
      <Grid container spacing={2}>
        {props.errorMsg &&
        <Grid item xs={12}>
          <Error errorMsg={props.errorMsg}/>
        </Grid>
        }
        {props.successMsg &&
        <Grid item xs={12}>
          <Success successMsg={props.successMsg}/>
        </Grid>
        }
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            size="small"
            placeholder={'Name'}
            name={'Name'}
            label={'Name'}
            value={props.Name}
            onChange={props.handleNameChange}/>
          <IconButton color="primary"
                      className={classes.fieldIcons}
                      onClick={() => handleAdd(null)}>
            <AddCircleIcon/>
          </IconButton>
        </Grid>
        <RecursiveForm objs={objs}
                       handleChildInput={handleChildInput}
                       handleChangeChildType={handleChangeChildType}
                       handleAdd={handleAdd}
                       handleRemove={handleRemove}
                       inputTypes={inputTypes}
                       setConfirmDialog={setConfirmDialog}
                       handleUpload={handleUpload}
                       uploadProgress={uploadProgress}
        />
        <Grid item xs={12}>
          {props.tagsArr.map((tag) =>
            <>
              {tag}
              <IconButton onClick={() => props.handleDeleteTag(props.tagsArr.indexOf(tag))}
                          color="primary">
                <HighlightOffIcon/>
              </IconButton>
              {', '}
            </>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined"
                     size="small"
                     placeholder={'Tag'}
                     name={'tag'}
                     label={'Tag'}
                     value={props.tag}
                     onChange={props.handleTagChange}/>
          <IconButton className={classes.fieldIcons} onClick={props.handleAddTag} color="primary">
            <AddCircleIcon/>
          </IconButton>
        </Grid>
        <Button type={'submit'} variant="contained" color="primary"
                className={classes.button} onClick={() => props.handleSubmit(objs)}>Save</Button>
      </Grid>
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}/>
    </Container>
  );
};
export default FormContainer;
