import moment from 'moment';

/**
 * @author James Adams
 */
function TableFilterUtil(){
  /**
   *
   */
  this.filterRows=function(columnOrder, rows, filter){
    let fRows = [...rows];
    for(let i=0,column;(column = columnOrder[i]);i++){
      if(filter && filter[column] !== undefined){
        fRows = fRows.filter(this._filterRow.bind(this, filter[column]));
      }
    }
    return fRows;
  };


  /**
   *
   */
  this._filterRow=function(filter, row){
    if(filter){
      const type = filter.type.charAt(0).toUpperCase() + filter.type.slice(1);
      const mode = filter.mode.charAt(0).toUpperCase() + filter.mode.slice(1);
      if(this['_filter'+type+mode]){
          return this['_filter'+type+mode](filter.value, row[filter.id], filter, row);
      }else{
        throw new Error('Could not resolve filter method _filter'+type+mode);
      }
    }else{
      return true;
    }
  };


  /**
   *
   */
  this._filterStringContains=function(search, data){
    if(data && data.toLowerCase().indexOf(search.toLowerCase()) !== -1){
      return true;
    }else{
      return false;
    }
  };


  /**
   *
   */
  this._filterStringNot=function(search, data){
    if(data && data.toLowerCase().indexOf(search.toLowerCase()) !== -1){
      return false;
    }else{
      return true;
    }
  };


  /**
   *
   */
  this._filterStringEquals=function(search, data){
    if(data){
      return data.toLowerCase() === search.toLowerCase();
    }else{
      return false;
    }

  };


  /**
   *
   */
  this._filterStringBegins=function(search, data){
    if(data){
      const sub = data.slice(0,search.length);
      return sub.toLowerCase() === search.toLowerCase();
    }else{
      return false;
    }
  };


  /**
   *
   */
  this._filterStringEnds=function(search, data){
    if(data){
      const sub = data.slice(-search.length);
      return sub.toLowerCase() === search.toLowerCase();
    }else{
      return false;
    }
  };


  /**
   *
   */
  this._filterIntEquals=function(search, data){
    const searchInt = parseInt(search);
    return searchInt === data;
  };


  /**
   *
   */
  this._filterIntGreater=function(search, data){
    const searchInt = parseInt(search);
    return  data > searchInt;
  };


  /**
   *
   */
  this._filterIntLesser=function(search, data){
    const searchInt = parseInt(search);
    return  data < searchInt;
  };


  /**
   *
   */
  this._filterIntRange=function(search, data, filter){
    const searchStart = parseInt(filter.value);
    const searchEnd = parseInt(filter.value2);
    return  data >= searchStart && data <= searchEnd;
  };


  /**
   *
   */
  this._filterFloatEquals=function(search, data){
    const searchFloat = parseFloat(search);
    return searchFloat === parseFloat(data);
  };


  /**
   *
   */
  this._filterFloatGreater=function(search, data){
    const searchFloat = parseFloat(search);
    return  parseFloat(data) > searchFloat;
  };


  /**
   *
   */
  this._filterFloatLesser=function(search, data){
    const searchFloat = parseFloat(search);
    return  parseFloat(data) < searchFloat;
  };


  /**
   *
   */
  this._filterFloatRange=function(search, data, filter){
    const searchStart = parseFloat(filter.value);
    const searchEnd = parseFloat(filter.value2);
    return  parseFloat(data) >= searchStart && parseFloat(data) <= searchEnd;
  };


  /**
   *
   */
  this._filterBooleanEquals=function(search, data, filter){
    var searchValue = (search === 'true');
    return searchValue === data;
  };


  /**
   *
   */
  this._filterDateEquals=function(search, data, filter){
    return search === data;
  };


  /**
   *
   */
  this._filterDateAfter=function(search, data, filter){
    const searchDate = moment(search);
    const dataDate = moment(data);
    return dataDate.isAfter(searchDate);
  };


  /**
   *
   */
  this._filterDateBefore=function(search, data, filter){
    const searchDate = moment(search);
    const dataDate = moment(data);
    return dataDate.isBefore(searchDate);
  };


  /**
   *
   */
  this._filterDateBetween=function(search, data, filter){
    const start = moment(filter.value);
    const end = moment(filter.value2);
    const date = moment(data);
    return date.isSameOrAfter(start) && date.isSameOrBefore(end);
  };
}

export default TableFilterUtil;
