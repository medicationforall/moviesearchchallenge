/**
 * Select the previous step.
 * @param {object} props
 * @param {array} steps
 * @param {string} key
 * @public
 */
function clickPrevious(props, steps, key){
  const selected = props.state[key];
  const selectedIndex = steps.findIndex(step=>{
    return step.id === selected;
  });

  let prevIndex = selectedIndex;
  if(prevIndex > 0){
    prevIndex--;
  }

  let state = {};
  state[key] = steps[prevIndex].id;
  props.updateState(props.stateName, state);
}


/**
 * Selects the new step.
 * @param {object} props
 * @param {array} steps
 * @param {string} key
 * @public
 */
function clickNext(props, steps, key){
  const selected = props.state[key];
  const selectedIndex = steps.findIndex(step=>{
    return step.id === selected;
  });

  let nextIndex = selectedIndex;
  if(nextIndex < steps.length){
    nextIndex++;
  }

  let state = {};
  state[key] = steps[nextIndex].id;
  props.updateState(props.stateName, state);
}

export {clickPrevious, clickNext};
