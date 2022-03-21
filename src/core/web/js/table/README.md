# Dynamic Table

## Use
Flexible table that can sort and filter data, hide and re-order columns

## Column Structure
```json
{
    "columns": [
      {
        "id": "column-id",
        "label": "column-label",
        "type": "data-type", //string, int, float
        "filter": Boolean
      },
    ]
  }
  ```

  ## Sorting
  **sort** takes an object with column names as keys and "asc" to sort in ascending order or "desc" to sort in descending order
  ```json
  {
    columnName: 'asc',
    anotherColumnName: 'desc'
  }
  ```

  **updateSort** takes a function that will recieve an object with the clicked column name as key and either "asc" or "desc" as value. For increased functionality you may bind additional parameters to your function.

  See app/core/web/js/table/TableSortUtil.js for full functionality<br>
  See app/LoopTasks/web/js/content/manageHerd/SeeAHerd.js for usage example

  ## Filtering
  **filter**
  example of filter:
  ```json
  {
    id: "columnId"
    label: "columnLabel"
    mode: "contains"
    type: "string"
    value: "filterValue"
    value2: ""
  }
  ```

  **updateFilter** take a function that will recieve the id of the filtered columns and an object containing the filter. For increased functionality you may bind additional parameters to your function.

  See app/core/web/js/table/TableFilterUtil.js for full functionality<br>
