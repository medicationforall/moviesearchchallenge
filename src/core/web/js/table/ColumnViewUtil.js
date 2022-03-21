import _ from "lodash";

/**
 * @author James Adams
 * @todo Break up this method it's doing too much.
 */
function filterColumns(columns, columnView, columnOrder){
  let originView = columns.reduce((hash,columnDef)=>{
    if(columnDef.view === undefined){
      hash[columnDef.id] = true;
    }else{
      hash[columnDef.id] = columnDef.view;
    }
    return hash;
  },{});

  const defaultView = Object.assign(_.cloneDeep(originView),columnView);
  const filteredColumns = columns.reduce((newList, colDef)=>{
    if(defaultView[colDef.id]){
      newList.push(colDef);
    }
    return newList;
  },[]);
  return filteredColumns;
}

/**
 * very clever
 * https://stackoverflow.com/a/44063445
 */
function orderColumns(columns, columnOrder=[]){
  let orderedColumns = [...columns];
  orderedColumns.sort(function(a, b){
    const aIndex = columnOrder.indexOf(a.id) || 0;
    const bIndex = columnOrder.indexOf(b.id) || 0;
    return aIndex - bIndex;
  });

  const originOrder = orderedColumns.map(column=>{
    return column.id;
  });

  return {orderedColumns, originOrder};
}

export {filterColumns, orderColumns};
