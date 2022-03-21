import React from 'react';
import '../../css/radioGroup.css';
import {renderLabel} from './FormUtil';

/**
 * Radio group control that present multiple radio choices for selection.
 * @author James Adams
 * @public
 */
function RadioGroup(props){
  let options = props.options.map(_renderOption.bind(this, props));
  return (
    <React.Fragment>
      {renderLabel(props)}
      <div className="radioGroup">{options}</div>
    </React.Fragment>
  );
}


/**
 * Render the option as jsx
 * @param {object} props
 * @param {object} data meta information
 * @param {int} index
 * @private
 */
function _renderOption(props, data, index){
  const key = "radioOption_" + index;
  return (
    <div
      className="radio"
      key={key}
      onClick={_radioClick.bind(this, props, props.name, data.value)}
      title={"Select " + data.label}
    >
      <input
        type="radio"
        name={props.name}
        value={data.value}
        checked={props.value === data.value}
        onChange={_radioClick.bind(this, props, props.name, data.value)}
      />
      &nbsp;
      <span>{data.label}</span>
    </div>
  );
}


/**
 * Radio click event
 * @param {object} props
 * @param {string} name of the group control
 * @param {object} value selected choice
 * @private
 */
function _radioClick(props, name, value){
  props.onClick(name, value);
}

export default RadioGroup;
