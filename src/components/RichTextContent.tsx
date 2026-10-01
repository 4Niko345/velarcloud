import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

/** Rich text from the admin (simple pages, blog articles) with readable defaults. */
export function RichTextContent({ data, className = '' }: { data: SerializedEditorState; className?: string }) {
  return (
    <div
      className={`space-y-5 text-lg leading-relaxed text-foreground/90 [&_a]:text-brand-ink [&_a]:underline [&_a]:underline-offset-2 [&_blockquote]:border-l-4 [&_blockquote]:border-brand/40 [&_blockquote]:pl-5 [&_blockquote]:italic [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_li]:mt-1.5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6 ${className}`}
    >
      <RichText data={data} />
    </div>
  )
}
