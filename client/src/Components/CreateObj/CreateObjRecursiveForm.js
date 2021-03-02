import React, { useState } from 'react';

const CreateObjRecursiveForm = (props) => {

  const [Checkbox, SetCheckbox] = useState(false);

  const handleChangeInput = (e) => {
    props.handleChildInput(e.target.value);
  };

  const handleCheckbox = () => {
    SetCheckbox(!Checkbox);
  };

  return (
    <div>
      {
        props.obj.map((obj, index) => (
          <div style={{ marginLeft: '30px' }}>
            <input key={'Key'} placeholder={'Key'} name={'Key'} type="text"
                   onChange={props.handleChangeInput}/>
            <input key={'Value'} placeholder={'Value'} name={'Value'} type="text"
                   onChange={props.handleChangeInput}/>
            <input type={'checkbox'} name={'Checkbox'} key={'Checkbox'} value={Checkbox} onChange={handleCheckbox}/>
            {Checkbox && <CreateObjRecursiveForm handleChildInput={props.handleChildInput}/>}
          </div>)
        )
      }
    </div>
  );
};

export default CreateObjRecursiveForm;