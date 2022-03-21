import React from 'react';
import '../../css/confirmPrompt.css';

/**
 * Modal confirm prompt.
 * confirm display value is either open or closed.
 * @param {object} props
 * @author James Adams
 */
function ConfirmPrompt(props){
  let confirmClass="confirmPrompt "+props.confirmDisplay;
  return (
    <div className={confirmClass}>
      <div className="prompt">
        <div className="promptContent">
          <div>{props.message}</div>
          <button onClick={props.confirmClick}>Confirm</button>
          <button onClick={props.cancelClick}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPrompt;
