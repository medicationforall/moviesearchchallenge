import React from 'react';
import {renderLabel} from './FormUtil';
import moment from 'moment';

/**
 * Date selector type input
 * @param {object} props
 * @returns {jsx}
 * @public
 */
function DateInput(props){
  const date = moment(props.value);
  let value = "";

  if(props.value){
    value = date.format('yyyy-MM-DD');
  }

  return (
    <React.Fragment>
      {renderLabel(props)}
      <div className="dateInput">
        <input
          type={props.type || "date"}
          value={value}
          onChange={props.change}
          disabled={props.disabled}
          ref={props.reference}
        ></input>
      </div>
    </React.Fragment>
  );
}

export default DateInput;
