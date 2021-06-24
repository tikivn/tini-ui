declare namespace my {
  interface IBoundingClientRect {
    width: number;
    height: number;
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  }

  type ScrollOffset = Record<'scrollTop' | 'scrollLeft', number>;

  type SelectorResult = ReadonlyArray<
    null | Readonly<IBoundingClientRect> | Readonly<ScrollOffset> | Readonly<IBoundingClientRect[]>
  >;

  type ISelectorExecCallback = (ret: SelectorResult) => void;

  interface ISelectorQuery {
    select(selector: string): ISelectorQuery;
    selectAll(selector: string): ISelectorQuery;
    selectViewport(): ISelectorQuery;
    boundingClientRect(): ISelectorQuery;
    scrollOffset(): ISelectorQuery;
    exec(ret: ISelectorExecCallback): void;
  }

  function createSelectorQuery(params?: Record<string, any>): ISelectorQuery;

  function call(apiName: string, params?: Record<string, any> | ((...args: any[]) => void)): void;
  function call(
    apiName: string,
    params?: Record<string, any>,
    callback?: (...args: any[]) => void,
  ): void;
}
