import React, { useState, useRef, useEffect } from 'react';
import { BsFilterLeft, BsFilter } from 'react-icons/bs';
import './NavbarStyles.css';

function Navbar() {
    const [showBsFilterFilters, setShowBsFilterFilters] = useState(false);
    const [showBsFilterLeftFilters, setShowBsFilterLeftFilters] = useState(false);
    const [allPhotosChecked, setAllPhotosChecked] = useState(true);
    const dropdownRef = useRef(null);

    const toggleFilters = (icon) => {
        if (icon === "BsFilter") {
            setShowBsFilterFilters(true);
            setShowBsFilterLeftFilters(false);
        } else if (icon === "BsFilterLeft") {
            setShowBsFilterFilters(false);
            setShowBsFilterLeftFilters(true);
        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowBsFilterFilters(false);
            setShowBsFilterLeftFilters(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCheckboxChange = (filter) => {
        if (filter === 'allPhotos') {
            setAllPhotosChecked(true);
        } else {
            setAllPhotosChecked(false);
        }
    };

    const handleFilterCheckboxChange = (filter) => {
        if (filter !== 'allPhotos') {
            setAllPhotosChecked(false);
        }
    };

    return (
        <nav>
            <a href="index.html">Photo Gallery</a>
            <div>
                <ul id="navbar">
                    <li onClick={() => toggleFilters("BsFilter")}>
                        <BsFilter />
                        {showBsFilterFilters && (
                            <div ref={dropdownRef} className="filter-dropdown">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={allPhotosChecked}
                                        onChange={() => handleCheckboxChange('allPhotos')}
                                    /> All photos
                                </label>
                                <label>
                                    <input type="checkbox" onChange={() => handleFilterCheckboxChange('name')} /> Name
                                </label>
                                <label>
                                    <input type="checkbox" onChange={() => handleFilterCheckboxChange('timeLatestFirst')} /> Time Latest First
                                </label>
                                <label>
                                    <input type="checkbox" onChange={() => handleFilterCheckboxChange('timeLatestLast')} /> Time Latest Last
                                </label>
                            </div>
                        )}
                    </li>
                    <li onClick={() => toggleFilters("BsFilterLeft")}>
                        <BsFilterLeft />
                        {showBsFilterLeftFilters && (
                            <div ref={dropdownRef} className="filter-dropdown">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={allPhotosChecked}
                                        onChange={() => handleCheckboxChange('allPhotos')}
                                    /> All photos
                                </label>
                                <label>
                                    <input type="checkbox" onChange={() => handleFilterCheckboxChange('name')} /> Name
                                </label>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
