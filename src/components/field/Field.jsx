import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FieldStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 20px;
  margin-bottom: 30px;
`;
const Field = ({ children }) => {
  return <FieldStyles>{children}</FieldStyles>;
};

Field.propTypes = {
  children: PropTypes.node
};

export default Field;