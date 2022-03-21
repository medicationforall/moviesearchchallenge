import React from 'react';
import TableSortUtil from './TableSortUtil';
import TableFilterUtil from './TableFilterUtil';
import PaginationUtil from './PaginationUtil';

import moment from 'moment';
import { camelCase } from 'lodash';

/**
 * Tbody component.
 */
class Tbody extends React.Component{
  /**
   * @param {object} props
   */
  constructor(props){
    super(props);
    TableSortUtil.call(this);
    TableFilterUtil.call(this);
    PaginationUtil.call(this);
  }


  /**
   * Render the Tbody component.
   * @returns {jsx}
   */
  render(){
    let columnOrder = this._resolveColumnOrder(this.props.columns, this.props.columnOrder);
    let filteredRows = this.filterRows(
      columnOrder,
      this.props.rows.slice(),
      this.props.filter
    );

    let sortedRows = this.sortRows(
      columnOrder,
      filteredRows,
      this.props.sort,
      this.props.columns,
      this.props.customSort
    );

    let pageRows = this.pageRows(
      sortedRows,
      this.props.pageStart,
      this.props.pageEnd
    );

    let columnKeys = this._getKeys(this.props.columns);

    let jsxRows = pageRows.map(this._createRow.bind(
      this,
      columnOrder,
      this.props.filteredColumns,
      this.props.columns,
      this.props.render,
      this.props.selection,
      this.props.rowSelect,
      this.props.rowClassKey,
      columnKeys
    ));
    return (
      <tbody>
        {jsxRows}
      </tbody>
    );
  }


  /**
   * Loop through the columns definitions and create a list of column id's.
   * @param {array} columns
   * @returns {array}
   */
  _resolveColumnOrder(columns, columnOrder){
    if(columnOrder && columnOrder.length>0){
      return columnOrder;
    }else{
      return columns.map(col=>col.id);
    }
  }


  /**
   * Create a row to add to the Tbody.
   * @param {array} columnOrder
   * @param {array} columnDefs
   * @param {object} render defaults to an empty object if undefined.
   * @param {array} selection
   * @param {function} rowSelect
   * @param {string} rowClassKey key name for where row specific class names are stored in the rowData.
   * @param {object} rowData
   * @param {int} index
   * @returns {jsx}
   */
  _createRow(columnOrder, filteredColumns, columnDefs, render={}, selection, rowSelect, rowClassKey, columnKeys, rowData, index){
    let rowKey = this._getRowKey(rowData, columnKeys, index);
    let rowClass = '';
    let keyValue ='';
    let cells=[];
    for(let i=0,key;(key=columnOrder[i]);i++){
      let cellKey = "cell"+index+key;
      if(rowData.hasOwnProperty(key) || render[key]){
        let filteredColumnDef = this.getColumnDefinition(key, filteredColumns);
        let columnDef = this.getColumnDefinition(key,columnDefs);
        if(columnDef.primary){
          if(selection && selection.length>0 && selection.indexOf(rowData[key])!==-1){
            rowClass = 'selected';
          }
          keyValue = rowData[key];
        }

        if(filteredColumnDef){
          let value = this._formatDisplayValue(columnDef, rowData[key], render[key], rowData);
          cells.push(<td key={cellKey}>{value}</td>);
        }
      } else{
        let filteredColumnDef = this.getColumnDefinition(key, filteredColumns);
        if(filteredColumnDef){
          cells.push(<td key={cellKey}></td>);
        }
      }
    }

    if(rowClassKey && rowData[rowClassKey]){
      rowClass+=' '+rowData[rowClassKey];
      rowClass = rowClass.trim();
    }

    return (
      <tr
        className={rowClass}
        key={rowKey}
        data-keyvalue={keyValue}
        onClick={rowSelect}
        >
        {cells}
      </tr>
    );
  }


  /**
   * Format the displayed value.
   * Default is presumed string.
   * @param {object} columnDef
   * @param data the cells value.
   * @param {function} render
   * @param {object} rowData The entire rows dataset.
   * @returns {jsx}
   */
  _formatDisplayValue(columnDef, data, render, rowData){
    let value = data;

    if(render){
      value = render(data, rowData);
    } else if(columnDef.type==='dateTime'){
      let tmpValue = moment(data).toDate();
      value = tmpValue.toLocaleDateString("en-US") +' '+tmpValue.toLocaleTimeString("en-US");
    } else if(columnDef.type==='date'){
      let tmpValue = moment(data).toDate();
      value = tmpValue.toLocaleDateString("en-US");
    } else if(columnDef.type==='boolean'){
      value = data.toString();
    } else if(columnDef.type==='string' && data && data.constructor && data.constructor === Array && data.length >0){
      value = data.join(", ");
    } else if(columnDef.type==='string' && data && data.constructor && data.constructor === Object){
      value = JSON.stringify(data,null,2);
    }
    return value;
  }

  _getKeys(columns){
    let keys = [];
    const primaryKeyColumn = columns.filter((column) => column.primary);

    if (primaryKeyColumn.length === 1) {
      keys.push(primaryKeyColumn[0].id);
    } else if (primaryKeyColumn.length > 1) {
      keys = primaryKeyColumn.map(entry => entry.id);
      console.warn('Multiple primary keys found');
    } else {
      const compositeKeys = columns.filter((column) => column.composite);
      if (compositeKeys.length) {
        keys = compositeKeys.map(entry => entry.id);
      }
    }

    return keys;
  }

  _getRowKey(rowData, keys, index) {
    if (keys.length === 1) {
      // Primary key from columns
      const key = keys[0];
      const rowKey = camelCase(rowData[key]);
      return rowKey;
    } else if (keys.length > 1) {
      // Composite keys or multiple primary keys
      const joinedKeys = keys.map((k) => rowData[k]).join('_');
      const rowKey = camelCase(joinedKeys);
      return rowKey;
    } else {
      console.warn("No unique key found. Index will be used for row key, which may cause performance issues");
      return index;
    }
  }
}

export default Tbody;
