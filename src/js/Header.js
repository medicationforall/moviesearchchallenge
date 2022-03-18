import React from 'react';
import {Link} from "react-router-dom";

function Header(props){
  return (
    <header>
      <div className="logo"><a href="/">Movie Search Challenge</a></div>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
}

export default Header;
