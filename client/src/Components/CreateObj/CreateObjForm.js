import React, { useState } from 'react';
import CreateObjRecursiveForm from './CreateObjRecursiveForm';

const CreateObjForm = (props) => {

  const [objs, setObjs] = useState([{}]);

  const handleChildInput = (childInput) => {
    console.log(childInput);
  };
  const handleAdd = () => {
    setObjs([...objs, {}]);
  };

  return (
    <div>
      <CreateObjRecursiveForm obj={objs} handleChildInput={handleChildInput}/>
    </div>
  );
};

export default CreateObjForm;