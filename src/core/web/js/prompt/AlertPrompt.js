import React from 'react';
import '../../css/confirmPrompt.css';

/**
 * Modal Alert prompt.
 * Alert display value is either open or closed.
 * @param {object} props
 * @author James Adams
 */
function AlertPrompt(props){
  let alertClass="alertPrompt "+props.alertDisplay;
  return (
    <div className={alertClass}>
      <div className="prompt">
        <div className="promptContent">
          <div>{props.message}</div>
          <button onClick={props.confirmClick}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default AlertPrompt;
