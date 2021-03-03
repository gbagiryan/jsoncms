import React, { useState } from 'react';
import RecursiveForm from './RecursiveForm';

const FormContainer = (props) => {

    const inputTypes = [
      { value: 'string', label: 'string' },
      { value: 'array', label: 'array' },
      { value: 'object', label: 'object' },
      { value: 'file', label: 'file' },
      { value: 'rich-text', label: 'rich-text' }
    ];
    const [objs, setObjs] = useState([{ __key: '', __value: '', __type: inputTypes[0].value }]);

    const changeItemByIndex = (strIndex, cb) => {
      if (!strIndex) {
        setObjs(cb(objs));
      } else {
        const updatedObjs = JSON.parse(JSON.stringify(objs));
        const str = strIndex.split('.');
        let objAtIndex = updatedObjs;
        for (let i = 0; i < str.length; i++) {
          if (i === str.length - 1) {
            objAtIndex[str[i]] = cb(objAtIndex[str[i]]);
          }
          objAtIndex = objAtIndex[str[i]].__value;
        }
        setObjs(updatedObjs);
      }
    };

    const handleChildInput = (event, strIndex) => {
      changeItemByIndex(strIndex, (obj) => {
        obj[event.target.name] = event.target.value;
        return obj;
      });
    };

    const handleChangeChildType = (event, strIndex) => {
      changeItemByIndex(strIndex, (obj) => {
        obj.__type = event.target.value;
        if (event.target.value === 'object') {
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
    };

    return (
      <RecursiveForm objs={objs}
                     handleChildInput={handleChildInput}
                     handleChangeChildType={handleChangeChildType}
                     handleAdd={handleAdd}
                     handleRemove={handleRemove}
                     inputTypes={inputTypes}
      />
    );
  }
;
export default FormContainer;
