import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  if (!content) return null;

  return (
    <div className={`prose prose-invert max-w-none text-text-secondary text-xs sm:text-sm leading-relaxed ${className}`}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-base sm:text-lg font-bold text-white mt-3 mb-2 flex items-center gap-2 border-b border-white/10 pb-1 font-outfit">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-sm sm:text-base font-bold text-white mt-3 mb-1.5 flex items-center gap-1.5 font-outfit">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xs sm:text-sm font-semibold text-emerald-400 mt-2.5 mb-1 flex items-center gap-1 font-outfit">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xs font-semibold text-text-primary mt-2 mb-1">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-2 last:mb-0 text-text-secondary leading-relaxed">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="space-y-1.5 my-2 pl-4 list-disc marker:text-electric-blue text-text-secondary">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="space-y-1.5 my-2 pl-4 list-decimal marker:text-electric-blue text-text-secondary">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-snug pl-0.5">
              {children}
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-white">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="text-text-muted italic">
              {children}
            </em>
          ),
          code: ({ children }) => (
            <code className="px-1.5 py-0.5 rounded-md bg-white/10 text-cyan-300 font-mono text-[11px] sm:text-xs">
              {children}
            </code>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-electric-blue pl-3 italic text-text-muted my-2">
              {children}
            </blockquote>
          ),
          hr: () => (
            <hr className="border-white/10 my-3" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
