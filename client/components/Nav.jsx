import React from 'react';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';

const Nav = (props) => {
  return (
    <div id='navbar'>
      <div id='logo'>Madder Matter</div>
      <select
        value={props.location.pathname.slice(1)}
        onChange={(e) => {
          props.history.push(`/${e.target.value}`);
        }}
      >
        <option value='artists'>ARTISTS</option>
        <option value='morandi'>Morandi</option>
        <option value='cezanne'>Cezanne</option>
      </select>
      <Link to='/'>HOME</Link>
    </div>
  );
};

export default Nav;
