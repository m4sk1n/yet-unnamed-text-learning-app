import { IContent, IProgress } from '../Interfaces/index';

export default class Content implements IContent {
  public static stringify(content: IContent) {
    // tslint:disable-next-line: no-shadowed-variable
    function process(content: IContent) {
      const children = typeof content.children === 'string' ? content.children : content.children.map(process);
      return {
        children,
        progress: content.progress,
      };
    }
    return JSON.stringify(process(content));
  }

  public static parse(content: string) {
    const parsedContent = JSON.parse(content);
  // tslint:disable-next-line: no-shadowed-variable
    function process(content: IContent, parent?: IContent, index = 0, level = 0) {
      let childIndex = 0;
      if (typeof content.children !== 'string') {
        content.children.forEach((child) => {
          process(child, content, childIndex++, level + 1);
        });
      }
      content.parent = parent;
      content.index = index;
      content.level = level;
      if (typeof content.children === 'string') {
        content.words = content.children.split(' ').length;
        content.lines = 1;
      } else {
        content.words = 0;
        content.lines = 0;
        for (const child of content.children) {
          content.lines += child.lines;
          content.words += child.words;
        }
      }
      return content;
    }
    return process(parsedContent);
  }

  public static reset(content: IContent) {
    function getUnsetProgress() {
      return {
        ordering: 0,
        selecting: 0,
        writing: 0,
      };
    }

    content.progress = getUnsetProgress();
    if (typeof content.children === 'object') {
      for (const child of content.children) {
        this.reset(child);
      }
    }
    return content;
  }

  public static getProgress(content: IContent) {
    let sum = 0;
    const items: IContent[] = [];
    const getContentItems = (c: IContent) => {
      items.push(c);
      if (typeof c.children === 'object') {
        c.children.forEach(getContentItems);
      }
    };
    getContentItems(content);
    for (const item of items) {
      if (item.progress.ordering >= 1) {
        sum++;
      }
      if (item.progress.selecting >= 1) {
        sum++;
      }
      if (item.progress.writing >= 1) {
        sum++;
      }
    }
    return Math.floor(sum / (items.length * 3) * 100);
  }

  public children: string | IContent[];
  public level: number;
  public words: number;
  public lines: number;
  public index: number;
  public progress: IProgress;
  public parent: IContent;

  constructor(text: string, parent?: IContent, index = 0) {
    this.parent = parent;
    this.index = index;
    this.level = 0;
    this.lines = 0;
    this.progress = {
      ordering: 0,
      selecting: 0,
      writing: 0,
    };
    text = text.trim();
    this.children = text;
    if (text.includes('\n')) {
      let level;
      for (level = 0; ; level++) {
        if (!text.includes('\n'.repeat(level + 1))) {
          break;
        }
      }
      let childIndex = 0;
      this.children = text.split('\n'.repeat(level)).map((str) => new Content(str, this, childIndex++));
      this.words = 0;
      this.level = this.children[0].level + 1;
      for (const child of this.children) {
        this.lines += child.lines;
        this.words += child.words;
      }
    } else {
      this.lines = 1;
      this.words = this.children.split(' ').length;
    }
  }
}
