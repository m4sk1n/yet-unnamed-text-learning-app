import { IContent, ISession } from '../Interfaces/index';
import { get2DArrayElement, get2DArrayLength, set2DArrayElement } from '../Utils/Array';
import { arrayify } from '../Utils/Content';
import { generateUniqueRandomNumbers } from '../Utils/Random';
import Exercise from './index';

export default class WritingExercise extends Exercise {
  public text: any;
  public options: string[];

  constructor(content: IContent, session: ISession, elements?: number) {
    super('writing', '', content, session);
    if (!elements) {
      if (content.words > 10) {
        elements = 5;
      } else {
        elements = content.words / 2;
      }
    }
    const answers: string[] = [];
    if (typeof content.children === 'string') {
      this.type = 'word-writing';
      this.text = content.children.split(' ');
      const numbers = generateUniqueRandomNumbers(
        this.text.length > elements ? elements : this.text.length, this.text.length,
      );
      numbers.sort((x, y) => x - y);
      for (const num of numbers) {
        answers.push(String(this.text[num]));
        this.text[num] = undefined;
      }
    } else {
      this.text = arrayify(content);
      const textLength = get2DArrayLength(this.text);
      const numbers = generateUniqueRandomNumbers(
        textLength > elements ? elements : textLength, textLength,
      );
      numbers.sort((x, y) => x - y);
      for (const num of numbers) {
        answers.push(get2DArrayElement(this.text, num));
        set2DArrayElement(this.text, num, undefined);
      }
    }
    this.answer = answers.join(' ');
  }
}
