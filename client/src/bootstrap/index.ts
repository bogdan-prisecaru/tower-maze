import { Scene, WebGLRenderer, PerspectiveCamera } from 'three';

import { AppCamera } from '@bootstrap/app/app.camera';
import { AppRenderer } from '@bootstrap/app/app.renderer';

import { TilePrototype } from "@module/tile/tile.prototype";
import { Tile } from "@module/tile/tile.component";

export class App {
  private scene: Scene = new Scene();
  private renderer: WebGLRenderer = new AppRenderer();
  private camera: PerspectiveCamera = new AppCamera();
  private modules = [];

  constructor() {
    console.log(new TilePrototype().fetch);
  }

  /**
   *  @description method that iterates over each scene element
   */
  run(): void {
    this.load().then((modules) => {
      modules.forEach((object) => {
        this.scene.add(object);
      });
      this.loop();
    });
  }

  /**
   *  @description loop method
   */
  loop(): void {
    let renderLoop = () => {
      requestAnimationFrame(renderLoop);
      this.renderer.render(this.scene, this.camera);
      this.update();
    };
    renderLoop();
  }

  /**
   *  @description method that loads all scene elements
   */
  load() {
    let promises = this.modules.map((module) => {
      return module.fetch;
    });
    return Promise.all(promises);
  }

  /**
   *  @description method that updates the scene elements
   */
  update(): void {
    this.modules.forEach((module) => {
      if (module && module.update) {
        module.update();
      }
    });
  }
}
