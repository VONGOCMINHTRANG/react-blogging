import { FooterLeftData } from './FooterLeftData'

const FooterLeftItem = () => {
  return (
    <>
      {FooterLeftData.length > 0 &&
        FooterLeftData.map((item) => (
          <div key={item.name} className="flex flex-wrap gap-2 items-center mb-7">
            <div className="border-2 rounded-full border-green-500 p-1">{item.icon}</div>
            <h3 className="font-semibold text-green-500 md:text-sm">{item.content}</h3>
          </div>
        ))}
    </>
  )
}

export default FooterLeftItem
