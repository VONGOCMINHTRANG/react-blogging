import Content from 'components/content/Content'
import DashboardLayout from './DashboardLayout'
import styled from 'styled-components'

const DashboardStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 2em;
  .dashboard-image {
    display: grid;
    gap: 1.5em;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 190px 70px 190px;
  }
  .layout-item:first-child {
    grid-area: 1 / 1 / 2 / 3;
  }
  .layout-item:nth-child(2) {
    grid-row: 1 / 3;
  }
  .layout-item:nth-child(3) {
    grid-row: 1 / 3;
  }
  .layout-item:nth-child(4) {
    grid-row: 2 / 4;
  }
  .layout-item:nth-child(5) {
    grid-row: 2 / 4;
  }
  .layout-item:last-child {
    grid-column: 3 / 5;
  }
  img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Dashboard = () => {
  return (
    <DashboardLayout>
      <DashboardStyles>
        <Content title="Dashboard" desc="Overview dashboard monitor"></Content>
        <div className="dashboard-image">
          <div className="layout-item">
            <img
              src="https://images.unsplash.com/photo-1584890132374-d69d5d01483e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTd8fHBhcnR5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="dashboard-image"
            />
          </div>
          <div className="layout-item">
            <img
              src="https://images.unsplash.com/photo-1584843267830-32aa11fc1ce4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8JUM0JTkxJUMzJUEwJTIwbiVFMSVCQSVCNW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="dashboard-image"
            />
          </div>
          <div className="layout-item">
            <img
              src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=352&q=80"
              alt="dashboard-image"
            />
          </div>
          <div className="layout-item">
            <img
              src="https://images.unsplash.com/photo-1457089328109-e5d9bd499191?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGZsb3dlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt="dashboard-image"
            />
          </div>
          <div className="layout-item">
            <img
              src="https://images.unsplash.com/photo-1485201543483-f06c8d2a8fb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
              alt="dashboard-image"
            />
          </div>
          <div className="layout-item">
            <img
              src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
              alt="dashboard-image"
            />
          </div>
        </div>
      </DashboardStyles>
    </DashboardLayout>
  )
}

export default Dashboard
