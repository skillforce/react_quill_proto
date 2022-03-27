import React, {useState} from 'react';
import './madal.css'
import cross from '../img/x.svg'
import Editor from "../Editor/TextEditor";

export const Modal = ({active, setActive}) => {

    const [errorMsg, setErrorMsg] = useState('')


    const closePopUp = () => {
        setActive(false)
    }

    const stopPropagationEvent = (e) => {
        e.stopPropagation()
    }


    return (
        <div className={active ? 'popUp active' : 'popUp'}>
            <div className={active ? 'popUp-content active' : 'popUp-content'} onClick={stopPropagationEvent}>
                <div className={'title-block'}>
                    <div className={'title-name'}>Edit signature</div>
                    <div className={'gift-officer-name'}>(Gift officer: Maazina El Bacchus)</div>
                    <div onClick={closePopUp} className={'cross-image'}>
                        <img src={cross} alt="crossForClosePopUp"/>
                    </div>
                </div>
                {!errorMsg && <div className={'error-msg'}>File type not supported. Must be .jpeg, .png</div>}
                <Editor/>

            </div>
        </div>
    );
};

