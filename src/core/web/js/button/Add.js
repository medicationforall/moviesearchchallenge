import React from 'react';
import Button from './Button';

function Add(props){
  let children = props.children || 'Add';
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
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </svg>
      {children}
    </Button>);
}

export default Add;
