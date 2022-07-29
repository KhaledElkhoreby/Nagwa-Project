export interface IRandomDifferentWord {
  id: number;
  word: string;
  pos: string;
}

export interface IWordsResponse {
  status: string;
  length: number;
  randomDifferentWords: IRandomDifferentWord[];
}
