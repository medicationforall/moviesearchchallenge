/**
 * Set a state prompt key to open.
 * @param {object} props
 * @param {string} key
 * @public
 */
function openPrompt(props, key){
    let state = {};
    state[key] = 'open';
    props.updateState(props.stateName,state);
}


/**
 * Set a state prompt key to closed.
 * @param {object} props
 * @param {string} key
 * @public
 */
function closePrompt(props, key){
    let state = {};
    state[key] = 'closed';
    props.updateState(props.stateName,state);
}

/**
 * Cancel a confirm dialog.
 * @param {object} props
 * @private
 */
 function cancelConfirmClick(props, displayKey, messageKey){
   let state = {};
   state[displayKey] = 'closed';
   state[messageKey] = '';
   props.updateState(props.stateName,state);
 }

export {openPrompt, closePrompt, cancelConfirmClick};
