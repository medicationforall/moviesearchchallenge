import React from 'react';
import {renderLabel} from './FormUtil';

/**
 * @author James Adams
 **/
function TextInput(props){
  let value = '';
  if(props.value !== null && props.value !== undefined){
    value = props.value;
  }

  return (
    <React.Fragment>
      {renderLabel(props)}
      <div>
        <input
          type={props.type||"text"}
          value={value}
          onChange={props.change}
          disabled={props.disabled}
          maxLength={props.maxLength}
          min={props.min}
          max={props.max}
          step={props.step}
          autoComplete={props.autoComplete}
          ref={props.reference}
        ></input>
      </div>
    </React.Fragment>
  );
}

export default TextInput;
