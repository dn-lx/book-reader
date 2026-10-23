import {
  readingHighlights,
  type ReadingPage,
  type ReadingAppearance,
  type ReaderNote,
} from "@pagechime/core";
const escape = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
export function bookTextHtml(
  page: ReadingPage | undefined,
  title: string,
  chapter: number,
  first: boolean,
  appearance: ReadingAppearance,
  notes: ReaderNote[],
  active: number,
  colors: {
    paper: string;
    ink: string;
    muted: string;
    line: string;
    accent: string;
    highlight: string;
    soft: string;
  },
  context = "",
) {
  const fragments = (page?.fragments || [])
    .map(
      (f) =>
        `<p class="passage ${f.segment === active ? "spoken" : ""} ${f.heading ? "heading" : ""}"><button aria-label="Listen from here" data-listen="${f.segment}">▷</button><span data-fragment data-segment="${f.segment}" data-start="${f.start}">${readingHighlights(
          f,
          notes,
        )
          .map((p) =>
            p.highlighted ? `<mark>${escape(p.text)}</mark>` : escape(p.text),
          )
          .join("")}</span></p>`,
    )
    .join("");
  return `<!doctype html><html lang="en"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5"><style>
*{box-sizing:border-box}body{margin:0;padding:25px ${appearance.width === "wide" ? 18 : 27}px;background:${colors.paper};color:${colors.ink};font-family:${appearance.font === "serif" ? "Georgia,serif" : "system-ui,sans-serif"};font-size:${appearance.size}px;line-height:${appearance.leading};overflow-wrap:anywhere;-webkit-text-size-adjust:100%}h1{font:normal 28px/1.2 Georgia,serif;text-align:center;margin:15px 0 30px}.chapter{font:9px system-ui;letter-spacing:.18em;text-align:center;color:${colors.muted}}p{position:relative;white-space:pre-wrap;margin:0 0 19px;padding:3px 5px;border-radius:3px}.spoken{background:${colors.soft}}.heading{font:500 13px/1.7 system-ui;letter-spacing:.07em}mark,::selection{background:${colors.highlight};color:inherit}button{position:absolute;left:-25px;top:0;width:25px;min-height:44px;padding:0;background:none;border:0;color:${colors.accent};font-size:14px}button:focus-visible{outline:2px solid ${colors.accent}}.end{width:25px;height:1px;background:${colors.line};margin:30px auto}
</style><body>${first ? `<div class="chapter">CHAPTER ${chapter + 1}</div><h1>${escape(title)}</h1>` : ""}<article aria-label="Book text">${fragments}</article><div class="end"></div><script>
const send=x=>window.ReactNativeWebView?.postMessage(JSON.stringify({...x,context:${JSON.stringify(context).replace(/</g, "\\u003c")}}));
document.addEventListener('click',e=>{const b=e.target.closest('[data-listen]');if(b)send({type:'listen',segment:Number(b.dataset.listen)});});
let timer;document.addEventListener('selectionchange',()=>{clearTimeout(timer);timer=setTimeout(()=>{
 const s=getSelection();if(!s||s.isCollapsed||!s.rangeCount)return;const r=s.getRangeAt(0),quote=s.toString().trim();if(!quote||quote.length>2000)return;
 const part=(node,offset)=>{const el=(node.nodeType===1?node:node.parentElement)?.closest('[data-fragment]');if(!el)return null;const before=document.createRange();before.selectNodeContents(el);before.setEnd(node,offset);return {segment:Number(el.dataset.segment),offset:Number(el.dataset.start)+before.toString().length};};
 const a=part(r.startContainer,r.startOffset),b=part(r.endContainer,r.endOffset);if(a&&b)send({type:'selection',quote,segment:a.segment,offset:a.offset,endSegment:b.segment,endOffset:b.offset});
},120);});
</script></body></html>`;
}
