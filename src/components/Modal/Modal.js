import React, { useEffect, useCallback } from 'react';
import './Modal.css';

function Modal(props) {

    const { 
        title, 
        width = 700,
        children, 
        isVisible,
        cancelModal,  
        renderFooter,
        isRenderHeader = true,       
    } = props;

    const _cancelModal = useCallback(
        () => {
            if(cancelModal) {
                cancelModal()
            }
        },
        [cancelModal]
    )

    useEffect(() => {
        document.addEventListener('keyup', (e)=>{
            if(e.keyCode === 27 && isVisible){
                //console.log('running')
                _cancelModal();
            }
        }) 
     },[_cancelModal, isVisible])

    const _renderFooter = () => {
        // case nếu không truyền từ cha vào thì sao? 
        //     => cần cho 1 footer mặc định.
        if (renderFooter && typeof renderFooter === 'function') {
            return renderFooter();
        } else {
            return (
                <div>
                    <button className="btn-save">Save</button>
                    <button className="btn-close" onClick={_cancelModal}>Close</button>
                </div>
            )
        }
    }

    useEffect(() => {
        if(isVisible){
            // Modal open => thêm class vào cho body
            document.querySelector('body').classList.add('modal-active');
        }else {
            // Modal close => remove class 
            document.querySelector('body').classList.remove('modal-active');
        }
    }, [isVisible])

    return (
        <div className={`modal-wrapper ${isVisible ? 'show' : ''}`}>
            <div className="overlay"></div>
            <div className="modal-dialog">
                <div className="modal-content" style={{width}}>
                    {
                        isRenderHeader && <div className="modal-header">
                            {title}
                            <span className="btn-exit" onClick={_cancelModal}>X</span>
                        </div>
                    }
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        {
                            _renderFooter()
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;