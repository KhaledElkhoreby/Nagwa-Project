import { Router } from 'express';
import { getRank } from '../controllers/rankController';

const rankRouter = Router();

rankRouter.get('/', getRank);

export default rankRouter;
