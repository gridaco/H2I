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
   * @param {fileId} String File to export JSON from
   * @see https://www.figma.com/developers/api#get-files-endpoint
   */
  readonly fromFile: (fileId: string, params?: {}) => AxiosPromise<{}>;
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

    fromFile: (fileId, params = {}) =>
      client.get(`files/${fileId}`, {
        params: {
          ...params,
        },
      }),
  };
};
