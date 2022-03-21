import React from 'react';
import '../../css/bar/percentBar.css';

function PercentBar(props){
  let value = _resolveValue(props);
  let max = _resolveMax(props);
  const percent = (value / max) * 100;
  const percentInverse = Math.floor((100 - percent));
  const style={"width": percentInverse + "%"};
  return (
    <div className="percentBarComponent">
      <div className="header">{props.label}</div>
      <div className="barContent">
        <div>{props.min}</div>
        <div className="percentBar" title={props.value}>
          <div className="progress" style={style}></div>
        </div>
        <div>{props.max}</div>
      </div>

    </div>
  );
}


/**
 *
 */
function _resolveValue(props){
  let value = parseFloat(props.value) - parseFloat(props.min);
  return value;
}


/**
 *
 */
function _resolveMax(props){
  let max = parseFloat(props.max) - parseFloat(props.min);
  return max;
}

export default PercentBar;
