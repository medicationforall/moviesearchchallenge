/**
 * @param {object} props
 * @param {string} key
 * @public
 */
function closeMessage(props, key){
  let state = {};
  state[key]='';
  props.updateState(props.stateName, state);
}

export {closeMessage};
