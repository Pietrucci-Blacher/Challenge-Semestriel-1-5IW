import React, { memo, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

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

                tools: EDITOR_JS_TOOLS,
                data: data,
                async onChange(api, event) {
                    const data = await api.saver.save();
                    onChange(data);
                },
            });
            ref.current = editor;
        }

        return () => {
            if (ref.current && ref.current.destroy) {
                ref.current.destroy();
            }
        };
    }, []);
    return (
        <>
            <label className="text-sm" for={editorblock}>{label}</label>
            <div id={editorblock} />
        </>
    );
    // return (
    //     <div className="editor">
    //         <label for={editorblock}>{label}</label>
    //         <div id={editorblock} />
    //     </div>
    // );
};

export default memo(Editor);
