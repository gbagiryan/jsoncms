import React from 'react';

const RecursiveForm = (props) => {

  return (
    <div>
      {props.objs.map((obj, index) => (
        <div style={{ marginLeft: '30px' }}>
          <input key={'Key'} placeholder={'Key'} name={'__key'} type="text" value={obj.__key}
                 onChange={(event) => props.handleChildInput(event, `${props.index}${index}`)}/>
          <input key={'Value'} placeholder={'Value'} name={'__value'} type="text" value={obj.__value}
                 onChange={(event) => props.handleChildInput(event, `${props.index}${index}`)}/>
          <button onClick={props.handleAdd}>+</button>
          <button onClick={() => props.handleRemove(`${props.index}${index}`)}>-</button>
          <select name={'__type'}
                  onChange={(event) => props.handleChangeChildType(event, `${props.index}${index}`)}
                  value={obj.__type}>
            {props.inputTypes.map((option) => (
              <option value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {obj.__type === 'object' &&
          <RecursiveForm obj={obj[index].__value}
                         handleChildInput={props.handleChildInput}
                         handleChangeChildType={props.handleChangeChildType}
                         handleAdd={props.handleAdd}
                         handleRemove={props.handleRemove}
                         index={`${props.index}${index}`}
                         inputTypes={props.inputTypes}
          />}
        </div>
      ))}
    </div>
  );
};

export default RecursiveForm;
