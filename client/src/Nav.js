import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';


function Nav() {
    return (
        <nav>
            <ul className="nav-links">
                <Link to="/inputperson">
                    <li>Add New Person</li>
                </Link>
                <Link to="/list">
                    <li>See the List of the People</li>
                </Link>
               
            </ul>
        </nav>
    );
}

export default Nav;