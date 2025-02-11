import React, { useEffect } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
// import { EditorState,$getRoot } from "lexical";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useFormikContext } from 'formik';
import ToolbarPlugin from './ToolbarPlugin';
import { $getRoot, $createParagraphNode, $createTextNode } from 'lexical';

const EditorOnChangePlugin = ({
  fieldName,
  initialContent,
}: {
  fieldName: string;
  initialContent?: string;
}) => {
  const { setFieldValue } = useFormikContext(); // Get Formik context
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (initialContent) {
      try {
        // Try to parse the initial content as serialized editor state
        const parsedState = JSON.parse(initialContent);
        editor.setEditorState(editor.parseEditorState(parsedState));
      } catch (e) {
        // If parsing fails, treat it as plain text
        editor.update(() => {
          const root = $getRoot();
          root.clear();
          const paragraph = $createParagraphNode();
          const text = $createTextNode(initialContent);
          paragraph.append(text);
          root.append(paragraph);
          console.log(e);
        });
      }
    }
  }, []);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        try {
          const serializedState = JSON.stringify(editorState.toJSON());
          setFieldValue(fieldName, serializedState);
        } catch (e) {
          console.error('Error serializing Lexical state:', e);
        }
      });
    });
  }, [editor, setFieldValue, fieldName]);
  
  return null;
};

export const RichTextDisplay: React.FC<{
  content: string;
  isExpanded?: boolean;
}> = ({ content, isExpanded }) => {
  const initialConfig = {
    namespace: 'NoteViewer',
    theme: {},
    onError: (error: Error) => console.error(error),
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        className={`flex-grow overflow-hidden p-4 ${isExpanded ? 'overflow-y-auto' : ''}`}
      >
        <div
          className={`text-sm text-foreground/80 dark:text-foreground/70 ${isExpanded ? '' : 'line-clamp-4'}`}
        >
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[150px] w-full p-2 outline-none" />
            }
            placeholder={null}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <EditorStateLoader content={content} />
        </div>
      </div>
    </LexicalComposer>
  );
};

const EditorStateLoader: React.FC<{ content: string }> = ({ content }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (content) {
      try {
        const parsedState = JSON.parse(content);
        if (parsedState && typeof parsedState === 'object') {
          editor.setEditorState(editor.parseEditorState(parsedState));
        } else {
          throw new Error('Invalid Lexical state format');
        }
      } catch (e) {
        console.error('Failed to parse Lexical state,treating as plain text:', e);

        editor.update(() => {
          const root = $getRoot();
          root.clear();
          const paragraph = $createParagraphNode();
          const text = $createTextNode(content);
          paragraph.append(text);
          root.append(paragraph);
        });
      }
    }
  }, [content, editor]);
  return null;
};
interface LexicalEditorProps {
  fieldName: string;
  initialContent: string;
  editable?: boolean;
}
const LexicalEditor: React.FC<LexicalEditorProps> = ({
  fieldName,
  initialContent,
  editable,
}) => {
  const initialConfig = {
    namespace: 'NoteEditor',
    onError: (error: Error) => console.error(error),

    theme: {
      text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
      },
    },
  };
 

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="rounded-lg border p-2 dark:border-gray-600 dark:bg-gray-700">
        <ToolbarPlugin />
        <div className="p-2">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[150px] w-full p-2 outline-none" contentEditable={editable}/>
            }
            placeholder={
              <div className="p-2 text-gray-400">Enter your note...</div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <EditorOnChangePlugin
          fieldName={fieldName}
          initialContent={initialContent}
        />
      </div>
    </LexicalComposer>
  );
};

export default LexicalEditor;