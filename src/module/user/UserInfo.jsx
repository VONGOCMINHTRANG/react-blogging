import { Blur } from 'components/blur'
import { Button } from 'components/button'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { userRole, userStatus } from 'utils/constants'
import PropTypes from 'prop-types'
import { useDarkTheme } from 'contexts/theme-context'

const UserInfoStyles = styled.div`
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
  .avatar {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
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

const UserInfo = ({ info, setInfo = () => {}, data }) => {
  const { darkTheme } = useDarkTheme()
  const [more, setMore] = useState(false)
  const { avatar, dob, email, fullname, id, phone, role, status, username, createdAt } =
    data.current
  const time = new Date(createdAt?.seconds * 1000).toLocaleDateString('vi-VI')

  return ReactDOM.createPortal(
    <>
      {info && <Blur onClick={() => setInfo(false)}></Blur>}
      <UserInfoStyles className={`hide-scrollbar ${darkTheme ? '!bg-gray-700' : ''}`} id="info">
        <div className="user-info">
          <div className="title">User Information</div>

          <div className="avatar">
            <img
              src={avatar ? avatar : '/avatar.jpg'}
              alt="avatar"
              className="h-24 w-24 rounded-full object-cover"
            />
          </div>
          <div className="layout">
            <div className="flex mb-4 p-1 items-center">
              <div
                className={`w-4/12 text-slate-700 font-semibold px-5 ${
                  darkTheme ? 'text-white' : ''
                }`}
              >
                Id
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
                Email
              </div>
              <div className="w-8/12 bg-green-100 text-green-500 outline-none p-1 overflow-x-auto">
                <span className="px-2">{email}</span>
              </div>
            </div>
            <div className="flex mb-4 p-1 items-center">
              <div
                className={`w-4/12 text-slate-700 font-semibold px-5 ${
                  darkTheme ? 'text-white' : ''
                }`}
              >
                Username
              </div>
              <div className="w-8/12 bg-green-100 text-green-500 outline-none p-1 overflow-x-auto">
                <span className="px-2">{username}</span>
              </div>
            </div>
            <div className="flex mb-4 p-1 items-center">
              <div
                className={`w-4/12 text-slate-700 font-semibold px-5 ${
                  darkTheme ? 'text-white' : ''
                }`}
              >
                Fullname
              </div>
              <div className="w-8/12 bg-green-100 text-green-500 outline-none p-1 overflow-x-auto">
                <span className="px-2">{fullname}</span>
              </div>
            </div>
            <div className="flex mb-4 p-1 items-center">
              <div
                className={`w-4/12 text-slate-700 font-semibold px-5 ${
                  darkTheme ? 'text-white' : ''
                }`}
              >
                Date of birth
              </div>
              <div className="w-8/12 bg-green-100 text-green-500 outline-none p-1 overflow-x-auto">
                <span className="px-2">{dob}</span>
              </div>
            </div>

            <div className={`transition-all delay-200 overflow-hidden ${more ? 'h-auto ' : 'h-0'}`}>
              <div className="flex mb-4 p-1 items-center ">
                <div
                  className={`w-4/12 text-slate-700 font-semibold px-5 ${
                    darkTheme ? 'text-white' : ''
                  }`}
                >
                  Mobile number
                </div>
                <div className="w-8/12 bg-green-100 text-green-500 outline-none p-1 overflow-x-auto">
                  <span className="px-2">{phone}</span>
                </div>
              </div>
              <div className="flex mb-4 p-1 items-center">
                <div
                  className={`w-4/12 text-slate-700 font-semibold px-5 ${
                    darkTheme ? 'text-white' : ''
                  }`}
                >
                  Status
                </div>
                {Number(status) === userStatus.ACTIVE && (
                  <div className="w-fit bg-green-100 text-green-500 outline-none p-1 overflow-x-auto">
                    <span className="px-2">Active</span>
                  </div>
                )}
                {Number(status) === userStatus.PENDING && (
                  <div className="w-fit bg-orange-100 text-orange-500 outline-none p-1 overflow-x-auto">
                    <span className="px-2">Pending</span>
                  </div>
                )}
                {Number(status) === userStatus.BANNED && (
                  <div className="w-fit bg-red-100 text-red-500 outline-none p-1 overflow-x-auto">
                    <span className="px-2">Banned</span>
                  </div>
                )}
              </div>
              <div className="flex mb-4 p-1 items-center">
                <div
                  className={`w-4/12 text-slate-700 font-semibold px-5 ${
                    darkTheme ? 'text-white' : ''
                  }`}
                >
                  Role
                </div>
                {Number(role) === userRole.ADMIN && (
                  <div className="w-fit bg-red-100 text-red-500 outline-none p-1 overflow-x-auto">
                    <span className="px-2">Admin</span>
                  </div>
                )}
                {Number(role) === userRole.EDITOR && (
                  <div className="w-fit bg-green-100 text-green-500 outline-none p-1 overflow-x-auto">
                    <span className="px-2">Editor</span>
                  </div>
                )}
                {Number(role) === userRole.USER && (
                  <div className="w-fit bg-purple-100 text-purple-500 outline-none p-1 overflow-x-auto">
                    <span className="px-2 ">User</span>
                  </div>
                )}
                {Number(role) === userRole.MODERATOR && (
                  <div className="w-fit bg-orange-100 text-orange-500 outline-none p-1 overflow-x-auto">
                    <span className="px-2">Moderator</span>
                  </div>
                )}
              </div>
              <div className="flex mb-4 p-1 items-center">
                <div
                  className={`w-4/12 text-slate-700 font-semibold px-5 ${
                    darkTheme ? 'text-white' : ''
                  }`}
                >
                  CreatedAt
                </div>
                <div className="w-8/12 bg-green-100 text-green-500 outline-none p-1 overflow-x-auto">
                  <span className="px-2">{time}</span>
                </div>
              </div>
            </div>

            <Button onClick={() => setMore(!more)}>{!more ? 'Show more' : 'Show less'}</Button>
          </div>
        </div>
      </UserInfoStyles>
    </>,
    document.querySelector('body')
  )
}

UserInfo.propTypes = {
  info: PropTypes.bool.isRequired,
  setInfo: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

export default UserInfo
