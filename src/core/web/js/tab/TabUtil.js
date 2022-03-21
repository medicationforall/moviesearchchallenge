/**
 * Handle Tab click
 * @param {object} props
 * @param {string} key
 * @param {string} value
 * @public
 */
function handleTabClick(props, key, value){
  let state = {};
  state[key] = value;
  props.updateState(props.stateName,state);
};
export {handleTabClick};
