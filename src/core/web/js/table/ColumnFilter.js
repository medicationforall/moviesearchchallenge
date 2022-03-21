import React from 'react';
import _ from "lodash";
import FilterPrompt from '../prompt/FilterPrompt';

/**
 *
 */
function ColumnFilter(props){
  let filter = null;
  if(props.filter && props.localState.SelectedFilterColumn && props.localState.SelectedFilterColumn.id){
    filter = props.filter[props.localState.SelectedFilterColumn.id];
  }

  return (
    <FilterPrompt
      display={props.localState.filterDisplay}
      columnDef={props.localState.SelectedFilterColumn}
      filter={filter}
      cancelClick={_cancelFilterClick.bind(this, props)}
      confirmClick={_confirmFilterClick.bind(this, props)}
    />
  );
}


/**
 *
 */
function _confirmFilterClick(props, filter){
  let colName = props.localState.SelectedFilterColumn.id;
  let state = _.cloneDeep(props.localState);
  state.filterDisplay='closed';
  state.SelectedFilterColumn=null;
  props.updateLocalState(state);
  props.updateFilter(colName, filter);
}


/**
 *
 */
function _cancelFilterClick(props){
  let state = _.cloneDeep(props.localState);
  state.filterDisplay='closed';
  state.SelectedFilterColumn=null;
  props.updateLocalState(state);
}

export default ColumnFilter;
