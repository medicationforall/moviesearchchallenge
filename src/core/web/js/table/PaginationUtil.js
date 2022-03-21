
/**
 * @author James Adams
 */
function PaginationUtil(){
  /**
   *
   */
  this.pageRows=function(rows, start, end){
    if(start !== undefined && end !== undefined){
      return rows.slice(start,end);
    }else{
      return rows;
    }
  };
}

export default PaginationUtil;
