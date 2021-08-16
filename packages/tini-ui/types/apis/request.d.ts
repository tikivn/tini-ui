declare namespace my {
  interface IHttpRequestSuccessResult {
    readonly data?: any;

    readonly status?: number;

    readonly headers?: Readonly<Record<string, string>>;
  }

  interface IHttpRequestOptions {
    url: string;

    headers?: Record<string, string>;

    method?: 'GET' | 'POST';

    data?: Record<string, any>;

    timeout?: number;

    dataType?: 'json' | 'text' | 'base64';

    success?(res: IHttpRequestSuccessResult): void;

    fail?(res: any): void;

    complete?(res: any): void;
  }

  function request(options: IHttpRequestOptions): void;

  interface IUploadFileSuccessResult {
    readonly data: string;

    readonly statusCode: number;

    readonly header: Readonly<Record<string, string>>;
  }

  interface IUploadFileOptions {
    url: string;

    filePath: string;

    fileName: string;

    fileType?: 'image' | 'video' | 'audio';

    header?: Record<string, string>;

    formData?: Record<string, any>;

    success?: (res?: IUploadFileSuccessResult) => void;

    fail?(res: { error: 11 | 12 | 13 }): void;

    complete?(): void;
  }

  function uploadFile(options: IUploadFileOptions): void;

  interface IDownloadFileSuccessResult {
    readonly apFilePath: string;
  }

  interface IDownloadFileFailResult {
    error: number;
  }

  interface IDownloadFileOptions {
    url: string;

    header?: Record<string, string>;

    success?: (res?: IDownloadFileSuccessResult) => void;

    fail?(res: IDownloadFileFailResult): void;

    complete?(res: IDownloadFileFailResult | IDownloadFileSuccessResult): void;
  }

  function downloadFile(options: IDownloadFileOptions): void;

  interface IConnectFailResult {
    readonly error: number;
  }

  interface IConnectSocketOptions {
    url: string;

    data?: string;

    header?: Record<string, string>;

    method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';

    success?(): void;

    fail?(res: IConnectFailResult): void;

    complete?(res?: IConnectFailResult): void;
  }

  function connectSocket(options: IConnectSocketOptions): void;

  function onSocketOpen(callback: (res?: any) => void): void;

  function onSocketError(callback: (res?: any) => void): void;

  interface ISendSocketMessageOptions {
    data: string;

    isBuffer?: boolean;

    success?(): void;

    fail?(): void;

    complete?(): void;
  }

  function sendSocketMessage(options: ISendSocketMessageOptions): void;

  interface ISocketMessageResponse {
    readonly data: string;

    readonly isBuffer: boolean;
  }

  function onSocketMessage(callback: (res?: ISocketMessageResponse) => void): void;

  interface ICloseSocketOptions {
    success?(): void;

    fail?(): void;

    complete?(): void;
  }

  function closeSocket(options: ICloseSocketOptions): void;

  function onSocketClose(callback: (res?: any) => void): void;

  function offSocketClose(): void;
}
