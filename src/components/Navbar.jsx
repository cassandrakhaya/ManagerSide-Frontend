import React from 'react';

import {Outlet, NavLink} from "react-router-dom";

const Navbar = () => {
    return(
        <div>
            <nav>
                <ul>
                    <li>
                        <NavLink to = "/" > Home </NavLink>
                        <NavLink to = "/Menu" className= "active">Menu</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
export default Navbar;