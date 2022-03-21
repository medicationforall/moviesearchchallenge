import React from 'react';
import RadioGroup from '../../../../core/web/js/form/RadioGroup';
import radioOptionsYesNo from '../../json/radioOptionsYesNo.json';

/**
 * Radio Group with hard coded yes no options.
 * @author James Adams
 * @param {object} props
 * @returns {jsx}
 * @public
 */
function YesNoRadio(props){
  return (
    <RadioGroup
      label={props.label}
      name={props.name}
      options={radioOptionsYesNo}
      onClick={props.onClick}
      value={props.value}
    />
  );
}

export default YesNoRadio;
