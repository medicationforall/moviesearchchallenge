import React from 'react';

/**
 * Thead component.
 * @param {object} props
 * @returns {jsx}
 * @public
 */
function Thead(props){
  let columns = [];

  for(let i=0, columnDef;(columnDef = props.columns[i]);i++){
    let column = _renderColumnHeader(props, columnDef);
    columns.push(column);
  }

  return (
    <thead>
      <tr>
        <td><div className="header-space"></div></td>
      </tr>
      <tr>
      {columns}
      </tr>
    </thead>
  );
}


/**
 * Render the column th tag.
 * @param {object} props
 * @param {object} columnDef
 * @returns {jsx}
 * @private
 */
function _renderColumnHeader(props, columnDef){
  let columnKey = "col_" + columnDef.id;

  let column = (
    <th
      key={columnKey}
      className={'sortable'}
    >
      <div className="thHeader">
        {_renderSortIcon(props, columnDef)}
        <span
          id={columnDef.id}
          onClick={props.columnSort}>{columnDef.label}</span>
        {_renderFilterIcon(props, columnDef)}
      </div>

    </th>
  );

  if(props.columnSort === null || columnDef.sortable === false){
    column = (
      <th
        key={columnKey}
        id={columnDef.id}
      >
        <div className="thHeader">
          <span></span>
          {columnDef.label}
          {_renderFilterIcon(props, columnDef)}
        </div>
      </th>
    );
  }

  return column;
}



/**
 *
 */
function _renderSortIcon(props, columnDef){
  if(props.sort && props.sort[columnDef.id]){
    if(props.sort[columnDef.id] === 'asc'){
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <title>Ascending Sort</title>
          <path fill="none" d="M0 0h24v24H0V0z"/>
          <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/>
        </svg>
      );
    }else if(props.sort[columnDef.id] === 'desc'){
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <title>Descending Sort</title>
          <path fill="none" d="M0 0h24v24H0V0z"/>
          <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/>
        </svg>
      );
    }
  }else{
    return (<span></span>);
  }
}


/**
 * Render the filter icon based on if a filter is set.
 * @param {object} props
 * @param {object} columnDef
 * @returns {jsx}
 * @private
 */
 function _renderFilterIcon(props, columnDef){
   if(columnDef.filter){
     let className = "filter";
     if(props.filter && props.filter[columnDef.id]){
       className += " set";
     }
     return (
       <svg
         xmlns="http://www.w3.org/2000/svg"
         enableBackground="new 0 0 24 24"
         height="24"
         viewBox="0 0 24 24"
         width="24"
         className={className}
         onClick={_clickFilter.bind(this, props, columnDef)}
       >
         <g>
           <title>Set Filter</title>
           <path d="M0,0h24 M24,24H0" fill="none"/>
           <path d="M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z"/>
           <path d="M0,0h24v24H0V0z" fill="none"/>
         </g>
       </svg>
     );
   }else{
     return null;
   }
}


/**
 * Click on a filter.
 * @param {object} props
 * @param {object} columnDef
 * @private
 */
function _clickFilter(props, columnDef){
  let state = Object.assign({},props.localState);
  state.filterDisplay = "open";
  state.SelectedFilterColumn=columnDef;
  props.updateLocalState(state);
}

export default Thead;
