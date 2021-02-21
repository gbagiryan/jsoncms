import React, { useState } from 'react';
import { Grid, IconButton, makeStyles, MenuItem, TextField } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Paper from '@material-ui/core/Paper';

const ObjTreeForm = (props) => {

  const inputTypes = [
    { value: 'string', label: 'string' },
    { value: 'array', label: 'array' },
    { value: 'object', label: 'object' },
    { value: 'file', label: 'file' },
    { value: 'rich-text', label: 'rich-text' }
  ];

  const [objKey, setObjKey] = useState('');
  const [objValue, setObjValue] = useState('');
  const [type, setType] = useState(inputTypes[0].value);
  const [nextField, setNextField] = useState(false);

  const handleChangeKey = (e) => {
    // props.clearMessages();
    setObjKey(e.target.value);
  };
  const handleChangeValue = (e) => {
    // props.clearMessages();
    setObjValue(e.target.value);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const addField = () => {
    setNextField(!nextField);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField fullWidth variant="outlined" placeholder={'Key'} name={'key'} label={'Key'}
                   value={objKey} onChange={handleChangeKey}/>
      </Grid>
      <Grid item xs={4}>
        <TextField fullWidth variant="outlined" placeholder={'Value'} name={'value'} label={'Value'}
                   value={objValue} onChange={handleChangeValue}/>
      </Grid>
      <Grid item xs={2}>
        <TextField
          id="standard-select"
          select
          label="Select"
          value={type}
          onChange={handleChangeType}
          helperText="Select type"
        >
          {inputTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={addField} color="primary">
          {nextField ? <RemoveCircleIcon/> : <AddCircleIcon/>}
        </IconButton>
      </Grid>
      {nextField &&
      <div>
        {type === 'string' &&
        <ObjTreeForm/>
        }
        {type === 'file' &&
        <p>file</p>
        }
        {type === 'rich-text' &&
        <p>rich-text</p>
        }
        {type === 'object' &&
        <ObjTreeForm/>
        }
        {type === 'array' &&
        <p>array</p>
        }
      </div>
      }
    </Grid>
  );
};

export default ObjTreeForm;
