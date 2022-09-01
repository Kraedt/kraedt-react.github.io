import { PropsWithChildren } from "react"

export const Modal = ({ children, onClose }: PropsWithChildren<{ onClose: () => void }>) => {
  return (<div className='modal'>
    <span className="close" onClick={onClose}>&times;</span>
    <div className='modal-content'>
      {children}
    </div>
  </div>
  )
}