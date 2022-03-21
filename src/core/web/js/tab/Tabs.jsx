import React from 'react';
import '../../css/tabs.css';

/**
 * @author James Adams
 */
function Tabs(props){
  return (<ul className="tabs">
    {props.list.map((def, index) => {
      let selected='tab ';
      if(props.selected===def.id){
          selected += 'selected';
      }
      return (
        <li
          className={selected}
          key={index}
          onClick={()=>props.clickHandler(def.id)}
        >
        {def.label}
        </li>
      );
    })}
  </ul>);
}

export default Tabs;
