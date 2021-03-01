import React from 'react';

const RecursiveForm = (props) => {

  return (
    <div style={{ marginLeft: '30px' }}>
      <input key={'Key'} placeholder={'Key'} name={'__key'} type="text" value={props.obj.__key}
             onChange={(event) => props.handleChildInput(event, props.index)}/>
      <input key={'Value'} placeholder={'Value'} name={'__value'} type="text" value={props.obj.__value}
             onChange={(event) => props.handleChildInput(event, props.index)}/>
      <button onClick={props.handleAdd}>+</button>
      <button onClick={() => props.handleRemove(props.index)}>-</button>
      <select name={'__type'}
              onChange={(event) => props.handleChangeChildType(event, props.index)}
              value={props.obj.__type}>
        {props.inputTypes.map((option) => (
          <option value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {props.obj.__type === 'object' &&
      <RecursiveForm obj={props.obj.__value}
                     handleChildInput={props.handleChildInput}
                     handleChangeChildType={props.handleChangeChildType}
                     handleAdd={props.handleAdd}
                     handleRemove={props.handleRemove}
                     index={props.index}
                     inputTypes={props.inputTypes}
      />}
    </div>
  );
};

export default RecursiveForm;
