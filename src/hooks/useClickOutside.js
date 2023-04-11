import { useEffect, useRef, useState } from 'react'
export default function useClickOutsite(dom = 'button') {
  const [show, setShow] = useState(false)
  const nodeRef = useRef()

  useEffect(() => {
    const handleClickOut = (e) => {
      if (nodeRef.current && !nodeRef.current.contains(e.target) && !e.target.matches(dom)) {
        // console.log('click outsite')
        setShow(false)
      } else {
        // console.log('click inside')
        setShow(true)
      }
    }
    document.addEventListener('click', handleClickOut)
    return () => {
      document.removeEventListener('click', handleClickOut)
    }
  }, [])

  return {
    show,
    setShow,
    nodeRef,
  }
}
