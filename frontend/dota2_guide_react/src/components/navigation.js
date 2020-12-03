import React from 'react';
import { Button } from 'react-bootstrap'
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <NavLink  to="/"><Button type="button" variant="light">Home</Button></NavLink>{' '}
          <NavLink to="/rate"><Button type="button" variant="light">Rate</Button></NavLink>{' '}
          <NavLink to="/attribute"><Button type="button" variant="light">Attribute</Button></NavLink>{' '}
       </div>
    );
}
 
export default Navigation;