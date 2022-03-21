import React from 'react';
import Message from './Message';

function ErrorMessage(props){
  return (
    <Message
      type="error"
      duration={props.duration}
      message={props.message}
      close={props.close}
    />
  );
}

export default ErrorMessage;
