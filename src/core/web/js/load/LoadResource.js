import React from 'react';
import '../../css/loadResource.css';

function LoadResource(props){
  if(props.error){
    return (
      <div className="loadResource">
        {_renderError(props.error)}
      </div>
    );
  }else if(props.item){
    return (
      <React.Fragment>
        {props.children}
      </React.Fragment>
    );
  }else{
    props.load();
    return (
      <div className="loadResource">
        {_renderLoad()}
      </div>
    );
  }
};


/**
 *
 */
function _renderLoad(){
  return (
    <div className="content">
      <div className="loading">
        Loading ...
        <div className="loader"></div>
      </div>
    </div>
  );
}


/**
 *
 */
function _renderError(error){
  return (
    <div className="content">
      <div className="error">
        {error}
      </div>
    </div>
  );
}

export default LoadResource;
