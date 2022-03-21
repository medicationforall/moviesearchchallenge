import React from 'react';
import {renderLabel, renderOption} from './FormUtil';

/**
 * Fitering select is similiar to a select control,
 * but it also allows the entry of new values.
 * @param {object} props
 * @returns {jsx}
 * @public
 */
function FilteringSelect(props){
  const options = props.options.map(renderOption);
  return (
    <React.Fragment>
      {renderLabel(props)}
      <div>
        <input
          type="text"
          value={props.value}
          onChange={props.change}
          list={props.name}
          disabled={props.disabled}
          ref={props.reference}
        >
        </input>
        <datalist id={props.name}>
          {options}
        </datalist>
      </div>
    </React.Fragment>
  );
}

export default FilteringSelect;
