import React from 'react';
import '../../css/menu/menu.css';
import SubMenu from './SubMenu';


/**
 * Create the menu component.
 * @author James Adams
 * @param {object} props
 * @returns {jsx}
 * @public
 */
function Menu(props){
  let menuClass = 'menu '+props.menuToggle;
  let listItems = _buildListItems(props);

  return (
    <div className={menuClass}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        viewBox="0 0 24 24"
        className="closeArrow"
        onClick={props.closeMenu}
      >
        <title>Close Menu</title>
        <path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/>
        <path fill="none" d="M0 0h24v24H0z"/>
      </svg>

      <ul>
        {listItems}
      </ul>
    </div>
  );
}


/**
 * Build the menu list items.
 * @param {object} props
 * @returns {array}
 * @private
 */
function _buildListItems(props){
  const menuItems = props.menuData.menuItems;
  let listItems = menuItems.reduce((list, md)=>{
    let hasPermission = props.acl && md.feature ? _gatherPermission(props.acl.features(), md) : true;
    if(hasPermission && md.displayInMenu !== false){
      let li = _renderListItem(props, md);
      list.push(li);
    }
    return list;
  },[]);

  return listItems;
}


/**
 * Discern if a user has permission to a menu item.
 * @param {object} md menu data
 * @param {string} role
 * @returns {boolean}
 */
function _gatherPermission(features, md){
  let hasPermission = false;
  const featureName = md.feature.replace('-','');
  const negate = md.feature.includes('-');
  if(featureName){
    if(features[featureName] && negate===false){
      hasPermission = true;
    } else if(negate && features[featureName]===false){
      hasPermission = true;
    }
  }
  return hasPermission;
}


/**
 * Create the list item.
 * @param {object} props
 * @param {object} md menu data
 * @returns {jsx}
 * @private
 */
function _renderListItem(props, md){
  let liKey = 'li_'+md.id;
  let anchor = '#'+md.id;
  let title = md.menuTitle||md.title;
  let description = md.description||"";
  let li = (
    <li key={liKey}>
      <a href={anchor} data-id={md.id} title={description} onClick={props.clickMenuItem}>
        {title}
      </a>
      {_renderSubMenu(props, md)}
    </li>
  );

  if(md.children){
    li = (
      <li key={liKey}>
        <em
          data-id={md.id}
          onClick={props.clickMenuItem}
          title={description}
        >
          {title} <span className="arrow"></span>
        </em>
        {_renderSubMenu(props, md)}
      </li>
    );
  }

  if(md.id === props.selectedMenu){
    li = (<li key={liKey}><span className="selectedPage">{title}</span></li>);
  }
  return li;
}


/**
 * Create the submenu component.
 * @param {object} props
 * @param {object} md menu data
 * @returns {jsx}
 * @private
 */
function _renderSubMenu(props, md){
  if(md.children && md.children.length > 0){
    let openFlag = props.selectedSubMenu === md.id?"open":"closed";
    return (
      <SubMenu
        items={md.children}
        clickMenuItem={props.clickMenuItem}
        selectedMenu={props.selectedMenu}
        open={openFlag}
      />
    );
  } else {
    return null;
  }
}

export default Menu;
