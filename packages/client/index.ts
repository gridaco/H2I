import axios, { AxiosInstance, AxiosPromise } from "axios";

import * as k from "./k";

export { k };

interface ImageResponse {
  id: string;
  title: string;
  userAgent: string;
  url: string;
  chrome: {
    version: string;
  };
}

interface ImageRequestBase {
  width?: number;
  height?: number;
}

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
    params?: ImageRequestBase,
  ) => AxiosPromise<ImageResponse>;

  readonly fromUrl: (
    html: string,
    params?: ImageRequestBase,
  ) => AxiosPromise<ImageResponse>;
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

    fromHtml: (html, options = {}) =>
      client.post(`/image`, {
        html,
        ...options,
      }),

    fromUrl: (url, options = {}) =>
      client.post(`/image`, {
        url,
        ...options,
      }),
  };
};
