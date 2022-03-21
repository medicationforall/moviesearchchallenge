import React from 'react';

/**
 * Core Framework button component.
 * @param {object}
 * @public
 */
function Button(props){
  return (
    <button
      disabled={props.disabled}
      title={_getTitle(props)}
      className={_getClassName(props)}
      onClick={props.onClick}
    >
      {_renderContent(props)}
    </button>
  );
}


/**
 * Get button title.
 * @param {object} props
 */
function _getTitle(props){
  if(props.title){
    return props.title;
  }else{
    return null;
  }
}

/**
 * Get img alt.
 * @param {object} props
 */
function _getAlt(props){
  if(props.title){
    return props.title;
  }else{
    return "";
  }
}


/**
 * Get the button className from props
 * @param {object} props
 * @returns {string}
 * @private
 */
function _getClassName(props){
  let className =  props.type || "";
  if(props.className){
    className+=' '+props.className;
  }
  return className;
}


/**
 * Determine what needs to be displayed and render it.
 * @param {object} props
 * @returns {jsx}
 * @private
 */
function _renderContent(props){
  if(props.icon && props.children){
    return (
      <React.Fragment>
        <img src={props.icon} alt={_getAlt(props)} />
        &nbsp;
        {props.children}
      </React.Fragment>
    );
  }
  else if(props.icon){
    return (<img src={props.icon} alt={_getAlt(props)} />);
  }
  else if(props.children){
    return (props.children);
  }else{
    return null;
  }
}

export default Button;
