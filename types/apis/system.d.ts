declare namespace my {
  interface IGetSystemInfoSuccessResult {
    readonly fontSizeSetting: number;
    readonly system: string;
    readonly version: string;
    readonly brand: string;
    readonly currentBattery: string;
    readonly windowHeight: number;
    readonly pixelRatio: number;
    readonly platform: 'android' | 'ios' | 'iphone';
    readonly screenHeight: number;
    readonly statusBarHeight: number;
    readonly language: string;
    readonly storage: string;
    readonly app: string;
    readonly titleBarHeight: number;
    readonly model: string;
    readonly screenWidth: number;
    readonly windowWidth: number;
  }

  interface IGetSystemInfoOptions {
    success?(res?: IGetSystemInfoSuccessResult): void;
    fail?(): void;
    complete?(): void;
  }

  function getSystemInfo(options: IGetSystemInfoOptions): void;

  function getSystemInfoSync(): IGetSystemInfoSuccessResult;
}
