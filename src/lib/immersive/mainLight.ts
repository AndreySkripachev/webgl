import { Color3, HemisphericLight, Scene, Vector3 } from '@babylonjs/core';

/** Main light of the scene. */
export class MainLight {

  /**
   * Creates main source of light for scene.
   * @param scene Main scene.
   */
  public static create(scene: Scene): void {
    const hemiLight = new HemisphericLight('mainLight', new Vector3(0, 2, 0), scene);
    hemiLight.intensity = 0.6;
    hemiLight.specular = Color3.White();
  }
}
