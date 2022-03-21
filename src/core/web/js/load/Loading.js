import React from "react";
import "../../css/loadResource.css";

/**
 * Simple loader placeholder
 * @returns {jsx}
 */
function Loading() {
  return (
    <div className="loadResource">
      <div className="content">
        <div className="loading" id="selectionLoader">
          <div className="loader"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
