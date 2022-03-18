import React from 'react';
import {Link} from "react-router-dom";

function Header(props){
  return (
    <header>
      <div className="logo">
        <Link to="/">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M0 0h512v512H0z" fill="#000000" fillOpacity="0.00"></path>
            <path className="projector" d="M266 51.727c-39.32 0-71 31.68-71 71 0 39.319 31.68 71.002 71 71.002s71-31.683 71-71.002c0-39.32-31.68-71-71-71zm-144 32c-30.483 0-55 24.517-55 55 0 30.482 24.517 55.002 55 55.002s55-24.52 55-55.002c0-30.483-24.517-55-55-55zm-23 128v110.002h238V211.727zm350 4.648l-94 40.285v20.133l94 40.285zm-386 2.352v32h18v-32zm113 121.002v17.998h13.012l-51.123 136.275h19.222l51.507-136.275.382 136.275h18l.382-136.275 51.507 136.275h19.222l-51.123-136.275H260v-17.998c-28.003-.003-55.997 0-84 0z" fillOpacity="1">
            </path>
          </svg>
          <span className="title">Movie Search Challenge</span>
        </Link>
      </div>
      <nav>
        {props.children}
      </nav>
    </header>
  );
}

export default Header;
