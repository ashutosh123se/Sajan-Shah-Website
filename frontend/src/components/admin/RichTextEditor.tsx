'use client';

import React, { useEffect, useRef } from 'react';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Eraser,
  Undo2,
  Redo2,
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

function ToolbarButton({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="p-2 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Start writing…',
  minHeight = '360px',
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const lastValueRef = useRef(value);

  useEffect(() => {
    if (!editorRef.current) return;
    if (value !== lastValueRef.current) {
      editorRef.current.innerHTML = value || '';
      lastValueRef.current = value;
    }
  }, [value]);

  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML && value) {
      editorRef.current.innerHTML = value;
      lastValueRef.current = value;
    }
  }, []);

  const emitChange = () => {
    const html = editorRef.current?.innerHTML || '';
    lastValueRef.current = html;
    onChange(html);
  };

  const run = (command: string, commandValue?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    emitChange();
  };

  const insertLink = () => {
    const url = window.prompt('Enter URL');
    if (!url) return;
    run('createLink', url);
  };

  return (
    <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950">
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-zinc-800 bg-zinc-900/80">
        <ToolbarButton title="Bold" onClick={() => run('bold')}>
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton title="Italic" onClick={() => run('italic')}>
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton title="Underline" onClick={() => run('underline')}>
          <Underline size={16} />
        </ToolbarButton>
        <span className="w-px h-5 bg-zinc-700 mx-1" />
        <ToolbarButton title="Heading" onClick={() => run('formatBlock', 'h2')}>
          <Heading2 size={16} />
        </ToolbarButton>
        <ToolbarButton title="Subheading" onClick={() => run('formatBlock', 'h3')}>
          <Heading3 size={16} />
        </ToolbarButton>
        <ToolbarButton title="Paragraph" onClick={() => run('formatBlock', 'p')}>
          <span className="text-xs font-bold px-0.5">P</span>
        </ToolbarButton>
        <span className="w-px h-5 bg-zinc-700 mx-1" />
        <ToolbarButton title="Bullet list" onClick={() => run('insertUnorderedList')}>
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton title="Numbered list" onClick={() => run('insertOrderedList')}>
          <ListOrdered size={16} />
        </ToolbarButton>
        <ToolbarButton title="Insert link" onClick={insertLink}>
          <LinkIcon size={16} />
        </ToolbarButton>
        <span className="w-px h-5 bg-zinc-700 mx-1" />
        <ToolbarButton title="Undo" onClick={() => run('undo')}>
          <Undo2 size={16} />
        </ToolbarButton>
        <ToolbarButton title="Redo" onClick={() => run('redo')}>
          <Redo2 size={16} />
        </ToolbarButton>
        <ToolbarButton title="Clear formatting" onClick={() => run('removeFormat')}>
          <Eraser size={16} />
        </ToolbarButton>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={emitChange}
        onBlur={emitChange}
        data-placeholder={placeholder}
        className="legal-rich-editor px-4 py-3 text-white text-[15px] leading-relaxed outline-none overflow-y-auto empty:before:content-[attr(data-placeholder)] empty:before:text-zinc-600"
        style={{ minHeight }}
      />

      <style jsx global>{`
        .legal-rich-editor h2 {
          font-size: 1.35rem;
          font-weight: 700;
          margin: 1rem 0 0.5rem;
          color: #fff;
        }
        .legal-rich-editor h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0.85rem 0 0.4rem;
          color: #f3f3f3;
        }
        .legal-rich-editor p {
          margin: 0.55rem 0;
        }
        .legal-rich-editor ul {
          list-style: disc;
          padding-left: 1.4rem;
          margin: 0.55rem 0;
        }
        .legal-rich-editor ol {
          list-style: decimal;
          padding-left: 1.4rem;
          margin: 0.55rem 0;
        }
        .legal-rich-editor a {
          color: #f26522;
          text-decoration: underline;
        }
        .legal-rich-editor strong {
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
