import React from "react";
import { BsEye } from "react-icons/bs";
import PropTypes from "prop-types";

/**
 * 
 * @param {*} onClick Handler onClick
 * 
 */
const IconEyeOpen = ({ className = "", onClick = () => { } }) => {
  return (
    <BsEye className={className} onClick={onClick}></BsEye>
  );
};

IconEyeOpen.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export default IconEyeOpen;
