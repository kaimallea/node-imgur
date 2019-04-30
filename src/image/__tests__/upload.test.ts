import { upload } from '../upload';
import { UPLOAD_URI } from '../../endpoints';

import FormData from 'form-data';
import createForm from '../../helpers/createForm';

const mockPost = jest.fn();
const mockClient = jest.fn().mockImplementation(() => {
  return {
    post: mockPost,
  };
});

beforeEach(() => {
  mockClient.mockClear();
  mockPost.mockClear();
});

test('upload calls post() with the correct params and passes reference to provided form', () => {
  const params = {
    image: 'ABC/123/XYZ',
    type: 'base64',
  };

  const form = createForm(params);

  const mockResponse = '{"success": true}';
  mockPost.mockReturnValueOnce(Promise.resolve(mockResponse));

  const promiseResponse = upload(new mockClient(), form);

  expect(promiseResponse).resolves.toBe(mockResponse);
  expect(mockPost).toHaveBeenCalledTimes(1);
  expect(mockPost).toHaveBeenCalledWith(UPLOAD_URI, form);
});

test('upload calls post() with the correct URI and generated form', () => {
  const params = {
    image: 'https://www.cdn.com/image.jpg',
  };

  const mockResponse = '{"success": true}';
  mockPost.mockReturnValueOnce(Promise.resolve(mockResponse));

  const promiseResponse = upload(new mockClient(), params);

  expect(promiseResponse).resolves.toBe(mockResponse);
  expect(mockPost).toHaveBeenCalledTimes(1);
  expect(mockPost.mock.calls[0][0]).toBe(UPLOAD_URI);
  expect(mockPost.mock.calls[0][1]).toBeInstanceOf(FormData);
});
