import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { Button, Grid, IconButton, makeStyles, MenuItem, TextField } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ReactQuill from 'react-quill';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      marginTop: theme.spacing(3)
    }
  },
  rtfEditor: {
    margin: theme.spacing(3),
    width: 400,
    '& .ql-container': {
      minHeight: 100
    }
  },
  fieldIcons: {
    marginTop: theme.spacing(3)
  },
  submitButton: {
    margin: theme.spacing(1)
  }
}));

const NewRecursiveForm = (props) => {

  const classes = useStyles();

  const inputTypes = [
    { value: 'string', label: 'string' },
    { value: 'array', label: 'array' },
    { value: 'object', label: 'object' },
    { value: 'file', label: 'file' },
    { value: 'rich-text', label: 'rich-text' }
  ];

  const [fields, setFields] = useState([{ objKey: '', objValue: '', objType: inputTypes[0].value }]);

  // useEffect(() => {
  //   props.setParentValue(fields);
  //
  // }, [fields]);

  const getInnerObjs = (subObj) => {
    setFields([...fields, { ...subObj }]);
  };

  const handleChangeValue = (event, index) => {
    props.setParentValue(fields.map(obj => obj.objValue));
    const values = [...fields];
    values[index][event.target.name] = event.target.value;
    setFields(values);
  };
  const handleAddField = () => {
    setFields([...fields, { objKey: '', objValue: '', objType: inputTypes[0].value }]);
  };
  const handleRemoveField = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  return (
    <Container>
      <div className={classes.root}>
        {fields.map((field, index) => (
          <div key={index}>
            <TextField
              variant="outlined"
              size="small"
              placeholder={'Key'}
              name={'objKey'}
              label={'Key'}
              value={field.objKey}
              onChange={(event) => handleChangeValue(event, index)}/>
            {field.objType === 'string' &&
            <TextField
              variant="outlined"
              size="small"
              placeholder={'Value'}
              name={'objValue'}
              label={'Value'}
              value={field.objValue}
              onChange={(event) => handleChangeValue(event, index)}/>
            }
            {field.objType === 'file' &&
            <input type={'file'} name={'upload'}/>
            }
            {field.objType === 'rich-text' &&
            <ReactQuill className={classes.rtfEditor} value={field.objValue} name={'objValue'}
                        onChange={html => handleChangeValue({ target: { value: html } })}/>
            }
            {field.objType === 'object' &&
            <NewRecursiveForm setParentValue={getInnerObjs}/>
            }
            {field.objType === 'array' &&
            <>array</>
            }
            <TextField
              id="standard-select"
              select
              name={'objType'}
              value={field.objType}
              onChange={(event) => handleChangeValue(event, index)}
            >
              {inputTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <IconButton color="primary" className={classes.fieldIcons} onClick={handleAddField}>
              <AddCircleIcon/>
            </IconButton>
            {fields.length > 1 &&
            <IconButton color="secondary" className={classes.fieldIcons} onClick={() => handleRemoveField(index)}>
              <RemoveCircleIcon/>
            </IconButton>
            }
          </div>
        ))}
      </div>
    </Container>
  );
};

export default NewRecursiveForm;
