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
import { requiredField } from '../../Common/Validators';
import { useImmer } from 'use-immer';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      // marginTop: theme.spacing(3),
    }
  },
  nameField: {
    fontWeight: 'bold',
  },
  nameLabel: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#3f51b5',
  },
  fieldIcons: {
    // marginTop: theme.spacing(2)
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
  const [objs, setObjs] = useState([{ strIndex: '0', __key: '', __value: '', __type: inputTypes[0].value }]);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
  // const [invalidObjs, setInvalidObjs] = useState({});
  const [uploadProgress, setUploadProgress] = useState([]);

  useEffect(() => {
    if (props.initialObjs) {
      handleAddInitialFields(props.initialObjs);
    }
  }, [props.initialObjs]);

  const handleAddInitialFields = (initialObjs) => {
    setObjs(Object.values(initialObjs));
  };

  const handleChildInput = (event, strIndex) => {
    const values = [...objs];
    const objToChange = values.find(obj => obj.strIndex === strIndex);
    objToChange[event.target.name] = event.target.value;
    setObjs(values);
    // setInvalidObjs({ ...invalidObjs, [`${strIndex}${event.target.name}`]: '' });
  };

  // const validate = (event, strIndex) => {
  //   setInvalidObjs({
  //     ...invalidObjs,
  //     [`${strIndex}${event.target.name}`]: requiredField(event.target.placeholder, event.target.value)
  //   });
  // };

  const handleChangeChildType = (event, strIndex) => {
    // setInvalidObjs({ ...invalidObjs, [`${strIndex}__value`]: '' });
    // setInvalidObjs({ ...invalidObjs, [`${strIndex}__key`]: '' });
    const values = [...objs];
    const objToChange = values.find(obj => obj.strIndex === strIndex);
    objToChange.__type = event.target.value;
    objToChange.__value = '';
    setObjs(values);
  };

  const handleAdd = (strIndex) => {
    // changeItemByIndex(strIndex, (obj) => {
    //   if (!strIndex) {
    //     return [...obj, { __key: '', __value: '', __type: inputTypes[0].value }];
    //   } else {
    //     console.log(obj.__value);
    //     obj.__value.push({ __key: '', __value: '', __type: inputTypes[0].value });
    //     return obj;
    //   }
    // });
  };
  const handleRemove = (strIndex, index) => {
    // changeItemByIndex(strIndex, (obj) => {
    //   if (!strIndex) {
    //     const temp = [...obj];
    //     temp.splice(index, 1);
    //     return temp;
    //   } else {
    //     obj.__value.splice(index, 1);
    //     console.log(obj);
    //     return obj;
    //   }
    // });
    setConfirmDialog({ ...confirmDialog, isOpen: false });
  };

  const handleUpload = async (event, strIndex) => {
    // const formData = new FormData();
    // formData.append('uploadedFile', event.target.files[0]);
    // const uploadedFileName = await Axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/api/backoffice/uploadFile`, formData, {
    //   onUploadProgress: progressEvent => {
    //     const { loaded, total } = progressEvent;
    //     changeItemByIndex(strIndex, (obj) => {
    //       obj.uploadProgress = (Math.floor((loaded * 100) / total));
    //       return obj;
    //     });
    //   }
    // });
    // changeItemByIndex(strIndex, (obj) => {
    //   obj[event.target.name] = event.target.value;
    //   obj.__value = uploadedFileName.data;
    //   return obj;
    // });
  };

  const handleSubmit = () => {
    // const hasErrors = Object.values(invalidObjs).filter(val => val !== '');
    // if (hasErrors.length > 0) {
    //   props.setErrorMsg('No empty fields allowed. Fill the blanks or remove them');
    // } else {
    const builtObjs = buildObj(objs);
    props.handleSubmit(builtObjs);
    // }
  };

  const buildObj = (arrOfObjs) => {
    let objs = [];
    for (let i = 0; i < arrOfObjs.length; i++) {
      const objIdArr = arrOfObjs[i].id.split('.');
      if (objIdArr.length === 1) {
        objs.push(arrOfObjs[i]);
      } else {
        let temp = arrOfObjs[i].id.split('.');
        temp.splice(-1, 1);
        let temp2 = temp.join('.');
        const parentObj = arrOfObjs.find((obj) => obj.id === temp2);
        if (Array.isArray(parentObj.__value)) {
          parentObj.__value.push(arrOfObjs[i]);
        } else {
          parentObj.__value = [parentObj.__value, arrOfObjs[i]];
        }
      }
    }
    return objs;
  };

  return (
    <Container className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            size="small"
            placeholder={'Name'}
            name={'Name'}
            label={'Name'}
            InputProps={{
              classes: {
                input: classes.nameField,
              },
            }}
            InputLabelProps={{
              classes: {
                root: classes.label,
                focused: classes.nameLabel
              }
            }}
            value={props.name}
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
          // validate={validate}
          // invalidObjs={invalidObjs}
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
                className={classes.button} onClick={handleSubmit}>Save</Button>
      </Grid>
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}/>
    </Container>
  );
};
export default FormContainer;
