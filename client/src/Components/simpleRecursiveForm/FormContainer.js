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

  const handleChildInput = (event, index) => {
    const values = [...objs];
    values[index][event.target.name] = event.target.value;
    setObjs(values);
  };
  const handleChangeChildType = (event, index) => {
    const values = [...objs];
    values[index][event.target.name] = event.target.value;
    setObjs(values);
  };

  console.log(objs);

  const handleAdd = () => {
    setObjs([...objs, { __key: '', __value: '', __type: inputTypes[0].value }]);
  };
  const handleRemove = (index) => {
    const values = [...objs];
    values.splice(index, 1);
    setObjs(values);
  };

  return (
    <div>
      {objs.map((obj, index) => (
        <RecursiveForm obj={obj}
                       handleChildInput={handleChildInput}
                       handleChangeChildType={handleChangeChildType}
                       handleAdd={handleAdd}
                       handleRemove={handleRemove}
                       index={index}
                       inputTypes={inputTypes}
        />
      ))}
    </div>
  );
};
export default FormContainer;
