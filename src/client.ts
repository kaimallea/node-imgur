import fetch, { RequestInit } from 'node-fetch';
import FormData from 'form-data';
import createForm from './helpers/createForm';

export interface AccessTokenAuthorization {
  access_token?: string;
}

export interface ClientIdAuthorization {
  client_id?: string;
}

export interface ClientOptions
  extends AccessTokenAuthorization,
    ClientIdAuthorization {}

export interface PostParameters {
  [key: string]: any;
  form?: FormData;
}

export class Client {
  public readonly access_token: string | undefined;
  public readonly client_id: string | undefined;
  public readonly anonymous: boolean;

  constructor(options: ClientOptions) {
    const { access_token, client_id } = options;

    if (access_token) {
      this.access_token = access_token;
      this.anonymous = false;
    } else if (client_id) {
      this.client_id = client_id;
      this.anonymous = true;
    } else {
      throw new Error(
        'Client requires an access token or client ID to make requests against the Imgur API'
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
      const response = await fetch(endpoint, { ...options, headers });
      return response.json();
    } catch (err) {
      return Promise.reject(new Error(err.message));
    }
  }

  /**
   * Make a POST request to the specified Imgur API endpoint with form data
   *
   * @param endpoint An Imgur API endpoint
   * @param params Form parameters
   * @returns A JSON response object
   */
  post(endpoint: string, params: PostParameters | FormData): Promise<any> {
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
    return this.request(endpoint, {
      method: 'GET',
    });
  }
}
