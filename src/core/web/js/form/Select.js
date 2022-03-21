import React from 'react';
import {renderLabel, renderOption} from './FormUtil';


/**
 * Input select component.
 * @author James Adams
 * @param {object} props
 * @returns {jsx}
 * @public
 */
function Select(props){
  const options = props.options.map(renderOption);
  return (
    <React.Fragment>
      {renderLabel(props)}
      <div className="selectInput">
        <select
          className={props.className}
          value={props.value}
          onChange={props.change}
          disabled={props.disabled}
          ref={props.reference}
        >
          {options}
        </select>
      </div>
    </React.Fragment>
  );
}

export default Select;
