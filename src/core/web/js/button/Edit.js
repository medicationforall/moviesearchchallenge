import React from 'react';
import Button from './Button';

function Edit(props){
  let children = props.children || 'Edit';
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
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
      </svg>
      {children}
    </Button>);
}

export default Edit;
