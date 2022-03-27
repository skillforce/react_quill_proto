import React, {useEffect, useMemo, useRef} from "react";
import ReactQuill, {Quill} from "react-quill";
import EditorToolbar from "./customToolBar/CustomToolBar";
import "react-quill/dist/quill.snow.css";
import './TextEditor.css'
import QuillImageDropAndPaste from "quill-image-drop-and-paste";
import BlotFormatter from 'quill-blot-formatter';
Quill.register('modules/blotFormatter', BlotFormatter);






export const Editor = () => {
    const [state, setState] = React.useState({value: ''});
    const editorQuill = useRef(null)

;
    const handleChange = value => {
        console.log(value)
        setTimeout(()=>{
            setState({ value:value });
        },0)
    };


    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "align",
        "strike",
        "script",
        "blockquote",
        "background",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "color",
        "code-block"
    ];

    // Undo and redo functions for Custom Toolbar
    function undoChange() {
        this.quill.history.undo();
    }

    function redoChange() {
        this.quill.history.redo();
    }

// Add sizes to whitelist and register them
    const Size = Quill.import("formats/size");
    Size.whitelist = ["small", "large", "huge"];
    Quill.register(Size, true);

    const icons = Quill.import('ui/icons');
    icons['bold'] = '<div class="png-bold"></div>';
    icons['italic'] = '<div class="png-italic"></div>';
    icons['underline'] = '<div class="png-underline"></div>';


// Add fonts to whitelist and register them
    const Font = Quill.import("formats/font");
    Font.whitelist = [
        "roboto",
        "times-new-roman",
        "sans-serif",
        "georgia",
    ];
    Quill.register(Font, true);
    Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste)


    const imageHandler = (dataUrl, type, imageData) => {
        imageData.minify({
            maxWidth: 320,
            maxHeight: 320,
            quality: .7
        }).then((miniImageData) => {
            const blob = miniImageData.toBlob()
            const file = miniImageData.toFile('my_cool_image.png')

            console.log(`type: ${type}`)
            console.log(`dataUrl: ${dataUrl}`)
            console.log(`blob: ${blob}`)
            console.log(`file: ${file}`)

            const quill=editorQuill.current.getEditor()
            //
            let index = (quill.getSelection() || {}).index;
            if (index === undefined || index < 0) index = quill.getLength();
            quill.insertEmbed(index, 'image', 'https://freepngimg.com/static/img/twitter.png', 'user')

        })

    };


     const modules = useMemo(()=>({
        toolbar: {
            container: "#toolbar",
            handlers: {
                undo: undoChange,
                redo: redoChange
            }
        },
        history: {
            delay: 500,
            maxStack: 100,
            userOnly: true
        },
        imageDropAndPaste: {
            handler: imageHandler.bind(this)
        },
         blotFormatter: {}
    }),[]);

     useEffect(()=>{
         console.log(state.value)
     })


    return (
        <div className="text-editor">
            <ReactQuill
                ref={editorQuill}
                theme="snow"
                defaultValue={state.value}
                onChange={handleChange}
                modules={modules}
                formats={formats}
            />
            <EditorToolbar />
        </div>
    );
};

export default Editor;
