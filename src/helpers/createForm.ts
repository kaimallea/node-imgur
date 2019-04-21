import FormData from 'form-data';

/**
 * Accepts an object of key/values and then constructs
 * and returns an instance of FormData
 *
 * @param params An object with key/values
 * @param formDataOptions Options that the FormData constructor accepts
 * @returns FormData
 */
function createForm(
  params: { [key: string]: any } = {},
  formDataOptions: { [key: string]: any } = {}
): FormData {
  const form = new FormData(formDataOptions);
  Object.keys(params).forEach(key => {
    form.append(key, params[key]);
  });
  return form;
}

export default createForm;
