import React from 'react';

import { BsFilterLeft } from "react-icons/bs";
import { BsFilter } from "react-icons/bs";
import { FaCirclePlus } from "react-icons/fa6";


import "./NavbarStyles.css"

function Navbar() {
    return (
        <nav>
  <a href="index.html">Photo Gallery</a>
  <div > <ul id="navbar"> 
    <li><BsFilter /></li>
    <li> <BsFilterLeft   /></li>
   
    </ul></div>


    </nav>
    )
}

export default Navbar