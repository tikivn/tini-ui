declare namespace DEFAULT_INTERFACE {
  export type IProps<EState> =
    | Record<
        string,
        (this: ComponentOptions & ComponentOperation<EState>, ...p: unknown[]) => unknown
      >
    | Record<string, unknown>;
  export interface IState extends Object {}
  export type IComponentMethods<EState, EProps> = Record<
    string,
    (this: ComponentOptions & ComponentOperation<EState, EProps>, ...p: unknown[]) => unknown
  >;
}

/**
 * App Entity
 */

interface AppOptions extends Record<string, unknown> {}
interface App {
  (appOptions: AppOptions): void;
}

declare const App: App;

/**
 * Page Entity
 */

interface PageOperation<EState = DEFAULT_INTERFACE.IState> {
  setData(data: EState): Promise<void>;
}

interface PageLifecycles<PData> {
  onLoad?: (this: PageOptions & PageOperation<PData>, query: {}) => unknown;
  onReady?: (this: PageOptions & PageOperation<PData>, ...p: unknown[]) => unknown;
  onShow?: (this: PageOptions & PageOperation<PData>, ...p: unknown[]) => unknown;
  onHide?: (this: PageOptions & PageOperation<PData>, ...p: unknown[]) => unknown;
  onUnload?: (this: PageOptions & PageOperation<PData>, ...p: unknown[]) => unknown;
}
interface PageOptions extends Record<string, unknown> {}
interface PageOptions<EState = DEFAULT_INTERFACE.IState> extends PageLifecycles<EState> {
  data?: EState;
}
interface Page {
  (pageOptions: PageOptions): void;
}

declare const Page: Page;

/**
 * Component Entity
 */

interface ComponentOperation<
  EState = DEFAULT_INTERFACE.IState,
  CProps = DEFAULT_INTERFACE.IProps<EState>
> {
  setData(data: EState): Promise<void>;
  props: CProps;
}
interface ComponentOptions<
  EState = DEFAULT_INTERFACE.IState,
  EProps = DEFAULT_INTERFACE.IProps<EState>,
  EMethods = DEFAULT_INTERFACE.IComponentMethods<EState, EProps>
> extends ComponentLifecycles<EState, EProps> {
  data?: EState;
  methods?: EMethods;
}

interface ComponentLifecycles<CData, CProps> extends Object {
  didMount?: (
    this: ComponentOptions & ComponentOperation<CData, CProps>,
    ...p: unknown[]
  ) => unknown;
  didUpdate?: (
    this: ComponentOptions & ComponentOperation<CData, CProps>,
    ...p: unknown[]
  ) => unknown;
  shouldUpdate?: (
    this: ComponentOptions & ComponentOperation<CData, CProps>,
    ...p: unknown[]
  ) => unknown;
}

type ComponentData<
  CData = DEFAULT_INTERFACE.IState,
  CProps = DEFAULT_INTERFACE.IProps<CData>,
  CMethods = DEFAULT_INTERFACE.IComponentMethods<CData, CProps>
> = ComponentOptions<CData, CProps, CMethods> & ComponentLifecycles<CData, CProps>;

interface Component<T = ComponentData> {
  (componentOptions: T): void;
}

declare const Component: Component;
