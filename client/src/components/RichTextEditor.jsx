import React, { useRef, useEffect, useState } from 'react';

const RichTextEditor = ({ value, onChange, placeholder = 'Write your clinical review content here...' }) => {
  const editorRef = useRef(null);
  const [isCodeView, setIsCodeView] = useState(false);
  const [rawHtml, setRawHtml] = useState(value || '');
  const isUpdatingRef = useRef(false);

  // Sync value from parent into editor when not internally updating
  useEffect(() => {
    if (isUpdatingRef.current) {
      isUpdatingRef.current = false;
      return;
    }
    setRawHtml(value || '');
    if (editorRef.current && !isCodeView) {
      if (editorRef.current.innerHTML !== (value || '')) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value, isCodeView]);

  const handleInput = () => {
    if (editorRef.current && !isCodeView) {
      const html = editorRef.current.innerHTML;
      isUpdatingRef.current = true;
      setRawHtml(html);
      onChange(html);
    }
  };

  const handleCodeChange = (e) => {
    const html = e.target.value;
    setRawHtml(html);
    isUpdatingRef.current = true;
    onChange(html);
  };

  const execCmd = (command, value = null) => {
    document.execCommand(command, false, value);
    handleInput();
  };

  const handleFormatBlock = (e) => {
    const val = e.target.value;
    if (val) {
      execCmd('formatBlock', val);
    }
  };

  const handleInsertLink = () => {
    const url = prompt('Enter link URL (e.g. https://example.com):');
    if (url) {
      execCmd('createLink', url);
    }
  };

  const handleInsertImage = () => {
    const url = prompt('Enter Image URL:');
    if (url) {
      execCmd('insertImage', url);
    }
  };

  const toggleCodeView = () => {
    if (!isCodeView) {
      if (editorRef.current) {
        setRawHtml(editorRef.current.innerHTML);
      }
    } else {
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = rawHtml;
        }
      }, 0);
    }
    setIsCodeView(!isCodeView);
  };

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#0052CC]/20 transition-all">
      {/* Toolbar */}
      <div className="bg-[#F8F9FA] border-b border-gray-200 p-2.5 flex flex-wrap items-center gap-1.5 text-gray-700 select-none">
        
        {/* Block Format Select */}
        <select
          onChange={handleFormatBlock}
          defaultValue="<p>"
          className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold outline-none focus:border-[#0052CC] cursor-pointer"
          disabled={isCodeView}
        >
          <option value="<p>">Paragraph</option>
          <option value="<h2>">Heading 2 (H2)</option>
          <option value="<h3>">Heading 3 (H3)</option>
          <option value="<h4>">Heading 4 (H4)</option>
          <option value="<blockquote>">Quote</option>
        </select>

        <div className="w-[1px] h-6 bg-gray-300 mx-1"></div>

        {/* Text Style Buttons */}
        <button
          type="button"
          onClick={() => execCmd('bold')}
          disabled={isCodeView}
          title="Bold (Ctrl+B)"
          className="p-1.5 hover:bg-gray-200 rounded-lg text-sm font-bold w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-40"
        >
          <i className="ri-bold"></i>
        </button>

        <button
          type="button"
          onClick={() => execCmd('italic')}
          disabled={isCodeView}
          title="Italic (Ctrl+I)"
          className="p-1.5 hover:bg-gray-200 rounded-lg text-sm font-bold w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-40"
        >
          <i className="ri-italic"></i>
        </button>

        <button
          type="button"
          onClick={() => execCmd('underline')}
          disabled={isCodeView}
          title="Underline (Ctrl+U)"
          className="p-1.5 hover:bg-gray-200 rounded-lg text-sm font-bold w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-40"
        >
          <i className="ri-underline"></i>
        </button>

        <button
          type="button"
          onClick={() => execCmd('strikethrough')}
          disabled={isCodeView}
          title="Strikethrough"
          className="p-1.5 hover:bg-gray-200 rounded-lg text-sm font-bold w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-40"
        >
          <i className="ri-strikethrough"></i>
        </button>

        <div className="w-[1px] h-6 bg-gray-300 mx-1"></div>

        {/* Lists */}
        <button
          type="button"
          onClick={() => execCmd('insertUnorderedList')}
          disabled={isCodeView}
          title="Bullet List"
          className="p-1.5 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-40"
        >
          <i className="ri-list-unordered"></i>
        </button>

        <button
          type="button"
          onClick={() => execCmd('insertOrderedList')}
          disabled={isCodeView}
          title="Numbered List"
          className="p-1.5 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-40"
        >
          <i className="ri-list-ordered"></i>
        </button>

        <div className="w-[1px] h-6 bg-gray-300 mx-1"></div>

        {/* Links & Images */}
        <button
          type="button"
          onClick={handleInsertLink}
          disabled={isCodeView}
          title="Insert Link"
          className="p-1.5 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-40"
        >
          <i className="ri-link"></i>
        </button>

        <button
          type="button"
          onClick={() => execCmd('unlink')}
          disabled={isCodeView}
          title="Remove Link"
          className="p-1.5 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-40"
        >
          <i className="ri-link-unlink"></i>
        </button>

        <button
          type="button"
          onClick={handleInsertImage}
          disabled={isCodeView}
          title="Insert Image"
          className="p-1.5 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-40"
        >
          <i className="ri-image-add-line"></i>
        </button>

        <div className="w-[1px] h-6 bg-gray-300 mx-1"></div>

        {/* Alignment */}
        <button
          type="button"
          onClick={() => execCmd('justifyLeft')}
          disabled={isCodeView}
          title="Align Left"
          className="p-1.5 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-40"
        >
          <i className="ri-align-left"></i>
        </button>

        <button
          type="button"
          onClick={() => execCmd('justifyCenter')}
          disabled={isCodeView}
          title="Align Center"
          className="p-1.5 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-40"
        >
          <i className="ri-align-center"></i>
        </button>

        <button
          type="button"
          onClick={() => execCmd('justifyRight')}
          disabled={isCodeView}
          title="Align Right"
          className="p-1.5 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-40"
        >
          <i className="ri-align-right"></i>
        </button>

        <div className="w-[1px] h-6 bg-gray-300 mx-1"></div>

        {/* Utilities */}
        <button
          type="button"
          onClick={() => execCmd('insertHorizontalRule')}
          disabled={isCodeView}
          title="Insert Divider Line"
          className="p-1.5 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-40"
        >
          <i className="ri-separator"></i>
        </button>

        <button
          type="button"
          onClick={() => execCmd('removeFormat')}
          disabled={isCodeView}
          title="Clear Formatting"
          className="p-1.5 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-40"
        >
          <i className="ri-format-clear"></i>
        </button>

        <button
          type="button"
          onClick={() => execCmd('undo')}
          disabled={isCodeView}
          title="Undo"
          className="p-1.5 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-40"
        >
          <i className="ri-arrow-go-back-line"></i>
        </button>

        <button
          type="button"
          onClick={() => execCmd('redo')}
          disabled={isCodeView}
          title="Redo"
          className="p-1.5 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-40"
        >
          <i className="ri-arrow-go-forward-line"></i>
        </button>

        {/* View HTML Code Toggle */}
        <button
          type="button"
          onClick={toggleCodeView}
          title={isCodeView ? 'Switch to Visual Editor' : 'Switch to HTML Code View'}
          className={`ml-auto px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            isCodeView
              ? 'bg-[#0052CC] text-white shadow-sm'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          <i className={isCodeView ? 'ri-eye-line' : 'ri-code-s-slash-line'}></i>
          {isCodeView ? 'Visual Mode' : 'HTML View'}
        </button>
      </div>

      {/* Editor Content Area */}
      {isCodeView ? (
        <textarea
          value={rawHtml}
          onChange={handleCodeChange}
          placeholder="Paste or write HTML code..."
          className="w-full min-h-[380px] p-4 font-mono text-xs leading-relaxed text-gray-800 bg-[#F8F9FA] outline-none border-none resize-y"
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onBlur={handleInput}
          className="min-h-[380px] p-6 text-gray-800 outline-none prose prose-slate max-w-none focus:outline-none overflow-y-auto leading-relaxed"
          style={{ whiteSpace: 'pre-wrap' }}
          data-placeholder={placeholder}
        />
      )}

      {/* Footer Info */}
      <div className="bg-[#F8F9FA] border-t border-gray-100 px-4 py-2 flex justify-between items-center text-[11px] text-gray-400 font-semibold">
        <span>{isCodeView ? 'HTML Code Editing Mode' : 'WYSIWYG Visual Editor'}</span>
        <span>Supports rich text, headings, formatting, links, and media</span>
      </div>
    </div>
  );
};

export default RichTextEditor;
