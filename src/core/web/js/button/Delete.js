import React from 'react';
import Button from './Button';

function Delete(props){
  let children = props.children || 'Delete';
  return (
    <Button
      disabled={props.disabled}
      title={props.title}
      className={props.className}
      onClick={props.onClick}
      type={props.type}
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
      </svg>
      {children}
    </Button>);
}

export default Delete;
