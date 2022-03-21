import React from 'react';
import _ from "lodash";

/**
 * Collection of pagestate aware dynamic table functions.
 * @author James Adams
 */

 /**
  *
  */
function updateSort(props, key, sort){
  let state =  _.cloneDeep(props.state);
  state[key] = sort;
  props.updateState(props.stateName, state);
}

/**
 *
 */
function updateSortPaged(props, sortKey, count=0, pageEndKey, pageCountKey, sort){
  let state =  _.cloneDeep(props.state);
  state[sortKey] = sort;
  let end = count;

  if(end > state[pageCountKey]){
    end = state[pageCountKey];
  }

  state[pageEndKey] = end;
  props.updateState(props.stateName, state);
};


/**
 *
 */
function updatePage(props, startKey, endKey, start, end){
  let state =  _.cloneDeep(props.state);
  state[startKey] = start;
  state[endKey] = end;
  props.updateState(props.stateName, state);
}


/**
 *
 */
function updateSelectionString(props, key, selection){
  let state =  _.cloneDeep(props.state);
  state[key] = [selection];
  props.updateState(props.stateName, state);
}


/**
 *
 */
function updateSelection(props, key, selection){
  let state =  _.cloneDeep(props.state);
  state[key] = [parseInt(selection)];
  props.updateState(props.stateName, state);
}


/**
 *
 */
function updateFilter(props, filterName, colName, filter){
  let state =  _.cloneDeep(props.state);
  state[filterName][colName] = filter;
  props.updateState(props.stateName,state);
}

/**
 *
 */
function updateColumnView(props, viewKey, columns){
  let state =  _.cloneDeep(props.state);
  state[viewKey] = columns;
  props.updateState(props.stateName,state);
}


/**
 *
 */
function updateColumnViewOrder(props, viewKey, orderKey, columns, order){
  let state =  _.cloneDeep(props.state);
  state[viewKey] = columns;
  state[orderKey] = order;
  props.updateState(props.stateName,state);
}


/**
 *
 */
function renderSize(data,row){
  let kb = data / 1024;
  kb = Math.round( kb * 10 ) / 10;
  if(kb < 1024){
    return (<span>{kb} kb</span>);
  }else{
    let mb = kb / 1024;
    mb = Math.round( mb * 10 ) / 10;
    return (<span>{mb} mb</span>);
  }
};


/**
 *
 */
function renderCurrency(data, row){
  const amount = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(data);
  return (<div className="currency">{amount}</div>);
}


/**
 * Render the numeric value with locale formatting.
 * @param data
 * @param {object} row
 * @returns {jsx}
 * @private
 */
function renderLocaleNumber(data, row){
  let value = parseFloat(data);
  return (<div className="number">{value.toLocaleString()}</div>);
}


function renderDate(value, row){
  if(value){
    return new Date(value).toLocaleDateString();
  }else{
    return '';
  }
}

export {
  updateSort,
  updateSortPaged,
  updatePage,
  updateSelection,
  updateSelectionString,
  updateFilter,
  updateColumnView,
  updateColumnViewOrder,
  renderSize,
  renderCurrency,
  renderLocaleNumber,
  renderDate
};
