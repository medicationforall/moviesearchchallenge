import React from 'react';
import _ from "lodash";
import ColumnPrompt from '../prompt/ColumnPrompt';

function HasColumnPrompt() {

  /**
   *
   */
  this.renderColumnPrompt = function(){
    return (
      <ColumnPrompt
        display={this.state.columnViewDisplay}
        columns={this.props.columns}
        columnView={this.props.columnView}
        columnOrder={this.props.columnOrder}
        cancelClick={this._cancelColumnPromptClick.bind(this)}
        confirmClick={this._confirmColumnPromptClick.bind(this)}
      />
    );
  };


  /**
   *
   */
  this._cancelColumnPromptClick = function(){
    let state = _.cloneDeep(this.state);
    state.columnViewDisplay='closed';
    this.setState(state);
  };


  /**
   *
   */
  this._confirmColumnPromptClick = function(columnView, order){
    let state = _.cloneDeep(this.state);
    state.columnViewDisplay='closed';
    this.setState(state);
    this.props.updateColumnView(columnView, order);
  };
}

export default HasColumnPrompt;
