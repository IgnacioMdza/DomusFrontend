import { createPortal } from "react-dom";

export default function Modal ({isVisible, onClose, children}) {

    if( !isVisible ) return null
    return createPortal(
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-30'>
            {children}
        </div>,
        document.getElementById('portal')
    )
}