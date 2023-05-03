import {
  Color3,
  Engine,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins/cannonJSPlugin';
import * as CANNON from 'cannon-es';

import { MainCamera } from './mainCamera';
import { MainLight } from './mainLight';

window.CANNON = CANNON;

/** Main scene of the app. */
export class MainScene {

  private readonly engine: Engine;

  private readonly scene: Scene;

  public constructor(
    canvas: HTMLCanvasElement,
  ) {
    this.engine = new Engine(canvas);
    this.scene = new Scene(this.engine);

    this.engine.runRenderLoop(() => this.scene.render());
    this.scene.enablePhysics(new Vector3(0, -9.81, 0), new CannonJSPlugin(true));

    MainCamera.create(this.scene);
    MainLight.create(this.scene);
    this.createGround();
  }

  /** Erase 3D related resources. */
  public erase(): void {
    this.scene.dispose();
    this.engine.dispose();
  }

  // Dumb ground. Just to show something at scene
  private createGround(): void {
    const ground = MeshBuilder.CreateGround('ground', { width: 5, height: 5 });
    const material = new StandardMaterial('groundMaterial');
    material.diffuseColor = Color3.Random();
    ground.material = material;
  }
}
