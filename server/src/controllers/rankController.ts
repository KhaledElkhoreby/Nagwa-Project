import { NextFunction, Request, Response } from 'express';
import { join } from 'path';
import { ITestData } from '../interfaces/ITestData';
import catchAsync from '../utils/catchAsync';
import jsonFileReader from '../utils/readJsonFile';

export const getRank = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { scoresList } = await jsonFileReader<ITestData>(
      join(`${__dirname}../../../data/TestData.json`)
    );

    res.status(200).json({
      status: 'success',
      scoresList,
    });
  }
);
