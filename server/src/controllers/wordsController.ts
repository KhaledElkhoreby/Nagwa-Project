import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';

export const getWords = catchAsync(
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: 'success',
      message: 'Hello form words',
    });
  }
);
