import { IContent, IExercise, ISession } from '../Interfaces/index';
import { getPrecedingSibling, getSubsequentSibling } from '../Utils/Content';
import generateUUID from '../Utils/generateUUID';
import { simplify } from '../Utils/String';

export default abstract class Exercise implements IExercise {
  public type: string;
  public uuid: string;
  public precedingSibling?: string;
  public subsequentSibling?: string;
  protected answered?: boolean;
  protected answer: string;

  constructor(type: string, answer: string, content: IContent, session: ISession) {
    this.type = type;
    this.answer = answer;
    this.precedingSibling = getPrecedingSibling(content);
    this.subsequentSibling = getSubsequentSibling(content);
    this.uuid = generateUUID();
    session.setCheckFn((ans: string): string => {
      if (this.answered === undefined) {
        if (this.type === 'word-writing' || this.type === 'writing') {
          this.answered = this.answer.split(' ').map(simplify).join(' ') === ans.split(' ').map(simplify).join(' ');
        } else {
          this.answered = this.answer === ans;
        }
        if (this.answered) {
          switch (this.type) {
            case 'word-ordering':
              content.progress.ordering += 1;
              break;
            case 'ordering':
              content.progress.ordering += 1;
              break;
            case 'word-selecting':
              content.progress.selecting += 1;
              break;
            case 'selecting':
              content.progress.selecting += 1;
              break;
            case 'word-writing':
              content.progress.writing += 1;
              break;
            case 'writing':
              content.progress.writing += 1;
              break;
            default:
              break;
          }
        }
      }
      if (this.answered === false) {
        return this.answer;
      } else {
        return;
      }
    });
  }
}
