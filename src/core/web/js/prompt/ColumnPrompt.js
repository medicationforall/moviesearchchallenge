import React, {useState, useEffect} from 'react';
import _ from "lodash";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import '../../css/confirmPrompt.css';
import Switch from '../form/Switch';
import {orderColumns} from '../table/ColumnViewUtil';
import visiblityIcon from '../../images/visibility-24px.svg';
import visiblityOffIcon from '../../images/visibility_off-24px.svg';

/**
 * Modal confirm prompt.
 * confirm display value is either open or closed.
 * @param {object} props
 * @author James Adams
 * @public
 */
function ColumnPrompt(props){
  //local state
  const [originView, setOriginView] = useState({});
  const [order, setOrder] = useState([]);
  const [columns, setColumns] = useState({});
  const [reset, setReset] = useState({});
  
  useEffect(() => {
    const {orderedColumns, originOrder} = orderColumns(props.columns, props.columnOrder);

    //override user view values
    const originViewFromOrderedColumns = _resolveDefaultViewValues(orderedColumns);
    const defaultView = Object.assign(_.cloneDeep(originViewFromOrderedColumns), props.columnView);

    setOriginView(originViewFromOrderedColumns);
    setColumns(defaultView);
    setReset({order: originOrder, view: defaultView});
    setOrder([...originOrder]);
  }, [props.columns, props.columnView, props.columnOrder]);


  //render stuff
  const columnNodes = order.map(
    _renderColumn.bind(this, props, columns, setColumns, props.columns)
  );

  let confirmClass="confirmPrompt columnPrompt "+props.display;
  return (
    <div className={confirmClass}>
      <div className="prompt">
        <div className="promptContent">
          <DragDropContext
            onDragEnd={_onDragEnd.bind(this, order, setOrder)}
          >
            <div className="columnContainer">
              <Droppable droppableId="columns">
                {_renderColumnNodes.bind(this, columnNodes)}
              </Droppable>
            </div>
          </DragDropContext>
          <button className="primary" onClick={_confirmClick.bind(this, props, columns, order, originView)}>Apply</button>
          <button onClick={_resetClick.bind(this, props, reset, setColumns, setOrder)}>reset</button>
          <button onClick={props.cancelClick}>Cancel</button>
        </div>
      </div>
    </div>
  );
}


function _renderColumnNodes(columnNodes, provided){
  return (
    <div
      className="columnList"
      ref={provided.innerRef}
      {...provided.droppableProps}
    >
      {columnNodes}
      {provided.placeholder}
    </div>
  );
}


/**
 *
 */
function _onDragEnd(order, setOrder, result){
  const {source, destination, draggableId} = result;
  if(!destination){
    console.debug('no destination');
    return;
  }

  if(destination.droppableId === source.droppableId && destination.index === source.index){
    console.debug('no work to be done');
    return;
  }

  let newOrder = [...order];
  newOrder.splice(source.index, 1);
  newOrder.splice(destination.index, 0, draggableId);
  setOrder(newOrder);
}


/**
 * If the column dev view is undefined the default view value is true.
 * This method fills in the default value.
 * @param {object} props
 * @return {object} columnName => boolean
 * @private
 */
function _resolveDefaultViewValues(columns){
  const viewValues = columns.reduce((hash,columnDef)=>{
    if(columnDef.view === undefined){
      hash[columnDef.id] = true;
    }else{
      hash[columnDef.id] = columnDef.view;
    }
    return hash;
  },{});
  return viewValues;
}


/**
 * Render the list of selectable columns.
 * @param {object} props
 * @param {object} columns local component state
 * @param {object} setColumns callback for columns state
 * @param {array} colDefs column definitions
 * @param {string} colName
 * @param {int} index
 * @returns {jsx}
 * @private
 */
function _renderColumn(props, columns, setColumns, colDefs, colName, index){
  const colDef = colDefs.reduce((object, columnDef)=>{
    if(columnDef.id ===colName){
      object = columnDef;
    }
    return object;
  },{});
  const key = colDef.id;

  return (
    <React.Fragment key={key}>
      <Draggable draggableId={key} index={index}>
      {_renderColumnContent.bind(this, props, colDef, columns, setColumns)}
      </Draggable>
    </React.Fragment>
  );
}


/**
 *
 */
function _renderColumnContent(props, colDef, columns, setColumns, provided){
  const icon = columns[colDef.id]?visiblityIcon:visiblityOffIcon;
  const value = columns[colDef.id]?"Visible":"Hidden";
  return(
    <div
      className="column"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="colTitle"><b>{colDef.label}</b></div>
      <div>
        <Switch
          name={colDef.id}
          checked={columns[colDef.id]}
          change={_changeCheckBox.bind(this, props, columns, setColumns)}
        />
      &nbsp;
        <img alt="visible" src={icon} title={value} />
      </div>
    </div>
  );
}


/**
 * Confirm button click.
 * @param {object} props
 * @param {object} columns local column view state
 * @param {object} order local column order state
 * @param {object} originView Unmodified default column view from json definition
 * @private
 */
function _confirmClick(props, columns, order, originView){
  let lColumns = Object.keys(columns).reduce((hash, colName)=>{
    const defaultValue = originView[colName];
    const newValue = columns[colName];
    if(newValue!==defaultValue){
      hash[colName]=newValue;
    }
    return hash;
  },{});
  props.confirmClick(lColumns, order);
}


/**
 * Update the state of a boolean checkbox.
 * @param {object} props
 * @param {object} columns local component state
 * @param {object} setColumns callback for columns state
 * @param {Event} event
 * @private
 */
function _changeCheckBox(props, columns, setColumns, event){
  const key = event.target.name;
  const value = event.target.checked;
  let lColumns = Object.assign({}, columns);
  lColumns[key] = value;
  setColumns(lColumns);
}


/**
 * Reset button click.
 * @param {object} props
 * @param {object} reset local state of default view values + user selection
 * @param {object} setColumns callback for columns state
 */
function _resetClick(props, reset, setColumns, setOrder){
  setColumns(reset.view);
  setOrder(reset.order);
}

export default ColumnPrompt;
