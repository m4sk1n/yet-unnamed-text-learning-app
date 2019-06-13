interface ICourse {
  content: IContent;
}

interface IContent {
  children: IContent[] | string;
  lines: number;
  words: number;
  level: number;
  index: number;
  progress: IProgress;
  parent: IContent;
}

interface IProgress {
  ordering: number;
  selecting: number;
  writing: number;
}

interface ISession {
  exercise: IExercise;
  progress: number;
  finished: boolean;
  setCheckFn: (check: (answer: string) => string) => void;
}

interface IExercise {
  type: string;
  uuid: string;
}

interface IWritingExercise extends IExercise {
  text: string[][];
  options: string[];
}

interface IWordWritingExercise extends IExercise {
  text: string[];
  options: string[];
}

interface IOrderingExercise extends IExercise {
  shuffled: string[];
}

interface ISelectingExercise extends IExercise {
  text: string[];
  options: string[];
}

export { ICourse, IContent, IProgress, ISession, IExercise };
