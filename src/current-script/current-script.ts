

const CURRENT_SCRIPT = 'currentScript';
export const currentScript = () => {
 /*  if (CURRENT_SCRIPT in document) {
    return;
  } */

  const doc = document as Document;
  const head = doc.head as HTMLHeadElement;
  const scripts: HTMLScriptElement[] = Array.from(doc.querySelectorAll('script'));

  const originalAppendChild = head.appendChild.bind(head);

  head.appendChild = function <T extends Node>(node: T): T {
    if (node instanceof HTMLScriptElement) {
      scripts.push(node);

      node.onload = () => {
        scripts.pop();
      };
    }
    return originalAppendChild(node);
  };

  Object.defineProperty(document, CURRENT_SCRIPT, {
    get: () => {
      return scripts.length ? scripts[scripts.length - 1] : null;
    },
    configurable: true,
  });
};
