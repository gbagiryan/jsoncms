import React from 'react';

const RecursiveForm = (props) => {

  return (
    <div>
      {props.objs.map((obj, index) => (
        <div style={{ marginLeft: '30px' }}>
          <input key={'Key'} placeholder={'Key'} name={'__key'} type="text" value={obj.__key}
                 onChange={(event) => props.handleChildInput(event, props.index ? `${props.index}.${index}` : `${index}`)}/>
          {obj.__type === 'string' &&
          <input key={'Value'} placeholder={'Value'} name={'__value'} type="text" value={obj.__value}
                 onChange={(event) => props.handleChildInput(event, props.index ? `${props.index}.${index}` : `${index}`)}/>
          }
          <button onClick={() => props.handleAdd(props.index ? `${props.index}` : null)}>+</button>
          <button onClick={() => props.handleRemove(props.index ? `${props.index}` : null, index)}>-</button>
          <select name={'__type'}
                  onChange={(event) => props.handleChangeChildType(event, props.index ? `${props.index}.${index}` : `${index}`)}
                  value={obj.__type}>
            {props.inputTypes.map((option) => (
              <option value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {obj.__type === 'object' &&
          <RecursiveForm objs={obj.__value}
                         handleChildInput={props.handleChildInput}
                         handleChangeChildType={props.handleChangeChildType}
                         handleAdd={props.handleAdd}
                         handleRemove={props.handleRemove}
                         index={props.index ? `${props.index}.${index}` : `${index}`}
                         inputTypes={props.inputTypes}
          />}
        </div>
      ))}
    </div>
  );
};

export default RecursiveForm;
