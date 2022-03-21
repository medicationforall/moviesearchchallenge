import React from 'react';
import '../../css/wizard/progressBar.css';

/**
 *
 */
function ProgressBar(props){
  const points = props.steps.map(_renderPoint.bind(this, props));

  return (
    <div className="wizard">
      {points}
    </div>
  );
}


/**
 *
 */
function _renderPoint(props, step, index){
  const key = "point_"+index;
  const selectedStep = props.selected;
  let selected = '';

  if(selectedStep === step.id){
    selected = 'selected';
  }

  const className = "point "+selected;
  let line = null;

  if(index > 0){
    line = (<div className="line"><div></div></div>);
  }

  return (
    <div className={className} key={key}>
      <div className="label">{step.label}</div>
      <div className="dot"></div>
      {line}
    </div>
  );
}

export default ProgressBar;
