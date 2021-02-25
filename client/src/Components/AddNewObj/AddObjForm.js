import React, { useState } from 'react';
import { Button, Grid, IconButton, TextField } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import RecursiveForm from '../RecursiveForm/RecursiveForm';
import { Error, Success } from '../../Common/Messages';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Container from '@material-ui/core/Container';
import Recursive from './Recursive';

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

const AddNewObjForm = (props) => {
  const classes = useStyles();

  const inputTypes = [
    { value: 'string', label: 'string' },
    { value: 'array', label: 'array' },
    { value: 'object', label: 'object' },
    { value: 'file', label: 'file' },
    { value: 'rich-text', label: 'rich-text' }
  ];

  const [objs, setObjs] = useState([{ __key: '', __value: '', __type: inputTypes[0].value }]);

  const handleChangeInput = (event, index) => {
    const values = [...objs];
    values[index][event.target.name] = event.target.value;
    setObjs(values);
  };
  const handleChangeType = (event, index) => {
    const values = [...objs];
    values[index].__type = event.target.value;
    values[index].__value = '';
    setObjs(values);
  };

  const handleAddField = () => {
    setObjs([...objs, { __key: '', __value: '', __type: inputTypes[0].value }]);
  };
  const handleAddInner = (index) => {
    const values = [...objs];
    values[index].__value = [];
    values[index].__value.push({ __key: '', __value: '', __type: inputTypes[0].value });
    setObjs(values);
  };

  const handleRemoveField = (index) => {
    const values = [...objs];
    values.splice(index, 1);
    setObjs(values);
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
                      onClick={handleAddField}
          >
            <AddCircleIcon/>
          </IconButton>
        </Grid>
        <div>
          {objs.map((obj, index) => (
            <Recursive inputTypes={inputTypes}
                       obj={obj}
                       handleChangeInput={(event) => handleChangeInput(event, index)}
                       handleChangeType={(event) => handleChangeType(event, index)}
                       index={index}
                       addInner={() => handleAddInner(index)}
            />
          ))}
        </div>
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
                className={classes.button} onClick={props.handleSubmit}>Save</Button>
      </Grid>
    </Container>
  );
};

export default AddNewObjForm;
