import React from 'react';
import {Link} from "react-router-dom";

function Header(props){
  return (
    <header>
      <div className="logo">
          <Link to="/">Movie Search Challenge</Link>
      </div>
      <nav>
        {props.children}
      </nav>
    </header>
  );
}

export default Header;
