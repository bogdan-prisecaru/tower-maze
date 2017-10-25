export interface IBasePrototype {
  prototypes: any[];
  readonly fetch: Promise<{}>;
  generate(): Promise<{}>;
  load(): Promise<{}>;
}
