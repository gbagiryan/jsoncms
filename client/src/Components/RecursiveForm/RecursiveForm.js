import React from 'react';
import {IconButton, makeStyles, MenuItem, TextField} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DescriptionIcon from '@material-ui/icons/Description';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import SubjectIcon from '@material-ui/icons/Subject';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import 'react-quill/dist/quill.snow.css';
import ProgressWithPercentage from '../../Common/ProgressWithPercentage';
import RtxDialogWithHoverPopover from '../RichTextDialog/RtxDialogWithHoverPopover';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
        '& .MuiTextField-root': {
            // margin: theme.spacing(1),
            // marginTop: theme.spacing(0)
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
    rtfButton: {
        marginTop: theme.spacing(3),
    },
    fieldIcons: {
        marginTop: theme.spacing(-2)
    },
    innerObj: {
        marginLeft: theme.spacing(10)
    },
    uploadButton: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(1)
    },
    fields: {
        marginTop: -8
    },
    icon: {
        marginTop: theme.spacing(2)
    },
    colon:{
        display: 'inline-flex',
    },
    keyInput:{
        fontStyle: 'italic'
    }
}));

const RecursiveForm = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            {props.objs.map((obj, index) => (
                <div className={classes.fields}>
                    {!props.isArray &&
                        <TextField
                            key={'Key'}
                            placeholder={'Key'}
                            name={'__key'}
                            value={obj.__key}
                            variant="outlined"
                            // error={props.invalidObjs[props.index ? `${props.index}.${index}__key` : `${index}__key`]
                            // && props.invalidObjs[props.index ? `${props.index}.${index}__key` : `${index}__key`]}
                            // helperText={props.invalidObjs[props.index ? `${props.index}.${index}__key` : `${index}__key`]
                            // && props.invalidObjs[props.index ? `${props.index}.${index}__key` : `${index}__key`]}
                            // onBlur={(event) => props.validate(event, props.index ? `${props.index}.${index}` : `${index}`)}
                            size="small"
                            InputProps={{
                                classes: {
                                    input: classes.keyInput,
                                },
                            }}
                            label={'Key'}
                            onChange={(event) => props.handleChildInput(event, props.index ? `${props.index}.${index}` : `${index}`)}
                        />
                    }
                    <h2 className={classes.colon}>:</h2>
                    {obj.__type === 'string' &&
                    <TextField
                        key={'Value'}
                        placeholder={'Value'}
                        name={'__value'}
                        value={obj.__value}
                        variant="outlined"
                        // error={props.invalidObjs[props.index ? `${props.index}.${index}__value` : `${index}__value`]
                        // && props.invalidObjs[props.index ? `${props.index}.${index}__value` : `${index}__value`]}
                        // helperText={props.invalidObjs[props.index ? `${props.index}.${index}__value` : `${index}__value`]
                        // && props.invalidObjs[props.index ? `${props.index}.${index}__value` : `${index}__value`]}
                        // onBlur={(event) => props.validate(event, props.index ? `${props.index}.${index}` : `${index}`)}
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
                        &&
                        <ProgressWithPercentage className={classes.fieldIcons} value={obj.uploadProgress} index={index}
                                                file={obj.__value}/>
                        }
                    </>
                    }
                    {obj.__type === 'rich-text' &&
                    <>
                        <RtxDialogWithHoverPopover readOnly={false} value={obj.__value}
                                                   handleChildInput={props.handleChildInput}
                                                   index={props.index ? `${props.index}.${index}` : `${index}`}/>
                    </>}
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
                    <>
                        {obj.__type === 'file' &&
                        <DescriptionIcon className={classes.icon}></DescriptionIcon>}
                        {obj.__type === 'object' &&
                        <EmojiObjectsIcon className={classes.icon}></EmojiObjectsIcon>}
                        {obj.__type === 'rich-text' &&
                        <TextFieldsIcon className={classes.icon}></TextFieldsIcon>}
                        {obj.__type === 'array' &&
                        <SettingsEthernetIcon className={classes.icon}></SettingsEthernetIcon>}
                        {obj.__type === 'string' &&
                        <SubjectIcon className={classes.icon}></SubjectIcon>}
                    </>
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
                </div>
            ))}
        </div>
    );
}
;

export default RecursiveForm;
