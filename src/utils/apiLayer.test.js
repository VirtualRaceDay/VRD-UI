import { getFromApi, postToApi, endpointUri } from './apiLayer';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get(endpointUri('/get-good').href, (req, res, ctx) =>
    res(ctx.json({ data: { good: 'value' }}))),
  rest.get(endpointUri('/get-bad').href, (req, res, ctx) =>
    res(ctx.status(404), ctx.json({ code: 404, data: "not found" }))),
  rest.post(endpointUri('/post-good').href, (req, res, ctx) =>
    res(ctx.status(201), ctx.json({ data: { good: 'value' }}))),
  rest.post(endpointUri('/post-bad').href, (req, res, ctx) =>
    res(ctx.status(404), ctx.json({ code: 404, data: "not found" })))
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('getFromApi', () => {
  afterEach(() => server.resetHandlers());

  it('returns deserialised json from good endpoint', async () => {
    const result = await getFromApi('/get-good');

    expect(result).toStrictEqual({ data: { good: 'value' }});
  });

  it('returns an empty object upon error', async () => {
    const result = await getFromApi('/get-bad');
    expect(result).toStrictEqual({ error: "404 Error performing GET on /get-bad: not found" });
  });
});

describe('postToApi', () => {
  afterEach(() => server.resetHandlers());

  it('returns deserialised json from good endpoint', async () => {
    const result = await postToApi('/post-good', { some: 'data' });

    expect(result).toStrictEqual({ data: { good: 'value' }});
  });

  it('returns an empty object upon error', async () => {
    const result = await postToApi('/post-bad', { some: 'data' });
    expect(result).toStrictEqual({ error: "404 Error performing POST on /post-bad: not found" });
  });
})
