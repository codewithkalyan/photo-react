import React, { useState } from 'react';
import { Menu, MenuItem, Checkbox, ListItemText, FormControlLabel } from '@mui/material';

const FilterOne = ({ photographerNames = [], applyFilters }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    all: true,
    name: [],
    liked: false,
    unliked: false,
  });

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCheckboxChange = (filterKey) => (event) => {
    if (filterKey === 'name') {
      const { value } = event.target;
      setFilters((prevFilters) => {
        const updatedNames = prevFilters[filterKey].includes(value)
          ? prevFilters[filterKey].filter((name) => name !== value)
          : [...prevFilters[filterKey], value];
        return { ...prevFilters, [filterKey]: updatedNames };
      });
    } else {
      setFilters({ ...filters, [filterKey]: event.target.checked });
    }
  };

  const handleAllCheckboxChange = () => {
    setFilters({
      all: true,
      name: [],
      liked: false,
      unliked: false,
    });
  };

  const applyAndClose = () => {
    applyFilters(filters);
    handleCloseMenu();
  };

  return (
    <>
      <button onClick={handleOpenMenu}>Filter</button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.all}
                onChange={handleAllCheckboxChange}
              />
            }
            label="All"
          />
        </MenuItem>
        <MenuItem>
          <ListItemText primary="Photographer" />
          {photographerNames.map((name) => (
            <MenuItem key={name}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.name.includes(name)}
                    onChange={handleCheckboxChange('name')}
                    value={name}
                  />
                }
                label={name}
              />
            </MenuItem>
          ))}
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.liked}
                onChange={handleCheckboxChange('liked')}
              />
            }
            label="Liked"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.unliked}
                onChange={handleCheckboxChange('unliked')}
              />
            }
            label="Unliked"
          />
        </MenuItem>
        <MenuItem onClick={applyAndClose}>Apply</MenuItem>
      </Menu>
    </>
  );
};

export default FilterOne;
