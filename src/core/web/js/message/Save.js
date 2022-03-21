import React from 'react';
import Message from './Message';

function SaveMessage(props){
  return (
    <Message
      type="save"
      duration={props.duration}
      message={props.message}
      close={props.close}
    />
  );
}

export default SaveMessage;
