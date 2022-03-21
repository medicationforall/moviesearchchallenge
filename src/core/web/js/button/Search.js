import React from "react";
import Button from "./Button";

function Search(props) {
  let children = props.children || "Search";
  return (
    <Button
      disabled={props.disabled}
      title={props.title}
      className={props.className}
      onClick={props.onClick}
      type={props.type}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="search"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      {children}
    </Button>
  );
}

export default Search;
