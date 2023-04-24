import axios, { AxiosInstance, AxiosPromise } from "axios";

import * as k from "./k";

export { k };

export interface ClientOptions {
  /** API Key */
  readonly apiKey?: string;
  /** custom API root */
  readonly apiRoot?: string;
}

export interface ClientInterface {
  readonly client: AxiosInstance;
  /**
   * @param {html} String html as string
   * @see https://html2.io/docs
   */
  readonly fromHtml: (
    html: string,
    params?: {},
  ) => AxiosPromise<{ url: string }>;
}

export const Client = (opts: ClientOptions): ClientInterface => {
  const headers = {
    Authorization: `Bearer ${opts.apiKey}`,
  };

  const client = axios.create({
    baseURL: `${opts.apiRoot || k.API_ROOT}/`,
    headers,
  });

  return {
    client,

    fromHtml: (html, params = {}) =>
      client.post(
        `/image`,
        {
          html,
        },
        {
          params: {
            ...params,
          },
        },
      ),
  };
};
