import { join } from 'path';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import app from './app';
import { calculateRank } from './controllers/rankController';
import { ITestData, IWordItem } from './interfaces/ITestData';
import jsonFileReader from './utils/readJsonFile';

const requestTest = request(app);

describe('Words Logic', () => {
  describe('GET /words endpoint', () => {
    let testRequest: request.Test;
    let response: request.Response;
    beforeEach(async () => {
      testRequest = requestTest.get('/api/v1/words');
      response = await testRequest.send();
    });

    it('Should response with status code `200`', async () => {
      expect(response.statusCode).toBe(200);
    });

    it('Should response with body contains `randomDifferentWords`', async () => {
      expect(response.body.randomDifferentWords).toBeDefined();
    });

    it('Should response with body contains `randomDifferentWords` which is array word that contain `id` and `word` and `pos`', async () => {
      class WordItem implements IWordItem {
        constructor(
          public id: number,
          public word: string,
          public pos: 'adverb' | 'verb' | 'noun' | 'adjective'
        ) {}
      }

      const responseWordItem = response.body.randomDifferentWords[0];

      expect(responseWordItem).toMatchObject(
        new WordItem(
          responseWordItem.id,
          responseWordItem.word,
          responseWordItem.pos
        )
      );
    });
  });
});

describe('Rank Logic', () => {
  describe('POST /rank endpoint', () => {
    let testRequest: request.Test;
    beforeEach(() => {
      testRequest = requestTest.post('/api/v1/rank');
    });

    it('Should response with status code `200` if the request body contains score', async () => {
      const body = { score: 50 };

      const newResponse = await testRequest.send(body);

      expect(newResponse.statusCode).toBe(200);
    });

    it('Should response with body contains `rank` if the request body contains score', async () => {
      const body = { score: 50 };

      const newResponse = await testRequest.send(body);

      expect(newResponse.body.rank).toBeDefined();
    });

    it('Should response with body contains `rank` equal to `80` if the request body contains score equal `90`', async () => {
      const body = { score: 90 };

      const newResponse = await testRequest.send(body);

      expect(newResponse.body.rank).toBe(80);
    });

    it('Should response with status code `400` if the request body dose not contains score', async () => {
      const body = {};

      const response = await testRequest.send(body);

      expect(response.statusCode).toBe(400);
    });

    it('Should response with body contains message `There is no score given` if the request body does not contain score', async () => {
      const body = {};

      const response = await testRequest.send(body);

      expect(response.body.message).toBe('There is no score given');
    });
  });

  describe('Calculate Rank Function', async () => {
    const { scoresList } = await jsonFileReader<ITestData>(
      join(`${__dirname}../../data/TestData.json`)
    );

    it('Should yield rank `56.67` if the score is `60`', () => {
      const score = 60;

      const rank = calculateRank(scoresList, score);

      expect(rank).toBe(56.67);
    });

    it('Should yield rank `40` if the score is `50`', () => {
      const score = 50;

      const rank = calculateRank(scoresList, score);

      expect(rank).toBe(40);
    });

    it('Should yield rank `26.67` if the score is `30`', () => {
      const score = 30;

      const rank = calculateRank(scoresList, score);

      expect(rank).toBe(26.67);
    });
  });
});
