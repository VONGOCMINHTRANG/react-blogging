import styled from 'styled-components'
import PropTypes from 'prop-types'

const TableStyles = styled.table`
  width: 100%;
  thead {
    background-color: #bebebe;
  }
  th {
    padding: 10px;
    font-weight: bold;
    text-align: center;
  }
  th,
  td {
    vertical-align: middle;
    white-space: nowrap;
  }
  td {
    padding: 15px 30px;
    text-align: center;
  }
  @media (max-width: 540px) {
    th {
      padding: 10px;
      font-size: calc(0.6em + 0.5vw);
    }
  }
  @media (min-width: 541px) and (max-width: 949px) {
    th {
      padding: 15px;
      font-size: calc(0.6em + 0.5vw);
    }
  }
`

const Table = ({ children }) => {
  return <TableStyles>{children}</TableStyles>
}

Table.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Table
