import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({
  type = "checkbox",
  name,
  checked = false,
  onChange,
  value
}) => (
  <input
    type={type}
    name={name}
    checked={checked}
    onChange={onChange}
    value={value}
  />
);

Checkbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default Checkbox;
