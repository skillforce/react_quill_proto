import React, {useEffect} from "react";
import undo from '../../img/undo.svg'
import redo from '../../img/redo.svg'
import sizeSelectArrow from '../../img/sizeSelectArrow.png'


const CustomUndo = () => (
    <img src={undo} alt="undo"/>
);

const CustomRedo = () => (
    <img src={redo} alt="redo"/>
);




// Quill Toolbar component
export const QuillToolbar = () => {


    useEffect(() => {


        const sizeSelect = document.getElementById('size');
        const fontsSelect = document.getElementById('fonts');
        const textBlock = fontsSelect.querySelector('.ql-picker-label')
        const sizeSelectArrow = sizeSelect.getElementsByTagName('svg')
        const newSizeSelectArrow = document.createElement('div')
        newSizeSelectArrow.className = "sizeSelectArrow"
        sizeSelectArrow[0].replaceWith(newSizeSelectArrow)
        sizeSelect.lastElementChild.className='ql-picker-options ql-picker-options-size-change'
        fontsSelect.addEventListener('click',()=>{
            if(fontsSelect.querySelector('[data-label]').getAttribute('data-label')){
                switch (fontsSelect.querySelector('[data-label]').getAttribute('data-label')){
                    case 'Times New Roman':
                        textBlock.className = 'ql-picker-label ql-active newFontSizeSizeTimesNewRoman'
                        break;
                    case 'Sans Serif':
                        textBlock.className = 'ql-picker-label ql-active newFontSizeSizeSansSerif' ;
                        break;
                    default:
                        textBlock.className = 'ql-picker-label ql-active'
                        break;
            }
            }

        })



    }, [])


    return (
        <div id="toolbar">
    <span className="ql-formats">
        <button className="ql-undo">
            <CustomUndo/>
        </button>
        <button className="ql-redo">
            <CustomRedo/>
        </button>
      <select className="ql-font" defaultValue="arial" id={'fonts'}>
        <option value="roboto">Roboto</option>
        <option value="times-new-roman">Times New Roman</option>
        <option value="sans-serif">Sans Serif</option>
        <option value="georgia">Georgia</option>
      </select>
        <div className='after-font-line-block'></div>
      <select className="ql-size" defaultValue={'normal'} id={'size'}>
        <option value="small">Small</option>
        <option value='normal'>Normal</option>
        <option value="large">Large</option>
        <option value="huge">Huge</option>
      </select>
    </span>
            <span className="ql-formats">
      <button className="ql-bold"/>
      <button className="ql-italic"/>
      <button className="ql-underline"/>
    </span>

        </div>
    )
};

export default QuillToolbar;
