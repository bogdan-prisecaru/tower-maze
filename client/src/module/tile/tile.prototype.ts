import { IBasePrototype } from '@model/prototype';
import { Mesh, PlaneBufferGeometry, BoxBufferGeometry, MeshBasicMaterial, TextureLoader, DoubleSide } from 'three';

import './resources/texture/ground';

const TILE_TYPE: string = 'tile';

export class TilePrototype implements IBasePrototype {
  public prototypes: any[] = [];
  private map = {
    assets: new Map()
  };

  constructor() {

  }

  /**
   *
   */
  get fetch(): Promise<{}> {
    return new Promise((resolve, reject) => {
      resolve(this.generate());
    });
  }

  /**
   *
   */
  generate(): Promise<{}> {
    return this.load().then((resources) => {
      this.map.assets.forEach((value, key) => {
        let prototype: Mesh = new Mesh(
          value['geometry'],
          value['material']
        );
        prototype.name = key;
        prototype.rotation.x = Math.PI * 0.5;

        this.prototypes.push(prototype);
      });

      return {
        type: TILE_TYPE,
        prototypes: this.prototypes
      };
    });
  }

  /**
   *
   */
  resolveGeometry(type: string, size: number): PlaneBufferGeometry | BoxBufferGeometry {
    switch (type) {
      case 'plane':
        return new PlaneBufferGeometry(size, size, 1, 1);
      case 'box':
        return new BoxBufferGeometry(size, size, size);
    }
  }

  /**
   *
   */
  load(): Promise<{}> {
    let loader: TextureLoader = new TextureLoader();
    let assets = [{
      name: 'ground',
      textureUrl: './resources/ground.png',
      geometry: 'plane'
    }];

    let promises = assets.map((asset) => {
      return new Promise((resolve, reject) => {
        loader.load(asset.textureUrl, (response) => {
          this.map.assets.set(asset.name, {
            geometry: this.resolveGeometry(asset.geometry, 20),
            material: new MeshBasicMaterial({ side: DoubleSide, map: response})
          });

          resolve(response);
        });
      });
    });

    return Promise.all(promises);
  }
}
