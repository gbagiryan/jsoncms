import { Button, Card, CardContent, IconButton, TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Parser from 'html-react-parser';
import React from 'react';

const RecursiveMain = (props) => {
  return (
    <div>
      {Object.keys(props.objs).map((objKey, i) =>
        <div>
          <div>
            {objKey}
          </div>
          <div>
            {props.objs[objKey].type === 'file' ?
              <div>
                {props.objs[objKey].subObjValue.originalName}
                <IconButton
                  component={Link}
                  to={{ pathname: process.env.REACT_APP_SERVER_BASE_URL + props.objs[objKey].subObjValue.fileName }}
                  target={'_blank'}
                  color="primary">
                  <ExitToAppIcon/>
                </IconButton>
              </div>
              : props.objs[objKey].type === 'object' ?
                <RecursiveMain objs={props.objs[objKey].subObjValue}/>
                : Parser(JSON.stringify(props.objs[objKey].subObjValue))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecursiveMain;