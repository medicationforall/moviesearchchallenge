import React from 'react';

/**
 * Submenu component. Note that menu only supports 1 level of subMenu depth.
 * @author James Adams
 * @param {object} props
 * @return {jsx}
 * @public
 */
function SubMenu(props){
  let items = props.items.map(_renderListItem.bind(this, props));
  const className="subMenu " + props.open;
  return (
    <div className={className}>
      <ul>
        {items}
      </ul>
    </div>
  );
}


/**
 * Create the list item.
 * @param {object} props
 * @param {object} md menu data
 * @returns {jsx}
 * @private
 */
function _renderListItem(props, md){
  if(md.displayInMenu !== false){
    let liKey = 'li_'+md.id;
    let anchor = '#'+md.id;
    let title = md.menuTitle||md.title;
    let description = md.description||"";
    let li = (
      <li key={liKey}>
        <a href={anchor} data-id={md.id} title={description} onClick={props.clickMenuItem}>
          {title}
        </a>
      </li>
    );

    if(md.id === props.selectedMenu){
      li = (<li key={liKey}><span className="selectedPage">{title}</span></li>);
    }
    return li;
  }else{
    return null;
  }
}

export default SubMenu;
