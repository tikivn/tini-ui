export type RequestParams = {
  method: 'GET' | 'POST';
  data?: any;
  headers?: any;
};

export default class API {
  appId = '';
  userAgent = 'TikiNative';
  headers = {};

  constructor({ appId, userAgent }: { appId: string; userAgent?: string }) {
    this.setAppId(appId);
    if (userAgent) {
      this.setUserAgent(userAgent);
    }
  }

  setHeaders(headers: Record<string, string>): void {
    this.headers = headers;
  }

  setAppId(appId: string): void {
    this.appId = appId;
  }

  setUserAgent(userAgent: string): void {
    this.userAgent = userAgent;
  }

  async request(url: string, { method = 'GET', data, headers = {} }: RequestParams): Promise<any> {
    return new Promise((resolve, reject) => {
      my.request({
        url,
        method,
        data,
        headers: {
          'Content-Type': 'application/json',
          'X-App-Identifier': this.appId,
          'User-Agent': this.userAgent,
          ...headers,
        },
        success: (res: any) => {
          resolve(res);
        },
        fail(e: any) {
          reject(e);
        },
      });
    });
  }

  async get(url: string, params?: RequestParams): Promise<any> {
    return this.request(url, { method: 'GET', headers: params?.headers });
  }

  async post(url: string, params?: RequestParams): Promise<any> {
    return this.request(url, { method: 'POST', data: params?.data, headers: params?.headers });
  }
}
