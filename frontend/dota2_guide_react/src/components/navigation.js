import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <NavLink to="/image">Image</NavLink>
          <NavLink to="/rate">Rate</NavLink>
          <NavLink to="/attribute">Attribute</NavLink>
          <NavLink to="/infomation">Infomation</NavLink>
       </div>
    );
}
 
export default Navigation;