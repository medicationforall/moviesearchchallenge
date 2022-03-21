import React from 'react';
import '../../css/confirmPrompt.css';

/**
 * Modal Alert prompt.
 * Alert display value is either open or closed.
 * @param {object} props
 * @author James Adams
 */
function LoadPrompt(props){
  let loadClass="loadPrompt "+props.loadDisplay;
  return (
    <div className={loadClass}>
      <div className="prompt">
        <div className="promptContent">
          <div>{props.message}</div>
        </div>
      </div>
    </div>
  );
}

export default LoadPrompt;
