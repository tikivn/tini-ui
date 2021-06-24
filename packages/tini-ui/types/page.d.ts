declare namespace tiniapp {
  interface IPageOptionsMethods {
    onLoad?(query: any): void;

    onReady?(): void;

    onShow?(): void;

    onHide?(): void;

    onUnload?(): void;

    onReachBottom?(): void;

    onPageScroll?(event: any): void;
  }

  type SetDataMethod<D> = (data: Partial<D>, callback?: () => void) => void;

  interface ISpliceDataOperations {
    [k: string]: [number, number, ...any[]];
  }

  type SpliceDataMethod = (operations: ISpliceDataOperations, callback?: () => void) => void;

  interface IPageInstance<D> extends Record<string, any> {
    readonly data: D;

    setData: SetDataMethod<D>;
  }

  type PageOptions<D = Record<string, any>> = IPageOptionsMethods & {
    data?: D;

    [name: string]: any;
  } & ThisType<IPageInstance<D>>;
}
