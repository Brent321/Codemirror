import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { linter, lintKeymap, lintGutter } from '@codemirror/lint'
import { basicSetup } from 'codemirror';
import { json, jsonParseLinter } from '@codemirror/lang-json'
import { foldGutter, indentOnInput } from '@codemirror/language'

interface CodeEditorProps {
    setCode: Dispatch<SetStateAction<string>>;
}

export function Editor(props: CodeEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);

    const onUpdate = EditorView.updateListener.of((viewUpdate) => {
        props.setCode(viewUpdate.state.doc.toString());
    });

    useEffect(() => {
        const state = EditorState.create({
            doc: '',
            extensions: [
                basicSetup,
                keymap.of([defaultKeymap as any, indentWithTab]),
                json(),
                foldGutter(),
                indentOnInput(),
                linter(jsonParseLinter()),
                onUpdate,
            ],
        });

        let view: EditorView;
        if (editorRef.current) {
            view = new EditorView({ state, parent: editorRef.current });
        }
        return () => {
            if (view)
                view.destroy();
        };
    }, []);

    return <div ref={editorRef}></div>;
};