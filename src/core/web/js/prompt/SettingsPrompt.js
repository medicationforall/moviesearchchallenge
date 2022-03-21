import React from "react";
import "../../css/confirmPrompt.css";

function SettingsPrompt(props) {
  let confirmClass="confirmPrompt "+props.display;
  return (
    <div className={confirmClass}>
      <div className="prompt">
        <div className="promptContent">
          <div>{props.children}</div>
          <button onClick={props.confirmClick}>Confirm</button>
          <button onClick={props.cancelClick}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPrompt;
