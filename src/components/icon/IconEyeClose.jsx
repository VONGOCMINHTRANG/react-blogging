import React from "react";
import { BsEyeSlash } from "react-icons/bs";
import PropTypes from "prop-types";

/**
 * 
 * @param {*} onClick Handler onClick
 * 
 */
const IconEyeClose = ({ className = "", onClick = () => { } }) => {
  return (
    <BsEyeSlash className={className} onClick={onClick}></BsEyeSlash>
  );
};

IconEyeClose.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export default IconEyeClose;