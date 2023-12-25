import React, { memo, useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';

const EDITOR_JS_TOOLS = {
    list: List,
    header: Header,
};

const Editor = ({ data, onChange, editorblock, label }) => {
    const ref = useRef();

    useEffect(() => {
        if (!ref.current) {
            const editor = new EditorJS({
                holder: editorblock,
                onReady: () => {
                    ref.current = editor;
                },
                tools: EDITOR_JS_TOOLS,
                data: data,
                async onChange(api, event) {
                    const content = await api.saver.save();
                    onChange(content);
                },
            });
        }

        return () => {
            ref?.current?.destroy();
            ref.current = null;
        };
    }, [data]);

    return (
        <>
            <label className="text-sm" htmlFor={editorblock}>
                {label}
            </label>
            <div id={editorblock} />
        </>
    );
};

export default memo(Editor);
