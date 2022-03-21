import React from 'react'; 
import _ from 'lodash';

/**
 * Collection of methods that are Single Page Application Aware.
 */

/**
 * Change event.
 * @param {object} props
 * @param {string} key
 * @param {Event} e
 * @public
 */
function change(props, key, e){
  const value = e.target.value;
  let state = _.cloneDeep(props.state);
  state[key]= value;
  props.updateState(props.stateName, state);
}


/**
 * Change event value to uppercase.
 * @param {object} props
 * @param {string} key
 * @param {Event} e
 * @public
 */
function changeUppercase(props, key, e){
  const value = e.target.value.toUpperCase();
  let state = _.cloneDeep(props.state);
  state[key]= value;
  props.updateState(props.stateName, state);
}


/**
 * Change checkbox value.
 * @param {object} props
 * @param {string} key
 * @param {Event} e
 * @public
 */
function changeBoolean(props, key, e){
  const value = e.target.checked;
  let state = _.cloneDeep(props.state);
  state[key]= value;
  props.updateState(props.stateName, state);
}


/**
 * Change date input field value.
 * @param {object} props
 * @param {string} key
 * @param {Event} e
 * @public
 */
function changeDate(props, key, e){
  const value = e.target.value+"T00:00:00";
  let state = _.cloneDeep(props.state);
  state[key]= value;
  props.updateState(props.stateName, state);
}


/**
 * Click a radio option.
 * This method meets requirements for the radioGroup component.
 * @param {object}
 * @param {string} key
 * @param value - type varies
 * @public
 */
function clickRadio(props, key, value) {
  let state = _.cloneDeep(props.state);
  state[key] = value;
  props.updateState(props.stateName,state);
}

/**
 * Click a checkbox option
 * @param {Object} props 
 * @param {String} key Key in props.state for selected checkboxes array
 * @param {String} value Checkbox interacted with
 */
 function clickCheckbox(props, key, value) {
  const state = _.cloneDeep(props.state);
  let checkedValues;
  if (props.state[key].includes(value)) {
    // If box was already checked, remove it from checked array
    checkedValues = props.state[key].filter((checked) => checked !== value);   
  } else {
    checkedValues = [...props.state[key], value];
  }

  state[key] = checkedValues;

  props.updateState(props.stateName, state);
}


/**
 *
 */
function renderLabel(props){
  if(props.label){
    return (<div className="label">{props.label}</div>);
  }else{
    return null;
  }
}


/**
 * Render an option object as an option tag.
 * @param {object} option
 * @param {int} index
 * @returns {jsx}
 * @private
 */
function renderOption(option, index){
  const key = "option_"+index;
  return (
    <option
      key={key}
      value={option.value}
      title={option.title}
    >
      {option.label}
    </option>
  );
}


export {
  renderLabel,
  renderOption,
  change,
  changeUppercase,
  changeBoolean,
  changeDate,
  clickRadio,
  clickCheckbox
};
