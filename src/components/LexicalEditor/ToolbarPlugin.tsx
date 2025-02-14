import React from 'react';
import { FORMAT_TEXT_COMMAND, TextFormatType } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const ToolbarPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const applyFormat = (format: TextFormatType, event: React.MouseEvent) => {
    event.preventDefault();
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  return (
    <div className="flex gap-2 border-b bg-gray-100 p-2 dark:bg-gray-800">
      <button
        type="button" // <-- Ensure it doesn't submit the form
        className="rounded border px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700"
        onMouseDown={(event) => applyFormat('bold', event)}
      >
        <b>B</b>
      </button>
      <button
        type="button"
        className="rounded border px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700"
        onMouseDown={(event) => applyFormat('italic', event)}
      >
        <i>I</i>
      </button>
      <button
        type="button"
        className="rounded border px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700"
        onMouseDown={(event) => applyFormat('underline', event)}
      >
        <u>U</u>
      </button>
    </div>
  );
};

export default ToolbarPlugin;
