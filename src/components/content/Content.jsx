import styled from 'styled-components'
import PropTypes from 'prop-types'

const ContentStyles = styled.div`
  .dashboard-heading {
    font-weight: bold;
    font-size: 25px;
    margin-bottom: 5px;
    color: ${(props) => props.theme.secondary};
  }
  .dashboard-short-desc {
    font-size: 14px;
    color: rgb(128, 129, 145);
  }
`

const Content = ({ title = '', desc = '' }) => {
  return (
    <ContentStyles className="content">
      <h1 className="dashboard-heading">{title}</h1>
      <p className="dashboard-short-desc">{desc}</p>
    </ContentStyles>
  )
}

Content.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
}

export default Content
