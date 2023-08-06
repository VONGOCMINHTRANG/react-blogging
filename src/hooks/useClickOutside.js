import { useEffect, useRef, useState } from 'react'

const useClickOutside = () => {
  const [show, setShow] = useState(false)
  const nodeRef = useRef()

  useEffect(() => {
    const handleClickOut = (e) => {
      if (nodeRef.current && !nodeRef.current.contains(e.target)) {
        setShow(false)
      } else {
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

export default useClickOutside
