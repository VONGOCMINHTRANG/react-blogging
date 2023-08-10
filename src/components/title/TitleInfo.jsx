import IconClose from 'assets/svg/IconClose'
import { useTranslation } from 'react-i18next'

const TitleInfo = ({ title, onClick = () => {} }) => {
  const { t } = useTranslation()
  return (
    <div className="flex relative justify-between">
      <div className="title">{t(title)}</div>
      <div
        onClick={onClick}
        className="icon-close cursor-pointer hover:bg-gray-400 my-auto p-2 bg-gray-500 text-white rounded-md"
      >
        <IconClose />
      </div>
    </div>
  )
}

export default TitleInfo
