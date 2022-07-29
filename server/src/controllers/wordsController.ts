import { NextFunction, Request, Response } from 'express';
import { join } from 'path';
import { ITestData, IWordList, PartOfSpeech } from '../interfaces/ITestData';
import catchAsync from '../utils/catchAsync';
import jsonFileReader from '../utils/readJsonFile';

// This function group words by their Part of Speech and return Map of key: ParOfSpeech => value: WordList
const groupWordsArray = (wordList: IWordList[]) => {
  const posArray = ['adverb', 'verb', 'noun', 'adjective'];
  const groupsMap = new Map<PartOfSpeech, IWordList[]>();
  posArray.forEach((pos) => {
    groupsMap.set(
      pos as PartOfSpeech,
      wordList.filter((el) => el.pos === pos)
    );
  });
  return groupsMap;
};

// This function return random element form an array
const getRandomElementFromArray = <T>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

// Shuffle array elements in-place
const shuffleArray = <T>(arr: Array<T>) => {
  for (let i = arr.length - 1; i > 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
};

// This function take the groups map and length of the returned array,
// which returns an array of random elements from different groups which element from one group must appear at least one
const randomElementsFromDifferentGroups = (
  groupsMap: Map<PartOfSpeech, IWordList[]>,
  length: number = 1
) => {
  const groupsArray = [...groupsMap];
  let arr: IWordList[] = [];
  for (let i = 0; i < length; i++) {
    // Use (i % 4) to make sure the index not exceed the length of ['adverb', 'verb', 'noun', 'adjective']
    arr.push(getRandomElementFromArray(groupsArray[i % 4][1]));
  }

  // Shuffle the array
  shuffleArray(arr);
  return arr;
};

export const getWords = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { wordList } = await jsonFileReader<ITestData>(
      join(`${__dirname}../../../data/TestData.json`)
    );

    const groups = groupWordsArray(wordList);
    const randomDifferentWords = randomElementsFromDifferentGroups(groups, 10);

    res.status(200).json({
      status: 'success',
      length: randomDifferentWords.length,
      randomDifferentWords,
    });
  }
);
