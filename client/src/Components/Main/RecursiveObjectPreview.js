import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';

const RecursiveObjectPreview = (props) => {

  const goDeeper = () => {
    return (
      <RecursiveObjectPreview innerObj={props.innerObj.innerObj}/>
    );
  };

  return (
    <Dialog>
      <Paper>
        props.innerObj
        <Button onClick={goDeeper}>open subObj</Button>
      </Paper>
    </Dialog>
  );
};