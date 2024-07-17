import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeHighlightLines from "rehype-highlight-code-lines";
import rehypeKatex from "rehype-katex";
import rehypeToc from "rehype-toc";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

export const pipeline = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeKatex)
  .use(rehypeSlug)
  .use(rehypeToc)
  .use(rehypeHighlight)
  .use(rehypeHighlightLines)
  .use(rehypeStringify);

export async function renderContent(content: string) {
  const result = await pipeline.process(content);
  return String(result);
}
