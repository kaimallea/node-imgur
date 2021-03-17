import fetch, { RequestInit } from 'node-fetch';
import FormData from 'form-data';
import createForm from './helpers/createForm';
import { hashUrl } from './helpers/hashUrl';
import { cacheGet, cacheSet } from './cache';
export interface ClientOptions {
  access_token?: string;
  client_id?: string;
}

export type PostOrPutData =
  | {
      [key: string]: any;
    }
  | FormData;

export type FormDataString = string;

export class Client {
  public readonly access_token: string | undefined;
  public readonly client_id: string | undefined;
  public readonly anonymous: boolean;

  constructor(options: ClientOptions) {
    if (options.access_token) {
      this.access_token = options.access_token;
      this.anonymous = false;
    } else if (options.client_id) {
      this.client_id = options.client_id;
      this.anonymous = true;
    } else {
      throw new Error(
        'Client requires an access token or client ID to make requests against the Imgur API',
      );
    }
  }

  /**
   * Make an HTTP request to the specified Imgur API endpoint with the required
   * Authorization header prefilled an access token or client ID
   *
   * @param endpoint - An Imgur API endpoint
   * @param options - A {@link node-fetch#RequestInit | RequestInit } options object
   * @returns A JSON response object
   */
  async request(endpoint: string, options: RequestInit): Promise<any> {
    // Decorate all requests with the correct authorization header
    const headers = {
      ...options.headers,
      Authorization: this.anonymous
        ? `Client-ID ${this.client_id}`
        : `Bearer ${this.access_token}`,
    };

    try {
      const params = Object.entries(headers)
        .map((key: any, val: any) => {
          return `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
        })
        .join('&');
      const hashKey = hashUrl(`${endpoint}${params}`);
      const cacheData = cacheGet(hashKey);

      if (cacheData) {
        return cacheData;
      }

      const response = await fetch(endpoint, { ...options, headers });
      const json = await response.json();

      cacheSet(hashKey, json);

      return json;
    } catch (err) {
      return Promise.reject(new Error(err.message));
    }
  }

  /**
   * Make a request to the specified Imgur API endpoint with params or FormData
   *
   * @param endpoint An Imgur API endpoint
   * @param params Form parameters
   * @returns A JSON response object
   */
  requestWithParams(endpoint: string, params: PostOrPutData): Promise<any> {
    let form;
    if (params instanceof FormData) {
      form = params;
    } else {
      form = createForm(params);
    }

    return this.request(endpoint, {
      method: 'POST',
      headers: form.getHeaders(),
      body: form,
    });
  }

  /**
   * Make a POST request to the specified Imgur API endpoint with form data
   *
   * @param endpoint An Imgur API endpoint
   * @param params Form parameters
   * @returns A JSON response object
   */
  post(endpoint: string, params: PostOrPutData): Promise<any> {
    let form;
    if (params instanceof FormData) {
      form = params;
    } else {
      form = createForm(params);
    }
    return this.request(endpoint, {
      method: 'POST',
      headers: form.getHeaders(),
      body: form,
    });
  }

  /**
   * Make a GET request to the specified Imgur API endpoint
   *
   * @param endpoint An Imgur API endpoint
   * @returns A JSON response object
   */
  get(endpoint: string): Promise<any> {
    const res = this.request(endpoint, {
      method: 'GET',
    });
    return res;
  }

  /**
   * Make a PUT request to the specified Imgur API endpoint with form data
   *
   * @param endpoint An Imgur API endpoint
   * @param params Form parameters
   * @returns A JSON response object
   */
  put(endpoint: string, params: PostOrPutData): Promise<any> {
    let form;
    if (params instanceof FormData) {
      form = params;
    } else {
      form = createForm(params);
    }

    return this.request(endpoint, {
      method: 'PUT',
      headers: form.getHeaders(),
      body: form,
    });
  }

  /**
   * Make a DELETE request to the specified Imgur API endpoint with form data
   *
   * @param endpoint An Imgur API endpoint
   * @returns A JSON response object
   */

  delete(endpoint: string): Promise<any> {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}
