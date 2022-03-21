import React, {useState, useEffect} from "react";
import { camelCase } from "lodash";
import "../../css/checkbox.css";

/**
 * Checkbox with ability to add custom css when checked
 * @param {*} props 
 * @returns {JSX}
 */
function Checkbox(props) {
  const [id, setId] = useState('');
  const [labelClassName, setLabelClassName] = useState('checkbox mainLabel unchecked');
  const [checkboxClassName, setCheckboxClassName] = useState('customCheckbox');

  useEffect(() => {
    setId(_getID(props.label));
  }, [props.label]);

  useEffect(() => {
    if(props.checked){
      setLabelClassName((className) => className.replace('unchecked', 'checked'));
      if (props.checkedClass) {
        // Add custom checked class name
        setCheckboxClassName(`customCheckbox ${props.checkedClass}`);
      }
    } else {
      setLabelClassName('checkbox mainLabel unchecked');
      setCheckboxClassName('customCheckbox');
    }
  }, [props.checked, props.checkedClass]);

  return (
    <label className={labelClassName}>
      <span className="checkmark">
        <div className="checkmark_stem"></div>
        <div className="checkmark_kick"></div>
      </span>
      {props.label}
      <input
        type="checkbox"
        id={id}
        name={props.label}
        value={props.value}
        checked={props.checked}
        onChange={(e) => props.handleChange(e.target.value)}
      />
      <span className={checkboxClassName}></span>
    </label>
  );
}

function _getID(label) {
  const labelName = camelCase(label);
  const id = labelName + 'Checkbox';
  return id;
}

export default Checkbox;
