import { Children, cloneElement, isValidElement, useRef } from 'react';
import { useGo } from '../lib/useGo';

/* Walk React children and replace every word of text with wrap(word, index).
   Whitespace is kept as plain text so lines still break naturally. */
function splitWords(children, wrap, counter = { n: 0 }) {
  return Children.map(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return String(child).split(/(\s+)/).filter(Boolean).map((t) => (/^\s+$/.test(t) ? t : wrap(t, counter.n++)));
    }
    if (isValidElement(child) && child.type !== 'br') {
      return cloneElement(child, undefined, splitWords(child.props.children, wrap, counter));
    }
    return child;
  });
}

function textOf(children) {
  return Children.toArray(children)
    .map((c) => (typeof c === 'string' || typeof c === 'number' ? c : isValidElement(c) ? textOf(c.props.children) : ''))
    .join('').replace(/\s+/g, ' ').trim();
}

/* Heading whose words rise out of a mask one after another, when it scrolls into view */
export function Split({ as: Tag = 'h2', className, children, ...rest }) {
  const ref = useRef(null);
  const go = useGo(ref);
  const words = splitWords(children, (w, i) => (
    <span className="wd" key={i}><span style={{ '--i': i }}>{w}</span></span>
  ));
  return (
    <Tag ref={ref} data-split="" aria-label={textOf(children)} className={[className, go && 'go'].filter(Boolean).join(' ') || undefined} {...rest}>
      {words}
    </Tag>
  );
}

/* Paragraph whose words light up as it scrolls through the viewport (driven by lib/motion.js) */
export function Words({ as: Tag = 'p', children, ...rest }) {
  return <Tag data-words="" {...rest}>{splitWords(children, (w, i) => <span className="w" key={i}>{w}</span>)}</Tag>;
}
