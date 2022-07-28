enum PoS {
  'adverb',
  'verb',
  'noun',
  'adjective',
}

export type PartOfSpeech = keyof typeof PoS;

export interface IWordList {
  id: number;
  word: string;
  pos: PartOfSpeech;
}
export type IScoresList = number[];

export interface ITestData {
  wordList: IWordList[];
  scoresList: IScoresList;
}
