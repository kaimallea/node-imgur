import { server } from './server';
import mockfs from 'mock-fs';

// Establish API mocking before all tests.
beforeAll(() => server.listen());

beforeEach(() => {
  mockfs({
    '/home/user/meme.jpg': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
    '/home/user/lol.jpg': Buffer.from([9, 0, 3, 5, 7, 6, 8]),
    '/home/user/trailer.mp4': Buffer.from([9, 0, 3, 5, 7, 6, 8, 1, 2, 3, 4, 5]),
  });
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  mockfs.restore();
  server.resetHandlers();
});

// Clean up after the tests are finished.
afterAll(() => server.close());
