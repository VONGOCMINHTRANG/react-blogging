import { Blur } from 'components/blur'
import { Button } from 'components/button'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import parse from 'html-react-parser'
import { postStatus } from 'utils/constants'
import PropTypes from 'prop-types'
import { useDarkTheme } from 'contexts/theme-context'
import { useTranslation } from 'react-i18next'
import TitleInfo from 'components/title/TitleInfo'

const PostUserInfoStyles = styled.div`
  width: calc(100vw - 50%);
  position: fixed;
  z-index: 30;
  height: calc(100vh - 100px);
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  overflow-y: auto;
  background-color: white;
  .user-info {
    padding: 10px;
  }
  .title {
    margin-left: 10px;
    font-size: 20px;
    color: ${(props) => props.theme.secondary};
    font-weight: bold;
  }
  .image_post {
    display: flex;
    justify-content: center;
    padding: 20px 0;
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

const PostUserInfo = ({ info, setInfo = () => {}, data }) => {
  const { t } = useTranslation()
  const { darkTheme } = useDarkTheme()
  const [more, setMore] = useState(false)
  const { id, category, image, createdAt, editor, status, title, user, hot } = data.current
  const time = new Date(createdAt?.seconds * 1000).toLocaleDateString('vi-VI')

  return ReactDOM.createPortal(
    <>
      {info && <Blur onClick={() => setInfo(false)}></Blur>}
      <PostUserInfoStyles className={`hide-scrollbar ${darkTheme ? '!bg-gray-700' : ''}`} id="info">
        <div className="user-info">
          <TitleInfo onClick={() => setInfo(false)} title="Post Information" />

          <div className="image_post">
            <img
              src={image ? image : '/background.jpg'}
              alt="image"
              className="h-[200px] w-[400px] rounded-md object-cover"
            />
          </div>
          <div className="layout">
            <div className="flex mb-4 p-1 items-center">
              <div
                className={`w-4/12 text-slate-700 font-semibold px-5 ${
                  darkTheme ? 'text-white' : ''
                }`}
              >
                {t(`Id`)}
              </div>
              <div className="w-8/12 bg-green-100 text-green-500 outline-none p-1 overflow-x-auto">
                <span className="px-2">{id}</span>
              </div>
            </div>
            <div className="flex mb-4 p-1 items-center">
              <div
                className={`w-4/12 text-slate-700 font-semibold px-5 ${
                  darkTheme ? 'text-white' : ''
                }`}
              >
                {t(`Title`)}
              </div>
              <div className="w-8/12 bg-green-100 text-green-500 outline-none p-1 overflow-x-auto">
                <span className="px-2">{title}</span>
              </div>
            </div>
            <div className="flex mb-4 p-1 items-center">
              <div
                className={`w-4/12 text-slate-700 font-semibold px-5 ${
                  darkTheme ? 'text-white' : ''
                }`}
              >
                {t(`Category`)}
              </div>
              <div className="w-8/12 bg-green-100 text-green-500 outline-none p-1 overflow-x-auto">
                <span className="px-2">{category.name}</span>
              </div>
            </div>

            {!more && <Button onClick={() => setMore(true)}>{t(`Show more`)}</Button>}

            {more && (
              <>
                <div className="flex mb-4 p-1 items-center">
                  <div
                    className={`w-4/12 text-slate-700 font-semibold px-5 ${
                      darkTheme ? 'text-white' : ''
                    }`}
                  >
                    {t(`CreatedAt`)}
                  </div>
                  <div className="w-8/12 bg-green-100 text-green-500 outline-none p-1 overflow-x-auto">
                    <span className="px-2">{time}</span>
                  </div>
                </div>

                <div className="flex mb-4 p-1 items-center">
                  <div
                    className={`w-4/12 text-slate-700 font-semibold px-5 ${
                      darkTheme ? 'text-white' : ''
                    }`}
                  >
                    {t(`Author`)}
                  </div>
                  <div className="w-8/12 bg-green-100 text-green-500 outline-none p-1 overflow-x-auto">
                    <span className="px-2">{user.fullname}</span>
                  </div>
                </div>

                <div className="flex mb-4 p-1 items-center">
                  <div
                    className={`w-4/12 text-slate-700 font-semibold px-5 ${
                      darkTheme ? 'text-white' : ''
                    }`}
                  >
                    {t(`Status`)}
                  </div>

                  {Number(status) === postStatus.APPROVED && (
                    <div className="w-fit bg-green-100 text-green-500 outline-none p-1 overflow-x-auto">
                      <span className="px-2">{t(`Approved`)}</span>
                    </div>
                  )}
                  {Number(status) === postStatus.PENDING && (
                    <div className="w-fit bg-orange-100 text-orange-500 outline-none p-1 overflow-x-auto">
                      <span className="px-2">{t(`Pending`)}</span>
                    </div>
                  )}
                  {Number(status) === postStatus.REJECT && (
                    <div className="w-fit bg-red-100 text-red-500 outline-none p-1 overflow-x-auto">
                      <span className="px-2">{t(`Rejected`)}</span>
                    </div>
                  )}
                </div>

                <div className="flex mb-4 p-1 items-center">
                  <div
                    className={`w-4/12 text-slate-700 font-semibold px-5 ${
                      darkTheme ? 'text-white' : ''
                    }`}
                  >
                    {t(`Feature`)}
                  </div>

                  {hot && (
                    <div className="w-fit bg-purple-100 text-purple-500 outline-none p-1 overflow-x-auto">
                      <span className="px-2">{t(`Yes`)}</span>
                    </div>
                  )}
                  {!hot && (
                    <div className="w-fit bg-yellow-100 text-yellow-500 outline-none p-1 overflow-x-auto">
                      <span className="px-2">{t(`No`)}</span>
                    </div>
                  )}
                </div>

                <div className="flex mb-4 p-1 items-center">
                  <div
                    className={`w-4/12 text-slate-700 font-semibold px-5 ${
                      darkTheme ? 'text-white' : ''
                    }`}
                  >
                    {t(`Content`)}
                  </div>
                  <div className="w-8/12 bg-gray-200 text-gray-600 outline-none p-1 overflow-x-auto">
                    <div className="px-2 flex flex-col gap-4">{parse(editor)}</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </PostUserInfoStyles>
    </>,
    document.querySelector('body')
  )
}

PostUserInfo.propTypes = {
  info: PropTypes.bool.isRequired,
  setInfo: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

export default PostUserInfo
