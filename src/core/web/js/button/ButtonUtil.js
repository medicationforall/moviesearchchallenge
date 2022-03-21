/**
 * Reset the state of the page.
 * @param {object} props
 * @param {object} mixin overrides for the default state values.
 * @private
 */
function resetPage(props, mixin={}){
  props.resetState(props.stateName, mixin);
}

export {resetPage};
