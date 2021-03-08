import React, { useState } from 'react';
import { IconButton, makeStyles, MenuItem, TextField } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ProgressWithPercentage from '../../Common/ProgressWithPercentage';
import RichTextDialog from '../RichTextDialog/RichTextDialog';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      marginTop: theme.spacing(3)
    }
  },
  rtfEditor: {
    width: 400,
    '& .ql-container': {
      overflow: 'hidden'
      // minHeight: 100
    },
    '& .ql-toolbar.ql-snow': {
      display: 'none'
    },
    '& .ql-editor': {
      height: 100,
      overflow: 'hidden'
    }
  },
  fieldIcons: {
    marginTop: theme.spacing(2)
  },
  innerObj: {
    marginLeft: theme.spacing(10)
  },
  uploadButton: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(3)
  }
}));

const RecursiveForm = (props) => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.objs.map((obj, index) => (
        <div>
          {!props.isArray &&
          <TextField
            key={'Key'}
            placeholder={'Key'}
            name={'__key'}
            value={obj.__key}
            variant="outlined"
            error={props.invalidObjs[props.index ? `${props.index}.${index}__key` : `${index}__key`]
            && props.invalidObjs[props.index ? `${props.index}.${index}__key` : `${index}__key`]}
            helperText={props.invalidObjs[props.index ? `${props.index}.${index}__key` : `${index}__key`]
            && props.invalidObjs[props.index ? `${props.index}.${index}__key` : `${index}__key`]}
            onBlur={(event) => props.validate(event, props.index ? `${props.index}.${index}` : `${index}`)}
            size="small"
            label={'Key'}
            onChange={(event) => props.handleChildInput(event, props.index ? `${props.index}.${index}` : `${index}`)}
          />
          }
          {obj.__type === 'string' &&
          <TextField
            key={'Value'}
            placeholder={'Value'}
            name={'__value'}
            value={obj.__value}
            variant="outlined"
            error={props.invalidObjs[props.index ? `${props.index}.${index}__value` : `${index}__value`]
            && props.invalidObjs[props.index ? `${props.index}.${index}__value` : `${index}__value`]}
            helperText={props.invalidObjs[props.index ? `${props.index}.${index}__value` : `${index}__value`]
            && props.invalidObjs[props.index ? `${props.index}.${index}__value` : `${index}__value`]}
            onBlur={(event) => props.validate(event, props.index ? `${props.index}.${index}` : `${index}`)}
            size="small"
            label={'Value'}
            onChange={(event) => props.handleChildInput(event, props.index ? `${props.index}.${index}` : `${index}`)}
          />
          }
          {obj.__type === 'file' &&
          <>
            <input className={classes.uploadButton} type={'file'} name={'upload'}
                   onChange={(event) => props.handleUpload(event, props.index ? `${props.index}.${index}` : `${index}`)}
            />
            {(obj.uploadProgress && obj.uploadProgress > 0)
            && <ProgressWithPercentage value={obj.uploadProgress} index={index} file={obj.__value}/>
            }
          </>
          }
          <TextField
            id="standard-select"
            select
            name={'__type'}
            value={obj.__type}
            onChange={(event) => props.handleChangeChildType(event, props.index ? `${props.index}.${index}` : `${index}`)}
          >{props.inputTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>
          {(obj.__type === 'object' || obj.__type === 'array') &&
          <IconButton color="primary"
                      className={classes.fieldIcons}
                      onClick={() => props.handleAdd(props.index ? `${props.index}.${index}` : `${index}`)}>
            <AddCircleIcon/>
          </IconButton>
          }
          {props.objs.length > 1 &&
          <IconButton color="secondary"
                      className={classes.fieldIcons}
                      onClick={() => {
                        obj.__key || obj.__value ?
                          props.setConfirmDialog({
                            isOpen: true,
                            title: `Deleting filled field`,
                            subTitle: `Are you sure you want to delete this field?`,
                            onConfirm: () => props.handleRemove(props.index ? `${props.index}` : null, index)
                          })
                          : props.handleRemove(props.index ? `${props.index}` : null, index);
                      }}>
            <RemoveCircleIcon/>
          </IconButton>
          }
          {obj.__type === 'object' &&
          <div className={classes.innerObj}>
            <RecursiveForm objs={obj.__value}
                           handleChildInput={props.handleChildInput}
                           handleChangeChildType={props.handleChangeChildType}
                           handleAdd={props.handleAdd}
                           handleRemove={props.handleRemove}
                           index={props.index ? `${props.index}.${index}` : `${index}`}
                           inputTypes={props.inputTypes}
                           setConfirmDialog={props.setConfirmDialog}
                           handleUpload={props.handleUpload}
                           uploadProgress={props.uploadProgress}
                           validate={props.validate}
                           invalidObjs={props.invalidObjs}
            />
          </div>}
          {obj.__type === 'array' &&
          <div className={classes.innerObj}>
            <RecursiveForm isArray={true}
                           objs={obj.__value}
                           handleChildInput={props.handleChildInput}
                           handleChangeChildType={props.handleChangeChildType}
                           handleAdd={props.handleAdd}
                           handleRemove={props.handleRemove}
                           index={props.index ? `${props.index}.${index}` : `${index}`}
                           inputTypes={props.inputTypes}
                           setConfirmDialog={props.setConfirmDialog}
                           handleUpload={props.handleUpload}
                           uploadProgress={props.uploadProgress}
                           validate={props.validate}
                           invalidObjs={props.invalidObjs}
            />
          </div>}
          {obj.__type === 'rich-text' &&
          <div className={classes.innerObj}>
            <RichTextDialog readOnly={false} value={obj.__value}
                            handleChildInput={props.handleChildInput}
                            index={props.index ? `${props.index}.${index}` : `${index}`}/>
            <ReactQuill className={classes.rtfEditor} readOnly={true} value={obj.__value}/>
          </div>}
        </div>
      ))}
    </div>
  );
};

export default RecursiveForm;
