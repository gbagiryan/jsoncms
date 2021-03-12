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
  const [objs, setObjs] = useImmer([{ __key: '', __value: '', __type: inputTypes[0].value }]);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
  // const [invalidObjs, setInvalidObjs] = useState({});
  const [uploadProgress, setUploadProgress] = useState([]);

  useEffect(() => {
    if (props.initialObjs) {
      handleAddInitialFields(props.initialObjs);
    }
  }, [props.initialObjs]);

  const handleAddInitialFields = (initialObjs) => {
    setObjs(draft => (Object.values(initialObjs)));
  };

  const changeItemByIndex = (strIndex, cb) => {
    if (!strIndex) {
      setObjs(draft => (cb(objs)));
    } else {
      const str = strIndex.split('.');
      setObjs(draft => {
        for (let i = 0; i < str.length; i++) {
          if (i === str.length - 1) {
            draft[str[i]] = cb(draft[str[i]]);
          }
          draft = draft[str[i]].__value;
        }
      });
    }
  };

  const handleChildInput = (event, strIndex) => {
    changeItemByIndex(strIndex, (obj) => {
      // setInvalidObjs({ ...invalidObjs, [`${strIndex}${event.target.name}`]: '' });
      obj[event.target.name] = event.target.value;
      return obj;
    });
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
    changeItemByIndex(strIndex, (obj) => {
      obj.__type = event.target.value;
      obj.__value = '';
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
    const uploadedFileName = await Axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/api/backoffice/uploadFile`, formData, {
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

  const handleSubmit = () => {
    // const hasErrors = Object.values(invalidObjs).filter(val => val !== '');
    // if (hasErrors.length > 0) {
    //   props.setErrorMsg('No empty fields allowed. Fill the blanks or remove them');
    // } else {
    props.handleSubmit(objs);
    // }
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
