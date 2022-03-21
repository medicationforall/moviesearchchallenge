import React from 'react';
import DynamicTable from '../../../../core/web/js/table/DynamicTable';
import columns from '../../../json/resultsTableColumns.json';

function Table({movies}){
  console.log(movies);
  return(
    <div>
      <DynamicTable
        columns={columns}
        rows={movies}
      />
    </div>
  );
}

export default Table;
