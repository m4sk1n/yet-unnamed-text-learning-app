import { IContent, ISession } from '../Interfaces/index';
import { shuffle } from '../Utils/Array';
import { flatten, stringify } from '../Utils/Content';
import { generateRandomNumbers, generateUniqueRandomNumbers } from '../Utils/Random';
import Exercise from './index';

export default class SelectingExercise extends Exercise {
  public text: Array<string | undefined>;
  public options: string[];

  constructor(content: IContent, session: ISession, elements?: number, options?: number) {
    if (!elements) {
      elements = Math.ceil(
        typeof content.children === 'string' ? content.words / 2 : content.children.length / 2,
      );
    }
    if (!options) {
      options = elements + 2;
    }
    if (typeof content.children === 'string') {
      super('word-selecting', stringify(content), content, session);
    } else {
      super('selecting', stringify(content), content, session);
    }
    this.options = [];
    let length: number;
    if (typeof content.children === 'string') {
      length = content.words;
      this.text = content.children.split(' ');
      this.answer = content.children;
    } else {
      length = content.children.length;
      this.text = [...content.children.map(stringify)];
      this.answer = this.text.join('\n');
    }
    const numbers = generateUniqueRandomNumbers(
      length > elements ? elements : length, length,
    );
    for (const num of numbers) {
      this.options.push(String(this.text[num]));
      this.text[num] = undefined;
    }
    if (options > elements && content.parent && typeof content.parent.children !== 'string') {
      const optionCandidates = flatten(content.parent.children);
      const optionNumbers = generateRandomNumbers(options - elements, optionCandidates.length);
      for (const option of optionNumbers) {
        if (typeof optionCandidates[option] === 'string') {
          this.options.push(optionCandidates[option]);
        } else {
          this.options.push(optionCandidates[option].children);
        }
      }
      shuffle(this.options);
    }
  }
}
