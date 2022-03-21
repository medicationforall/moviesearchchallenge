import React, {useEffect} from 'react';
import '../../css/message/message.css';
import closeIcon from '../../images/close-24px.svg';

function Message(props){
  useEffect(() => {
    if(props.duration && props.message){
      const timer = setTimeout(props.close, props.duration);
      return () => clearTimeout(timer);
    }
  }, [props.duration, props.message, props.close]);

  if(props.message){
    const className= "message "+_getClassName(props);
    return (<div className={className} onClick={props.close}><img src={closeIcon} alt="Close Message" />{props.message}</div>);
  }else{
    return null;
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

export default Message;
