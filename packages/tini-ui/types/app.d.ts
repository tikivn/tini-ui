declare namespace tiniapp {
  type Query = Record<string, string | number>;

  interface IAppOptionsMethods {
    onLaunch?(options: any): void;

    onShow?(options: any): void;

    onHide?(): void;

    onError?(error: any): void;
    onUnhandledRejection?(options?: any): void;
  }

  interface IAppInstance<G> {
    globalData: G;
  }

  interface IGetAppResult {
    globalData: any;
  }

  type AppOptions<G = any> = IAppOptionsMethods & {
    globalData?: G;
    [name: string]: any;
  } & ThisType<IAppInstance<G>>;
}
