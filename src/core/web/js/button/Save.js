import React from 'react';
import Button from './Button';

function Save(props){
  let children = props.children || 'Save';
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
        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
      </svg>
      {children}
    </Button>);
}

export default Save;
