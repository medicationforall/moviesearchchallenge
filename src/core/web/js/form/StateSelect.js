import React from 'react';
import Select from './Select';
import stateOptions from '../../json/stateOptions.json';


/**
 * State select component.
 * @param {object} props
 * @returns {jsx}
 * @public
 */
function StateSelect(props){
  let options = [<option value="">&nbsp;</option>];
  options = options.concat(stateOptions);
  return (
    <Select
      label={props.label}
      value={props.value}
      options={options}
      change={props.change}
      disabled={props.disabled}
      reference={props.reference}
    />
  );
}

export default StateSelect;
