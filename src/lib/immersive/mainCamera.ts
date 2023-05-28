import { Scene, Vector3, ArcRotateCamera } from '@babylonjs/core';

/** Main camera of the scene. */
export class MainCamera {

  /**
   * Creates main camera for scene.
   * @param scene Main scene.
   */
  public static create(scene: Scene): void {
    const camera = new ArcRotateCamera('mainCamera', 1, 1, 250, new Vector3(0, 1, 0), scene);
    camera.attachControl();
  }
}
