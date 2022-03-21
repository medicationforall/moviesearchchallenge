import React, {useState, useEffect} from 'react';
import '../../css/confirmPrompt.css';

import Select from '../form/Select';
import DateInput from '../form/DateInput';

/**
 * Modal confirm prompt.
 * confirm display value is either open or closed.
 * @param {object} props
 * @author James Adams
 */
function FilterPrompt(props){
  let confirmClass="confirmPrompt "+props.display;

  const [filter, setFilter] = useState({
    "id":"",
    "label":"",
    "type":"string",
    "value":"",
    "value2":"",
    "mode":"equals"
  });

  const [reset, setReset] = useState({
    "id":"",
    "label":"",
    "type":"string",
    "value":"",
    "value2":"",
    "mode":"equals"
  });

  let textInput = React.createRef();
  useEffect(()=>{
    if(textInput && textInput.current){
      textInput.current.focus();
    }

    if(props.columnDef && filter.id !== props.columnDef.id){
      const { columnDef, baseValue, baseValue2, baseMode } = _getFilterValues(props);
      setFilter({
        "id":columnDef.id,
        "label":columnDef.label,
        "type":columnDef.filterType||columnDef.type,
        "value":baseValue,
        "value2":baseValue2,
        "mode":baseMode
      });

      setReset({
        "id":columnDef.id,
        "label":columnDef.label,
        "type":columnDef.filterType||columnDef.type,
        "value":"",
        "value2":"",
        "mode":baseMode
      });
    }
  }, [props.columnDef, props.filter, textInput, setFilter, setReset, filter, _getFilterValues]);

  useEffect(() => {
    // When using saved formats, the value can update outside of this component while its closed
    if (props.display === 'open') {
      const { columnDef, baseValue, baseValue2, baseMode } = _getFilterValues(props);

      setFilter({
        "id":columnDef.id,
        "label":columnDef.label,
        "type":columnDef.filterType||columnDef.type,
        "value":baseValue,
        "value2":baseValue2,
        "mode":baseMode
      });
    }
  }, [props.display, _getFilterValues]);

  if(props.columnDef){
    const columnDef = props.columnDef;
    return (
      <div className={confirmClass}>
        <div className="prompt">
          <div className="promptContent">
            <div>
              {_renderFilter(columnDef, filter, setFilter, textInput)}
            </div>
            <button className="primary" onClick={_confirmClick.bind(this, props, filter)}>Filter</button>
            <button onClick={_clearClick.bind(this, props, reset, setFilter)}>Clear</button>
            <button onClick={props.cancelClick}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }else{
    return (
      <div className={confirmClass}>
        <div className="prompt">
          <div className="promptContent"></div>
        </div>
      </div>
    );
  }
}


/**
 *
 */
function _resolveBaseMode(props, columnDef){
  let mode = "equals";
  let type = columnDef.filterType||columnDef.type;

  if(type==='string'){
    mode = 'contains';
  } else if(type==='date'){
      mode = 'between';
  }

  if(props.filter){
    mode = props.filter.mode;
  }

  return mode;
}


/**
 *
 */
function _clearClick(props, reset, setFilter){
  setFilter(reset);
}


/**
 *
 */
function _renderFilter(columnDef, filter, setFilter, textInput){
  const type = columnDef.filterType||columnDef.type;
  const renderMap = {
    "string":_renderStringFilter,
    "int":_renderIntFilter,
    "float":_renderFloatFilter,
    "boolean":_renderBooleanFilter,
    "date":_renderDateFilter
  };
  const renderFunction = renderMap[type];

  if(renderFunction){
    return renderFunction(columnDef, filter, setFilter, textInput);
  } else {
    throw new Error('unknown column filter type');
  }
}


/**
 *
 */
function _renderStringFilter(columnDef, filter, setFilter, textInput){
  const options = [
    {"value":"contains","label":"Contains"},
    {"value":"equals","label":"Equals"},
    {"value":"begins","label":"Begins With"},
    {"value":"ends","label":"Ends With"},
    {"value":"not","label":"Not Contains"}
  ];

  return (
    <div className="stringFilter">
      <b>{filter.label}</b> String Filter<br />
      <Select
        value={filter.mode}
        options={options}
        change={_setMode.bind(this, filter, setFilter)}
      />
      &nbsp;
      <input
        type="text"
        value={filter.value}
        onChange={_setValue.bind(this, filter, setFilter, "value")}
        ref={textInput}
      />
    </div>
  );
}


/**
 *
 */
function _renderIntFilter(columnDef, filter, setFilter, textInput){
  const options = [
    {"value":"equals","label":"Equals"},
    {"value":"greater","label":"Greater Than"},
    {"value":"lesser","label":"Less Than"},
    {"value":"range","label":"Range"},
  ];

  let inputNode = (
    <input
      type="number"
      value={filter.value}
      onChange={_setValue.bind(this, filter, setFilter, "value")}
      ref={textInput}
    />
  );

  if(filter.mode === 'range'){
    inputNode = (
      <div className="rangeInput">
        Start:&nbsp;
        <input
          type="number"
          value={filter.value}
          onChange={_setValue.bind(this, filter, setFilter, "value")}
        />
      <br />
      End:&nbsp;
        <input
          type="number"
          value={filter.value2}
          onChange={_setValue.bind(this, filter, setFilter, "value2")}
        />
      </div>
    );
  }

  return (
    <div className="intFilter">
      <b>{filter.label}</b> Integer filter<br />
      <Select
        value={filter.mode}
        options={options}
        change={_setMode.bind(this, filter, setFilter)}
      />
      &nbsp;
      {inputNode}
    </div>
  );
}


/**
 *
 */
function _renderFloatFilter(columnDef, filter, setFilter, textInput){
  const options = [
    {"value":"equals","label":"Equals"},
    {"value":"greater","label":"Greater Than"},
    {"value":"lesser","label":"Less Than"},
    {"value":"range","label":"Range"},
  ];

  let inputNode = (
    <input
      type="number"
      value={filter.value}
      onChange={_setValue.bind(this, filter, setFilter, "value")}
      ref={textInput}
    />
  );

  if(filter.mode === 'range'){
    inputNode = (
      <div className="rangeInput">
        Start:&nbsp;
        <input
          type="number"
          value={filter.value}
          onChange={_setValue.bind(this, filter, setFilter, "value")}
        />
      <br />
      End:&nbsp;
        <input
          type="number"
          value={filter.value2}
          onChange={_setValue.bind(this, filter, setFilter, "value2")}
        />
      </div>
    );
  }

  return (
    <div className="floatFilter">
      <b>{filter.label}</b> Float Filter<br />
      <Select
        value={filter.mode}
        options={options}
        change={_setMode.bind(this, filter, setFilter)}
      />
      &nbsp;
      {inputNode}
    </div>
  );
}

/**
 *
 */
function _renderBooleanFilter(columnDef, filter, setFilter, textInput){
  const options = [
    {"value":"","label":""},
    {"value":true,"label":"True"},
    {"value":false,"label":"False"}
  ];

  let inputNode = (
    <Select
      value={filter.value}
      options={options}
      change={_setValue.bind(this, filter, setFilter, "value")}
    />
  );
  return (
    <div className="booleanFilter">
      <b>{filter.label}</b> Boolean filter<br />
      {inputNode}
    </div>
  );
}


/**
 *
 */
function _renderDateFilter(columnDef, filter, setFilter, textInput){
  const options = [
    {"value":"equals","label":"Equals"},
    {"value":"after","label":"After"},
    {"value":"before","label":"Before"},
    {"value":"between","label":"Between"},
  ];

  let inputNode = (
    <DateInput
      value={filter.value}
      change={_setValue.bind(this, filter, setFilter, "value")}
      reference={textInput}
    />
  );

  if(filter.mode === 'between'){
    inputNode = (
      <div className="rangeInput">
        Start:&nbsp;
        <DateInput
          value={filter.value}
          change={_setValue.bind(this, filter, setFilter, "value")}
          reference={textInput}
        />
      <br />
      End:&nbsp;
        <DateInput
          value={filter.value2}
          change={_setValue.bind(this, filter, setFilter, "value2")}
        />
      </div>
    );
  }

  return (
    <div className="dateFiler">
      <b>{filter.label}</b> Date filter<br />
      <Select
        value={filter.mode}
        options={options}
        change={_setMode.bind(this, filter, setFilter)}
      />
      &nbsp;
      {inputNode}
    </div>
  );
}


/**
 *
 */
function _setMode(filter, setFilter, e){
  let value = e.target.value;
  let lFilter = Object.assign({}, filter);
  lFilter.mode = value;
  setFilter(lFilter);
}


/**
 *
 */
function _setValue(filter, setFilter, key, e){
  let value = e.target.value;
  let lFilter = Object.assign({}, filter);
  lFilter[key] = value;
  setFilter(lFilter);
}


/**
 *
 */
function _confirmClick(props, filter){
  let lFilter = null;

  if(filter.value){
    lFilter = filter;
  }

  props.confirmClick(lFilter);
}

/**
 * Resolve values from props to set filter
 * @param {*} props 
 * @returns 
 */
function _getFilterValues(props) {
  const columnDef = props.columnDef;
  const baseValue = props.filter?props.filter.value:"";
  const baseValue2 = props.filter?props.filter.value2:"";
  const baseMode = _resolveBaseMode(props, columnDef);

  return {columnDef, baseValue, baseValue2, baseMode};
}

export default FilterPrompt;
