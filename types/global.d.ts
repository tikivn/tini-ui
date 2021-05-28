declare function App<G>(options: tiniapp.AppOptions<G>): void;

declare function getApp(): tiniapp.IGetAppResult;

declare function Page<D>(options: tiniapp.PageOptions<D>): void;

declare function Component<P, D, M extends tiniapp.IComponentMethods>(
  options: tiniapp.ComponentOptions<P, D, M>,
): void;
