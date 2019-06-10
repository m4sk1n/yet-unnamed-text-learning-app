import OrderingExercise from '../Exercises/Ordering';
import SelectingExercise from '../Exercises/Selecting';
import WritingExercise from '../Exercises/Writing';
import { IContent, IExercise, ISession } from '../Interfaces/index';
import { shuffle } from '../Utils/Array';

export default class Session implements ISession {
  public exercise: IExercise;
  public finished: boolean;
  public progress: number;
  public exercises: number;
  public checkFunction: (answer: string) => string;
  private content: IContent;

  constructor({ exercises, content }) {
    this.exercises = exercises;
    this.progress = 0;
    this.content = content;
    if (typeof content.children === 'object' &&
        typeof content.children[0].children === 'object' &&
        typeof content.children[0].children[0].children === 'object') {
          throw Error('This level of indentation is not supported yet.');
    }
    this.next();
  }

  public check(answer: string): {} {
    const result = this.checkFunction(answer);
    if (!result) {
      this.progress++;
      if (this.exercises === this.progress) {
        this.finished = true;
        this.exercise = undefined;
      } else {
        this.next();
      }
      return;
    } else {
      return {
        next: this.next.bind(this),
        result,
      };
    }
  }

  public setCheckFn(checkFn: (answer: string) => string) {
    this.checkFunction = checkFn;
  }

  private next() {
    this.exercise = this.selectExercise(this.content);
  }

  private selectExercise(content: IContent) {
    const seed = Math.random();
    if (content.progress.ordering === 0) {
      return new OrderingExercise(content, this);
    }
    if (typeof content.children === 'object') {
      for (const child of content.children) {
        if (child.progress.ordering === 0) {
          return new OrderingExercise(child, this);
        }
        if (typeof child.children === 'object') {
          for (const subchild of child.children) {
            if (subchild.progress.ordering === 0) {
              return new OrderingExercise(subchild, this);
            }
          }
          for (const subchild of shuffle(child.children)) {
            if (Math.pow(0.33, subchild.progress.selecting) >= seed) {
              return new SelectingExercise(subchild, this);
            }
            if (Math.pow(0.25, subchild.progress.writing) >= seed) {
              return new WritingExercise(subchild, this);
            }
          }
        }
      }
      for (const child of content.children) {
        if (Math.pow(0.4, child.progress.selecting) >= seed) {
          return new SelectingExercise(child, this);
        }
        if (Math.pow(0.33, child.progress.writing) >= seed) {
          return new WritingExercise(child, this);
        }
      }
    }
    if (Math.pow(0.4, content.progress.selecting) >= seed) {
      return new SelectingExercise(content, this);
    }
    if (Math.pow(0.33, content.progress.writing) >= seed) {
      return new WritingExercise(content, this);
    }
    this.finished = true;
  }
}
