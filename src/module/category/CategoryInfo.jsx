import { Blur } from 'components/blur'
import ReactDOM from 'react-dom'
import slugify from 'slugify'
import styled from 'styled-components'
import { categoryStatus } from 'utils/constants'

const CategoryInfoStyles = styled.div`
  width: calc(100vw - 50%);
  position: fixed;
  z-index: 30;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  overflow-y: auto;
  background-color: white;
  .category-info {
    padding: 10px;
  }
  .title {
    margin-left: 10px;
    font-size: 20px;
    color: ${(props) => props.theme.secondary};
    font-weight: bold;
    padding-bottom: 2.5rem;
  }
  .layout {
    display: flex;
    flex-direction: column;
  }
  .button {
    height: 40px;
    font-size: 14px;
  }
  @media (max-width: 949px) {
    width: 100vw;
    .layout {
      padding: 0;
    }
  }
`

const CategoryInfo = ({ info, setInfo = () => {}, data }) => {
  const { createdAt, id, name, slug, status } = data.current
  const time = new Date(createdAt?.seconds * 1000).toLocaleDateString('vi-VI')

  return ReactDOM.createPortal(
    <>
      {info && <Blur onClick={() => setInfo(false)}></Blur>}

      <CategoryInfoStyles className="hide-scrollbar" id="info">
        <div className="category-info">
          <div className="title">Category Information</div>
          <div className="layout">
            <div className="flex mb-4 p-1 items-center">
              <div className="w-4/12 text-slate-700 font-semibold px-5">Id</div>
              <div className="w-8/12 bg-green-100 text-green-500 outline-none p-1 overflow-x-auto">
                <span className="px-2">{id}</span>
              </div>
            </div>
            <div className="flex mb-4 p-1 items-center">
              <div className="w-4/12 text-slate-700 font-semibold px-5">Name</div>
              <div className="w-8/12 bg-green-100 text-green-500 outline-none p-1 overflow-x-auto">
                <span className="px-2">{name}</span>
              </div>
            </div>
            <div className="flex mb-4 p-1 items-center">
              <div className="w-4/12 text-slate-700 font-semibold px-5">Slug</div>
              <div className="w-8/12 bg-green-100 text-green-500 outline-none p-1 overflow-x-auto">
                <span className="px-2">{slugify(slug)}</span>
              </div>
            </div>
            <div className="flex mb-4 p-1 items-center">
              <div className="w-4/12 text-slate-700 font-semibold px-5">Status</div>
              {Number(status) === categoryStatus.APPROVED && (
                <div className="w-fit bg-green-100 text-green-500 outline-none p-1 overflow-x-auto">
                  <span className="px-2">Approved</span>
                </div>
              )}
              {Number(status) === categoryStatus.UNAPPROVED && (
                <div className="w-fit bg-orange-100 text-red-500 outline-none p-1 overflow-x-auto">
                  <span className="px-2">Unapproved</span>
                </div>
              )}
            </div>

            <div className="flex mb-4 p-1 items-center">
              <div className="w-4/12 text-slate-700 font-semibold px-5">CreatedAt</div>
              <div className="w-8/12 bg-green-100 text-green-500 outline-none p-1 overflow-x-auto">
                <span className="px-2">{time}</span>
              </div>
            </div>
          </div>
        </div>
      </CategoryInfoStyles>
    </>,
    document.querySelector('body')
  )
}

export default CategoryInfo
