import React from 'react';
import _ from "lodash";
import '../../css/dynamicTable.css';

import HasColumnPrompt from './HasColumnPrompt';

import Tbody from './Tbody';
import Thead from './Thead';
import ColumnFilter from  './ColumnFilter';

import {filterColumns, orderColumns} from './ColumnViewUtil';


/**
 * @author James Adams
 * @public
 */
class DynamicTable extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      "filterDisplay":"closed",
      "columnViewDisplay":"closed",
      "SelectedFilterColumn":null
    };

    //mixin
    HasColumnPrompt.call(this);
  }

  /**
   * Render the dynamic table.
   * @returns {jsx}
   * @public
   */
  render(){
    return (
      <React.Fragment>
        {this._renderTable()}
        <ColumnFilter
          filter={this.props.filter}
          updateFilter = {this.props.updateFilter}
          localState={this.state}
          updateLocalState={this._updateLocalState.bind(this)}
        />
        {this.renderColumnPrompt()}
      </React.Fragment>
    );
  }


  /**
   * Render the table based on if pagecount is set.
   * @returns {jsx}
   * @private
   */
  _renderTable(){
    if(this.props.pageCount !== undefined){
      return (
        <div className="dynTablePageScroller" onScroll={this._scrollTable.bind(this, this.props)}>
          {this._renderColumnViewIcon(this.props)}
          {this._renderDynamicTable()}
        </div>
      );
    }else{
      return (
        <React.Fragment>
          {this._renderColumnViewIcon(this.props)}
          {this._renderDynamicTable()}
        </React.Fragment>
      );
    }
  }


  /**
   * Render the dynamic table.
   * @returns {jsx}
   * @private
   */
  _renderDynamicTable(){
    let captionNode= this._resolveCaption();
    let className="dynamicTable "+(this.props.tableClass||"");
    const {orderedColumns} = orderColumns(this.props.columns, this.props.columnOrder);
    const filteredColumns = filterColumns(orderedColumns, this.props.columnView, this.props.columnOrder);

    return (
      <table className={className}>
        {captionNode}
        {this._renderThead(filteredColumns)}
        {this._renderTbody(filteredColumns)}
      </table>
    );
  }


  /**
   * Render the table head.
   * @param {array} filteredColumns
   * @returns {jsx}
   * @private
   */
  _renderThead(filteredColumns){
    return (
      <Thead
        columns={filteredColumns}
        columnSort={this.props.updateSort?this._clickColumn.bind(this):null}
        sort={this.props.sort}
        localState={this.state}
        updateLocalState={this._updateLocalState.bind(this)}
        filter={this.props.filter}
      />
    );
  }


  /**
   * Render the table body.
   * @param {array} filteredColumns
   * @returns {jsx}
   * @private
   */
  _renderTbody(filteredColumns){
    return (
      <Tbody
        filteredColumns = {filteredColumns}
        columnOrder = {this.props.columnOrder}
        columns={this.props.columns}
        render={this.props.render}
        rows={this.props.rows}
        sort={this.props.sort}

        selection={this.props.selection}
        rowSelect={this._clickRow.bind(this)}

        rowClassKey={this.props.rowClassKey}
        customSort={this.props.customSort}

        filter={this.props.filter}

        pageStart={this.props.pageStart}
        pageEnd={this.props.pageEnd}
      />
    );
  }


  /**
   * Render the column view icon.
   * @param {object}
   * @returns {jsx}
   * @private
   */
  _renderColumnViewIcon(props){
    if(props.columnView){
      const keys = Object.keys(props.columnView);

      let className = "columnViewIcon";

      if(keys.length > 0){
        className += " set";
      }

      return (
        <svg
          width="32"
          height="38"
          viewBox="0 0 32 38"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          onClick={this._openColumnViewer.bind(this, props)}
        >
         <title>Change Viewed Columns</title>
         <g>
          <rect fill="none" id="canvas_background" height="40" width="34" y="-1" x="-1"/>
         </g>
         <g>
          <rect className="internal" stroke="#000000" id="svg_3" height="35.897613" width="18.191262" y="0.989669" x="1.48967" strokeWidth="3" fill="none"/>
          <ellipse className="eye" ry="11.5" rx="11.375" id="svg_6" cy="10.359375" cx="18.75" strokeOpacity="null" strokeWidth="null" stroke="null" fill="#ffffff"/>
          <ellipse className="pupil" ry="5.313102" rx="5.313102" id="svg_5" cy="11.106985" cx="19.471379" strokeOpacity="null" strokeWidth="null" stroke="null" fill="#ffffff"/>
          <path id="svg_2" d="m19.526262,3.352158c-5,0 -9.27,3.11 -11,7.5c1.73,4.39 6,7.5 11,7.5s9.27,-3.11 11,-7.5c-1.73,-4.39 -6,-7.5 -11,-7.5zm0,12.5c-2.76,0 -5,-2.24 -5,-5s2.24,-5 5,-5s5,2.24 5,5s-2.24,5 -5,5zm0,-8c-1.66,0 -3,1.34 -3,3s1.34,3 3,3s3,-1.34 3,-3s-1.34,-3 -3,-3z"/>
         </g>
        </svg>
      );
    }else{
      return null;
    }
  }


  /**
   * Open the column viewer dialog.
   * @param {object}
   * @private
   */
  _openColumnViewer(props){
    let state = _.cloneDeep(this.state);
    state.columnViewDisplay='open';
    state.SelectedFilterColumn=null;
    this.setState(state);
  }


  /**
   * Update the local state of the table component.
   * @param {object} state
   * @private
   */
  _updateLocalState(state){
    this.setState(state);
  }


  /**
   * Resolve the caption node from a passed in property.
   * @returns {jsx} can return null
   * @private
   */
  _resolveCaption(){
    let captionNode=null;
    if(this.props.caption){
      captionNode = (
        <caption>
          {this.props.caption}
        </caption>
      );
    }
    return captionNode;
  }


  /**
   * Scroll table trigger page load event.
   * @param {object} props
   * @param {Event} event
   * @private
   */
  _scrollTable(props, event){
    let element = event.target;
    let buffer = 200;
    let scrollPosition = element.scrollHeight - element.scrollTop;
    if (scrollPosition - buffer <= element.clientHeight) {
      this._pageLoad(props);
    }
  }


  /**
   * User clicks on a row.
   * If available calls the updateSelection callback.
   * @param {Event} event
   * @private
   */
  _clickRow(event){
    let keyValue = event.target.parentElement.dataset.keyvalue;
    if(this.props.updateSelection){
      this.props.updateSelection(keyValue);
    }
  }


  /**
   * Load a page of rows.
   * @param {object} props
   * @private
   */
  _pageLoad(props){
    let start = props.pageStart;
    let end = props.pageEnd;

    end += props.pageCount;

    if(this.props.updatePage){
      this.props.updatePage(start,end);
    }
  }


  /**
   * User CLicks on a column.
   * @param {Event} event
   * @private
   */
  _clickColumn(event){
    console.log('click column');
    var sort = Object.assign({}, this.props.sort);
    let id = event.target.id;

    if(sort[id]===undefined){
      sort[id] = 'asc';
    }else if(sort[id] === 'asc'){
      sort[id] = 'desc';
    }else if(this.props.sort[id] === 'desc'){
      sort[id] = undefined;
    }

    this.props.updateSort(sort);
  };
}

export default DynamicTable;
