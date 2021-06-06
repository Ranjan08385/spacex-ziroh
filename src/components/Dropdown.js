import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./Dropdown.css";

function Dropdown({ data, selectedValue, handleChange }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl className="dropdown">
      <InputLabel id="demo-controlled-open-select-label"></InputLabel>
      <Select
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={selectedValue}
        onChange={handleChange}
      >
        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem> */}
        {data?.map((value, index) => (
          <MenuItem value={value} key={index}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Dropdown;
