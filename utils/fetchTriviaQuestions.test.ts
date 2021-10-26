import { fetchTriviaQuestions } from './fetchTriviaQuestions';

describe('FetchTriviaQuestions()', () => {
    it('returns correct data', async () => {
        //arrange
        const response = await fetchTriviaQuestions(`https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean`);

        //assert
        expect(response?.props?.data?.response_code).toEqual(0);
        expect(response?.props?.data?.results.length).toEqual(10);
    });

    it('returns empty data if request has been rejected or failed', async () => {
        //arrange
        const response = await fetchTriviaQuestions(`broken url link`);

        //assert
        expect(response?.props?.data).toBeNull();
    });
});
