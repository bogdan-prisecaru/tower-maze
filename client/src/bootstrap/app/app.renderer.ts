import { WebGLRenderer } from 'three';

export class AppRenderer extends WebGLRenderer {
  private setClearColor;
  private setSize;
  private domElement;

  constructor() {
    super({
      antialias: true,
      canvas: document.querySelector('#app')
    });
    this.setClearColor(0xCCCCCC);
    this.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', () => {
      this.setSize(window.innerWidth, window.innerHeight);
    }, false);
  }
}
