import React from 'react';
import {TextField} from "@material-ui/core";

export const renderTextField = ({input, label, meta: {touched, error}, ...custom}) => (
    <TextField
        id="outlined-helperText"
        label={label}
        error={touched && error}
        helperText={touched && error ? error : ''}
        variant="outlined"
        {...input}
        {...custom}

    />
);