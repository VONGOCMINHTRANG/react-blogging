import styled from 'styled-components'

const TableStyles = styled.table`
  width: 100%;
  thead {
    background-color: rgb(241, 241, 243);
  }
  th {
    padding: 20px 30px;
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

const Table = ({
  item1 = 'item1',
  item2 = 'item2',
  item3 = 'item3',
  item4 = 'item4',
  item5 = 'item5',
  children,
}) => {
  return (
    <TableStyles>
      <thead>
        <tr>
          <th>{item1}</th>
          <th>{item2}</th>
          <th>{item3}</th>
          <th>{item4}</th>
          <th>{item5}</th>
        </tr>
      </thead>
      {children}
    </TableStyles>
  )
}

export default Table
