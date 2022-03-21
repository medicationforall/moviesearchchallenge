import React from 'react';
import {renderLabel} from './FormUtil';

/**
 * @author James Adams
 **/
function Textarea(props){
  return (
    <React.Fragment>
      {renderLabel(props)}
      <div className="textAreaWrapper">
        <textarea
          value={props.value||""}
          onChange={props.change}
          disabled={props.disabled}
          ref={props.reference}
        ></textarea>
      </div>
    </React.Fragment>
  );
}

export default Textarea;
