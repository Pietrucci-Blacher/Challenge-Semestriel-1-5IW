import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import {Label} from "flowbite-react";
import PropTypes from "prop-types";


export default function TextEditor({label}) {

    const configuration = {
        holder: 'editorjs',
        tools: {
            header: {
                class: Header,
                inlineToolbar: ['link'],
                config: {
                    placeholder: 'Enter a header',
                    levels: [2, 3, 4],
                    defaultLevel: 3,
                },
            },
            list: {
                class: List,
                inlineToolbar: true,
            },
        },
    }

    const editor = new EditorJS(configuration)
    return (
        <div>
            <div className="mb-2 block">
                <Label>{label}:</Label>
            </div>
            <div id="editorjs"></div>
        </div>
    )
}

TextEditor.propTypes = {
    label: PropTypes.string.isRequired,
}
