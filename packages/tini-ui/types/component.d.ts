declare namespace tiniapp {
  interface IComponentLifeCycleMethods<D, P> {
    onInit?(): void;

    /**
     * @param nextProps
     */
    deriveDataFromProps?(nextProps: Partial<P>): void;

    didMount?(): void;

    didUpdate?(prevProps: Partial<P>, prevData: Partial<D>): void;

    didUnmount?(): void;
  }

  interface IComponentMethods {
    [name: string]: (...args: any[]) => void;
  }

  interface IComponentInstance<P, D> extends Record<string, any> {
    readonly data: D;

    readonly props: P;

    setData: SetDataMethod<D>;
  }

  type ComponentOptions<
    P extends Record<string, any> = Record<string, any>,
    D = any,
    M extends IComponentMethods = IComponentMethods,
  > = IComponentLifeCycleMethods<D, P> & {
    data?: D;
    props?: P;
    [key: string]: any;

    methods?: M & ThisType<IComponentInstance<P, D> & M>;
  } & ThisType<IComponentInstance<P, D> & M>;
}
