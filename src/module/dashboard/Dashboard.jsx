import Content from 'components/content/Content'
import styled from 'styled-components'
import image1 from '../../assets/images/image1.avif'
import image2 from '../../assets/images/image2.avif'
import image3 from '../../assets/images/image3.avif'
import image4 from '../../assets/images/image4.avif'
import image5 from '../../assets/images/image5.avif'
import image6 from '../../assets/images/image6.avif'
import image7 from '../../assets/images/image7.avif'
import image8 from '../../assets/images/image8.avif'
import image9 from '../../assets/images/image9.avif'
import { useTranslation } from 'react-i18next'

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
  .layout-item:nth-child(6) {
    grid-column: 3 / 5;
  }
  .layout-item:nth-child(8) {
    grid-row: 4 / 4;
  }
  .layout-item:nth-child(7) {
    grid-row: 4 / 4;
  }
  .layout-item:nth-child(7) {
    grid-column: 3 / 5;
  }

  img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 767px) {
    .dashboard-image {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    img {
      max-height: 400px;
      height: auto;
      object-fit: ;
    }
  }
`

const Dashboard = () => {
  const { t } = useTranslation()

  return (
    <DashboardStyles>
      <Content title={t('Dashboard')} desc={t('Overview dashboard monitor')}></Content>
      <div className="dashboard-image">
        <div className="layout-item">
          <img src={image1} alt="dashboard-image" />
        </div>
        <div className="layout-item">
          <img src={image2} alt="dashboard-image" />
        </div>
        <div className="layout-item">
          <img src={image3} alt="dashboard-image" />
        </div>
        <div className="layout-item">
          <img src={image7} alt="dashboard-image" />
        </div>
        <div className="layout-item">
          <img src={image4} alt="dashboard-image" />
        </div>
        <div className="layout-item">
          <img src={image5} alt="dashboard-image" />
        </div>
        <div className="layout-item">
          <img src={image6} alt="dashboard-image" />
        </div>
        <div className="layout-item">
          <img src={image8} alt="dashboard-image" />
        </div>
        <div className="layout-item">
          <img src={image9} alt="dashboard-image" />
        </div>
      </div>
    </DashboardStyles>
  )
}

export default Dashboard
