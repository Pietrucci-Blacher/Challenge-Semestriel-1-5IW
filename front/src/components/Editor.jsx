import React, { memo, useEffect, useRef, useCallback } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import PropTypes from "prop-types";

const EDITOR_JS_TOOLS = {
    list: List,
    header: Header,
};

const Editor = ({ data, onChange, editorblock, label }) => {
    const ref = useRef();

    const handleChange = useCallback(async (api) => {
        const content = await api.saver.save();
        onChange(content);
    }, [onChange]);

    useEffect(() => {
        if (!ref.current) {
            const editor = new EditorJS({
                holder: editorblock,
                onReady: () => {
                    ref.current = editor;
                },
                tools: EDITOR_JS_TOOLS,
                data: data,
                onChange: handleChange,
            });
        }

        return () => {
            ref?.current?.destroy();
            ref.current = null;
        };
    }, [data, handleChange, editorblock]);

    return (
        <>
            <label className="text-sm" htmlFor={editorblock}>
                {label}
            </label>
            <div id={editorblock} />
        </>
    );
};

Editor.propTypes = {
    data: {},
    onChange: () => {},
    editorblock: 'editor',
    label: 'Editor',
}

export default memo(Editor);

