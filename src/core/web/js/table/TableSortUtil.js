
/**
 * @author James Adams
 */
function TableSortUtil(){
  /**
   * Sort the rows and return the results.
   * @param {array} columnOrder Array of column id's to be displayed.
   * @param {array} rows rowData
   * @param {object} sort Key value pair column names, and the order it should be sorted in.
   * @param {array} columns Column definition data.
   * @returns {array}
   */
  this.sortRows=function(columnOrder, rows, sort, columns, customSort){
    for(let i=0,column;(column = columnOrder[i]);i++){
      if(sort && sort[column] !== undefined){
        let columnDef = this.getColumnDefinition(column, columns);
        let type = this._resolveType(columnDef.type);
        let direction = sort[column];

        if(this['_sort'+type] === undefined && (customSort === undefined || customSort[columnDef.type] === undefined)){
          if(type === 'Decimal' || type === 'decimal'){
            throw new Error('Sort decimal does not exist, try float instead');
          }else{
            throw new Error('Unrecognized column sort type '+type);
          }
        }

        if(columnDef.sortable === undefined || columnDef.sortable !== false){
          //Work on the rows object and modify the order.
          let callBack = null;
          if(customSort && customSort[columnDef.type]){
            callBack = customSort[columnDef.type].bind(this, direction, column);
          }else if(this['_sort'+type]){
            callBack = this['_sort'+type].bind(this, direction, column);
          }
          rows.sort(callBack);
        }
      }
    }
    return rows;
  };

  /**
   * Get a column definition.
   * @param {string} id
   * @param {array} columns
   * @return {object} The column definition.
   */
  this.getColumnDefinition=function(id, columns){
    for(let i=0,def;(def=columns[i]);i++){
      if(def.id === id){
        return def;
      }
    }
  };


  /**
   * Sort by integer comparator.
   * @param {string} dir either asc, or desc.
   * @param {string} key row data reference key.
   * @param {object} a row
   * @param {object} b row
   * @returns {int} returns 1 if higher, -1 if lower, 0 if no change.
   */
  this._sortInt=function(dir, key, a, b){
    let aVal = a[key]?parseInt(a[key]):0;
    let bVal = b[key]?parseInt(b[key]):0;

    if(aVal > bVal){
      return dir==='asc'? 1:-1;
    }else if(aVal < bVal){
      return dir==='asc'? -1: 1;
    }else{
      return 0;
    }
  };


  /**
   * Sort by integer comparator.
   * @param {string} dir either asc, or desc.
   * @param {string} key row data reference key.
   * @param {object} a row
   * @param {object} b row
   * @returns {int} returns 1 if higher, -1 if lower, 0 if no change.
   */
  this._sortFloat=function(dir, key, a, b){
    let aVal = a[key]?parseFloat(a[key]):0;
    let bVal = b[key]?parseFloat(b[key]):0;

    if(aVal > bVal){
      return dir==='asc'? 1:-1;
    }else if(aVal < bVal){
      return dir==='asc'? -1: 1;
    }else{
      return 0;
    }
  };


  /**
   * Sort by boolean comparator.
   * @param {string} dir either asc, or desc.
   * @param {string} key row data reference key.
   * @param {object} a row
   * @param {object} b row
   * @returns {int} returns 1 if higher, -1 if lower, 0 if no change.
   */
  this._sortBoolean=function(dir, key, a, b){
    let aVal = a[key].toString();
    let bVal = b[key].toString();

    if(aVal>bVal){
      return dir==='asc'? 1:-1;
    }else if(aVal < bVal){
      return dir==='asc'? -1: 1;
    }else{
      return 0;
    }
  };


  /**
   * Sort by string comparator.
   * @param {string} dir either asc, or desc.
   * @param {string} key row data reference key.
   * @param {object} a row
   * @param {object} b row
   * @returns {int} returns 1 if higher, -1 if lower, 0 if no change.
   */
  this._sortString=function(dir, key, a, b){
    let aVal = a[key]?a[key].toLowerCase():"";
    let bVal = b[key]?b[key].toLowerCase():"";

    if(aVal>bVal){
      return dir==='asc'? 1:-1;
    }else if(aVal < bVal){
      return dir==='asc'? -1: 1;
    }else{
      return 0;
    }
  };


  /**
   * Sort by datetime comparator.
   * @param {string} dir either asc, or desc.
   * @param {string} key row data reference key.
   * @param {object} a row
   * @param {object} b row
   * @returns {int} returns 1 if higher, -1 if lower, 0 if no change.
   */
  this._sortDateTime=function(dir, key, a, b){
    let aVal = a[key]?new Date(a[key]):0;
    let bVal = b[key]?new Date(b[key]):0;

    if(aVal>bVal){
      return dir==='asc'? 1:-1;
    }else if(aVal < bVal){
      return dir==='asc'? -1: 1;
    }else{
      return 0;
    }
  };


  /**
   * Sort by datetime comparator.
   * @param {string} dir either asc, or desc.
   * @param {string} key row data reference key.
   * @param {object} a row
   * @param {object} b row
   * @returns {int} returns 1 if higher, -1 if lower, 0 if no change.
   */
  this._sortDate = function(dir, key, a, b){
    let aVal = a[key]?new Date(a[key]):0;
    let bVal = b[key]?new Date(b[key]):0;

    if(aVal > bVal){
      return dir==='asc'? 1:-1;
    }else if(aVal < bVal){
      return dir==='asc'? -1: 1;
    }else{
      return 0;
    }
  };


  /**
   * Captitalize the first letter in the type string.
   * @param {string} type
   * @returns {string}
   */
  this._resolveType = function(type){
    let typeCap =  type.charAt(0).toUpperCase() + type.slice(1);
    return typeCap;
  };
}

export default TableSortUtil;
