import { IContent } from '../Interfaces/index';

export function arrayify(content: IContent): any[] {
  if (typeof content.children === 'string') {
    return [content.children.split(' ')];
  } else {
    const words = [];
    content.children.forEach((child) => words.push(...arrayify(child)));
    return words;
  }
}

export function flatten(children: IContent[]) {
  const flatArray: any[] = [];
  for (const child of children) {
    if (typeof child.children === 'string') {
      flatArray.push(...child.children.split(' '));
    } else {
      flatArray.push(...child.children);
    }
  }
  return flatArray;
}

export function getPrecedingSibling(content: IContent): string {
  if (content.parent) {
    let sibling: string | IContent;
    if (content.index > 0) {
       sibling = content.parent.children[content.index - 1];
    } else {
      // TODO: finish
      return undefined;
    }
    while (typeof sibling !== 'string') {
      if (typeof sibling.children === 'string') {
        sibling = sibling.children;
      } else {
        sibling = sibling.children[sibling.children.length - 1];
      }
    }
    return sibling;
  }
}

export function getSubsequentSibling(content: IContent): string {
  if (content.parent) {
    let sibling: string | IContent;
    if (content.index < content.parent.children.length - 1) {
       sibling = content.parent.children[content.index + 1];
    } else {
      // TODO: finish
      return undefined;
    }
    while (typeof sibling !== 'string') {
      if (typeof sibling.children === 'string') {
        sibling = sibling.children;
      } else {
        sibling = sibling.children[0];
      }
    }
    return sibling;
  }
}

/**
 * Returns a string containing children of given content
 * @param content object implementing IContent to be stringified
 */
export function stringify(content: IContent): string {
  if (typeof content.children === 'string') {
    return content.children;
  } else {
    return content.children.map(stringify).join('\n');
  }
}