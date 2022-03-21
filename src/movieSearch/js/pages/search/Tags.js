import React from 'react';
import tags from '../../../json/tags.json';
import { Link } from 'react-router-dom';

function Tags(props){
  const filterTags = tags.filter(tag=>{
    return tag.count > 9;
  });

  const tagList = filterTags.map(tag=>{
    const link = "results/?tag[]=" + encodeURI(tag.name);
    return (<li key={tag.name}><Link to={link} title={tag.count}>{tag.name}</Link></li>);
  });

  return (
    <section id="tags" className="tags">
      <h2>Tags</h2>
      <ul>
        {tagList.slice(0,20)}
      </ul>
      <ul>
        {tagList.slice(20,40)}
      </ul>
      <ul>
        {tagList.slice(40)}
      </ul>
    </section>
  );
}

export default Tags;
