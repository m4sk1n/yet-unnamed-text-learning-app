import { IContent, ISession } from '../Interfaces/index';
import Exercise from './index';
import { stringify } from '../Utils/Content';
import { shuffle } from '../Utils/Array';

export default class OrderingExercise extends Exercise {
  public shuffled: string[];

  constructor(content: IContent, session: ISession) {
    if (typeof content.children === 'string') {
      super('word-ordering', stringify(content), content, session);
      this.shuffled = shuffle(content.children.split(' '));
    } else {
      super('ordering', stringify(content), content, session);
      this.shuffled = shuffle([...content.children.map(stringify)]);
    }
  }
}
