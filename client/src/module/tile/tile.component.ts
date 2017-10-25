export class Tile {
  public object;

  constructor(prototype, config) {
    this.object = prototype.clone();
    this.object.position.x = config.position.x;
    this.object.position.z = config.position.z;
  }
}
