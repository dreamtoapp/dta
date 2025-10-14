"use client";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  // For now, render content as HTML (in production, you'd use a markdown parser like react-markdown)
  // or a rich text renderer. This is a placeholder implementation.

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <div className="-mx-4 md:mx-0">
        <div
          className="blog-content overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: formatContent(content) }}
        />
      </div>
    </div>
  );
}

// Simple content formatter (replace with markdown parser in production)
function formatContent(content: string): string {
  return content
    .split('\n\n')
    .map((paragraph) => {
      // Handle headings
      if (paragraph.startsWith('# ')) {
        return `<h2 class="text-3xl font-bold mt-12 mb-6">${paragraph.slice(2)}</h2>`;
      }
      if (paragraph.startsWith('## ')) {
        return `<h3 class="text-2xl font-bold mt-10 mb-4">${paragraph.slice(3)}</h3>`;
      }
      if (paragraph.startsWith('### ')) {
        return `<h4 class="text-xl font-bold mt-8 mb-3">${paragraph.slice(4)}</h4>`;
      }

      // Handle lists
      if (paragraph.startsWith('- ')) {
        const items = paragraph
          .split('\n')
          .map((item) => `<li>${item.slice(2)}</li>`)
          .join('');
        return `<ul class="list-disc list-inside space-y-2 my-6">${items}</ul>`;
      }

      if (paragraph.match(/^\d+\. /)) {
        const items = paragraph
          .split('\n')
          .map((item) => `<li>${item.replace(/^\d+\. /, '')}</li>`)
          .join('');
        return `<ol class="list-decimal list-inside space-y-2 my-6">${items}</ol>`;
      }

      // Regular paragraph
      return `<p class="leading-relaxed mb-6">${paragraph}</p>`;
    })
    .join('');
}


