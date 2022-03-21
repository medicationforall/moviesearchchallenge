import React from 'react';
import '../../css/Switch.css';
import {renderLabel} from './FormUtil';

/**
 * @author James Adams
 */
function Switch(props){
  return (
    <React.Fragment>
      {renderLabel(props)}
      <label className="switch">
        <input
          type="checkbox"
          name={props.name}
          checked={props.checked}
          onChange={props.change}
          ref={props.reference}
        />
        <span className="slider round"></span>
      </label>
  </React.Fragment>
  );
}


export default Switch;
