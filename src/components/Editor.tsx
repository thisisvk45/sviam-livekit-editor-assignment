"use client";

import { useEffect, useRef, type Ref } from "react";
import { EditorState, StateEffect, StateField } from "@codemirror/state";
import {
  EditorView,
  Decoration,
  keymap,
  lineNumbers,
} from "@codemirror/view";
import type { DecorationSet } from "@codemirror/view";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";

const setHighlight = StateEffect.define<{
  startLine: number;
  endLine: number;
} | null>();

const highlightField = StateField.define<DecorationSet>({
  create() {
    return Decoration.none;
  },

  update(highlights, tr) {
    highlights = highlights.map(tr.changes);

    for (const effect of tr.effects) {
      if (effect.is(setHighlight)) {
        if (!effect.value) {
          highlights = Decoration.none;
          continue;
        }

        const { startLine, endLine } = effect.value;

        const start = Math.max(1, startLine);
        const end = Math.max(start, endLine);

        const decorations = [];

        for (let lineNumber = start; lineNumber <= end; lineNumber++) {
          if (lineNumber <= tr.state.doc.lines) {
            const line = tr.state.doc.line(lineNumber);

            decorations.push(
              Decoration.line({
                attributes: {
                  class: "agent-highlight-line",
                },
              }).range(line.from)
            );
          }
        }

        highlights = Decoration.set(decorations);
      }
    }

    return highlights;
  },

  provide: field => EditorView.decorations.from(field),
});

export type EditorHandle = {
  highlightLines: (startLine: number, endLine: number) => void;
  clearHighlight: () => void;
  setCode: (code: string) => void;
};

export default function Editor({
  initialCode,
  onChange,
  editorRef,
}: {
  initialCode: string;
  onChange: (code: string) => void;
  editorRef?: Ref<EditorHandle>;
}) {
  const host = useRef<HTMLDivElement>(null);
  const callback = useRef(onChange);

  callback.current = onChange;

  useEffect(() => {
    if (!host.current) return;

    const view = new EditorView({
      parent: host.current,

      state: EditorState.create({
        doc: initialCode,

        extensions: [
          lineNumbers(),

          history(),

          keymap.of([
            ...defaultKeymap,
            ...historyKeymap,
            indentWithTab,
          ]),

          javascript({
            typescript: true,
          }),

          EditorView.lineWrapping,

          highlightField,

          EditorView.contentAttributes.of({
            "aria-label": "TypeScript code editor",
          }),

          EditorView.updateListener.of(update => {
            if (update.docChanged) {
              callback.current(update.state.doc.toString());
            }
          }),

          EditorView.theme({
            "&": {
              height: "100%",
              fontSize: "14px",
            },

            ".cm-scroller": {
              overflow: "auto",
              fontFamily: "var(--mono)",
            },

            ".cm-content": {
              padding: "20px 0",
            },

            ".cm-gutters": {
              background: "#f7f7f3",
              border: "none",
              color: "#92958e",
            },

            ".cm-line": {
              padding: "0 14px",
            },

            "&.cm-focused": {
              outline: "none",
            },

            ".agent-highlight-line": {
              background: "#fff3a3",
            },
          }),
        ],
      }),
    });

    if (editorRef && "current" in editorRef) {
      editorRef.current = {
        highlightLines: (startLine, endLine) => {
          view.dispatch({
            effects: setHighlight.of({
              startLine,
              endLine,
            }),
          });
        },

        clearHighlight: () => {
          view.dispatch({
            effects: setHighlight.of(null),
          });
        },

        setCode: code => {
          view.dispatch({
            changes: {
              from: 0,
              to: view.state.doc.length,
              insert: code,
            },
          });
        },
      };
    }

    return () => {
      if (editorRef && "current" in editorRef) {
        editorRef.current = null;
      }

      view.destroy();
    };
  }, [initialCode, editorRef]);

  return <div className="editor" ref={host} />;
}