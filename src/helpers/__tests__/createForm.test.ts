import createForm from '../createForm';
import FormData from 'form-data';

test('createForm returns FormData object', () => {
  const params = {
    hello: 'world',
    javscript: true,
  };

  const form = createForm(params);
  expect(form).toBeInstanceOf(FormData);
});
