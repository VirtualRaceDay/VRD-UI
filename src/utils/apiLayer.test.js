import { getFromApi, postToApi, endpointUri } from './apiLayer';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get(endpointUri('/get-good').href, (req, res, ctx) =>
    res(ctx.json({ good: 'value' }))),
  rest.get(endpointUri('/get-bad').href, (req, res, ctx) =>
    res(ctx.status(404))),
  rest.post(endpointUri('/post-good').href, (req, res, ctx) =>
    res(ctx.status(201), ctx.json([{ good: 'value' }]))),
  rest.post(endpointUri('/post-bad').href, (req, res, ctx) =>
    res(ctx.status(404)))
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('getFromApi', () => {
  afterEach(() => server.resetHandlers());

  it('returns deserialised json from good endpoint', async () => {
    const result = await getFromApi('/get-good');

    expect(result).toStrictEqual({ good: 'value' });
  });

  it('returns an empty object upon error', async () => {
    const result = await getFromApi('/get-bad');
    expect(result).toStrictEqual({});
  });
});

describe('postToApi', () => {
  afterEach(() => server.resetHandlers());

  it('returns deserialised json from good endpoint', async () => {
    const result = await postToApi('/post-good', { some: 'data' });

    expect(result).toStrictEqual({ good: 'value' });
  });

  it('returns an empty object upon error', async () => {
    const result = await postToApi('/post-bad', { some: 'data' });
    expect(result).toStrictEqual({});
  });
})
