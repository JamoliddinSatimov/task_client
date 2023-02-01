import React, {useRef,useEffect} from 'react'

import './modal.css'

export default function Modal({addModal,setAddModal, children, title}) {

    const parentRef = useRef()

    const handleCloseModal= ()=>{
        setAddModal(false)
    }
    const handleModalClose = (e)=>{
       if (e.target===parentRef.current) {
        console.log(parentRef.current);
        setAddModal(false)
       }
    }

    
    // useEffect(()=>{
    //     const escCloseModal = (e)=>{
    //         console.log(e);
    //         if (e.keyCode===27) {
    //             setAddModal(false)
    //         }
    //     }
    //     if (addModal) {
    //         window.addEventListener("keyup", escCloseModal)
    //     }

    //     return ()=>window.removeEventListener("keyup", escCloseModal);
    // },[])

  return (
    <div ref={parentRef} className={'modal'} onClick={handleModalClose}>
       <div id='modal-animation' className='modal-card' >
            <div className='modal-tool'>
                <h2>{title}</h2>
                <button onClick={handleCloseModal} className='close-btn'>&times;</button>
            </div>
           {children}
       </div>
    </div>
  )
}