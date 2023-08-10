import { IoLocationSharp } from 'react-icons/io5'
import { AiTwotonePhone } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md'

export const FooterLeftData = [
  {
    name: 'location',
    icon: <IoLocationSharp className="text-green-500 h-6 w-6"></IoLocationSharp>,
    content: 'TPHCM, Viet Nam',
  },
  {
    name: 'phone',
    icon: <AiTwotonePhone className="text-green-500 h-6 w-6"></AiTwotonePhone>,
    content: '0909090909',
  },
  {
    name: 'email',
    icon: <MdEmail className="text-green-500 h-6 w-6"></MdEmail>,
    content: 'ReactBlogging@gmail.com',
  },
]
