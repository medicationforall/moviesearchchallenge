import React from 'react';
import '../../css/tree.css';

/**
 * @author James Adams
 */
function Tree(props){
  return (
    <div className="tree">
      <ul>
        {_renderTree(props, props.data)}
      </ul>
    </div>
  );
}


/**
 *
 */
function _renderTree(props, data, path=''){
  let branch = data.children && data.children.length >0;
  let id = '';

  props.keyName.some(function(key){
    if(data[key]){
      id = data[key];
      return true;
    }
    return false;
  });

  if(branch){
    return _renderBranch(props, data, id, path);
  }
  else{
    return _renderLeaf(props, data, id, path);
  }
}


/**
 *
 */
function _renderBranch(props, data, name, path=''){
  let key = path + name;
  let children = [];
  path+=name+'/';
  data.children.every(child => children.push(_renderTree(props, child, path)));

  let ulClass = 'closed';
  let title= "Open "+name;

  if(props.treeState && props.treeState[path]){
    ulClass = 'open';
    title= "Close "+name;
  }

  if(path === name+'/'){
    ulClass = 'open root';
    title= null;
  }

  let nameNode = (
    <button
      className="link branch"
      onClick={_clickBranch.bind(this, props, path)}
      title={title}
    ><span className={"arrow "+ulClass}></span>{name}</button>
  );

  if(props.renderBranch){
    nameNode = props.renderBranch({
      "id":name,
      "data":data,
      "path":path,
      "ulClass":ulClass,
      "title":title,
      "clickAction":_clickBranch.bind(this, props, path)
    });
  }

  return (
    <li key={key} data-path={key}>
      {nameNode}
      <ul className={ulClass}>
        {children}
      </ul>
    </li>
  );
}


/**
 *
 */
function _renderLeaf(props, data, id, path=''){
  let key = path + id;
  let nameNode = null;

  if(props.renderLeaf){
    nameNode = props.renderLeaf(id, data, path);
  } else{
    nameNode = (
      <span>{id}</span>
    );
  }

  return (
    <li key={key} data-path={key}>
      {nameNode}
    </li>
  );
}


/**
 *
 */
function _clickBranch(props, path){
  if(props.clickBranch){
    props.clickBranch(path);
  }
}

export default Tree;
