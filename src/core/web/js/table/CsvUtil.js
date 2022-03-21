import TableSortUtil from './TableSortUtil';
import TableFilterUtil from './TableFilterUtil';
import {filterColumns} from './ColumnViewUtil';

import {saveAs} from 'file-saver';


/**
 * Collection of csv related util methods.
 * @author James Adams
 */

/**
 * @public
 */
function downloadCSV(columns, columnView, rows, renderer, sort, sorter, filter, fileName){
  const columnOrder = getColumnOrder(columns, columnView);
  const results = getRows(rows, columnOrder, columns, sort, sorter, filter);

  let text = _resolveCsvHeader(columnOrder);
  text += _resolveCsvRows(columnOrder, columns, renderer, results);

  var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
  saveAs(blob, fileName+".csv");
}


/**
 *
 */
function getColumnOrder(columns, columnView){
  let filteredColumns = filterColumns(columns, columnView);
  let columnOrder = filteredColumns.map(col=>col.id);
  return columnOrder;
}


/**
 *
 */
function getRows(rows, columnOrder, columns, sort, sorter, filter){
  let results = [...rows];
  let tableSortUtil = new TableSortUtil();
  let tableFilterUtil = new TableFilterUtil();

  results = tableFilterUtil.filterRows(
    columnOrder,
    results,
    filter
  );

  results = tableSortUtil.sortRows(
    columnOrder,
    results,
    sort,
    columns,
    sorter
  );

  return results;
}


/**
 * @private
 */
function _resolveCsvHeader(columnOrder){
  let header = '';
  columnOrder.every(col=>header+=col+',');
  header = header.slice(0,-1);
  header+='\n';
  return header;
}


/**
 * @private
 */
function _resolveCsvRows(columnOrder, columns, render, rows){
  let text = '';
  rows.every(row=>{
    columnOrder.every(col=>{
      let column = columns.filter(colDef=>colDef.id===col)[0];
      let value = row[col];
      if(render && render[col]){
        text+= render[col](value, row)+',';
      }else if(column.type==="string"){
        text+= _renderCsvString(value,row)+',';
      }else{
        text+= value+',';
      }
      return true;
    });
    text = text.slice(0,-1)+'\n';
    return true;
  });
  return text;
}


/**
 *
 */
function resolveRowsArray(columnOrder, columns, render, rows){
  let data = [];
  rows.every(row=>{
    let rowData = [];
    columnOrder.every(col=>{
      let column = columns.filter(colDef=>colDef.id===col)[0];
      let value = row[col];
      if(render && render[col]){
        rowData.push(render[col](value, row));
      }else if(column.type==="string"){
        rowData.push(value||"");
      }else{
        rowData.push(value||"");
      }
      return true;
    });
    data.push(rowData);
    return true;
  });
  return data;
}


/**
 * @private
 */
function _renderCsvString(data, row){
  //fix array
  if(data && data.constructor && data.constructor === Array){
    data = data.join(", ");
  }

  if(data && data.indexOf(',')!==-1){
    let value = data.replace(/"/g,'""');
    return '"'+value+'"';
  }else if(data === null){
    return "";
  }
  return data;
}

export {downloadCSV, getColumnOrder, getRows, resolveRowsArray};
