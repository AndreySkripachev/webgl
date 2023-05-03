import {
  Color3,
  CubeTexture,
  Engine,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
  AbstractMesh,
  PhysicsImpostor,
} from '@babylonjs/core';
import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins/cannonJSPlugin';
import * as CANNON from 'cannon-es';

import { loadTexture } from 'src/core/utils/loadTexture';

import { MainCamera } from './mainCamera';
import { MainLight } from './mainLight';

window.CANNON = CANNON;
const GROUND_SIZE = 200;

interface ISceneObjects {

  /** Ground. */
  readonly ground: AbstractMesh;

  /** Trigger to remove geomeric figures on contact. */
  readonly deletionTrigger: AbstractMesh;
}

/** Main scene of the app. */
export class MainScene {

  private readonly engine: Engine;

  private readonly scene: Scene;

  private readonly objects: ISceneObjects;

  public constructor(
    canvas: HTMLCanvasElement,
  ) {
    this.engine = new Engine(canvas);
    this.scene = new Scene(this.engine);

    this.engine.runRenderLoop(() => this.scene.render());
    this.scene.enablePhysics(new Vector3(0, -9.81, 0), new CannonJSPlugin(true));

    MainCamera.create(this.scene);
    MainLight.create(this.scene);

    this.objects = {
      deletionTrigger: MeshBuilder.CreateBox(
        'deletionTrigger',
        {
          size: 250,
        },
      ),
      ground: MeshBuilder.CreateGround(
        'ground',
        {
          width: GROUND_SIZE,
          height: GROUND_SIZE
        }
      ),
    }

    this.createGround();
    this.createEnv();
    this.initDeletionTrigger();
  }

  private createEnv(): void {
    const envTexture = CubeTexture.CreateFromPrefilteredData('/environment/environment.env', this.scene);
    this.scene.environmentTexture = envTexture;
    this.scene.createDefaultSkybox(envTexture, true);
  }

  /** Erase 3D related resources. */
  public erase(): void {
    this.scene.dispose();
    this.engine.dispose();
  }

  private createGround(): void {
    const uvScale = 2;

    const groundFront = this.objects.ground;
    const materialFront = new StandardMaterial('groundMaterialFront', this.scene);
    const textArrayFront = loadTexture(materialFront, 'ground');
    groundFront.material = materialFront;

    groundFront.physicsImpostor = new PhysicsImpostor(
      groundFront,
      PhysicsImpostor.BoxImpostor,
      {
        mass: 0,
      },
    );

    const groundBack = MeshBuilder.CreateGround('groundBack', { width: GROUND_SIZE, height: GROUND_SIZE });
    const materialBack = new StandardMaterial('groundMaterialBack', this.scene);
    const textArrayBack = loadTexture(materialBack, 'ground_back');
    groundBack.material = materialBack;
    materialBack.cullBackFaces = false;

    for (const texture of [...textArrayFront, ...textArrayBack]) {
      texture.uScale = uvScale;
      texture.vScale = uvScale;
    }

    groundFront.addChild(groundBack);
  }

  private initDeletionTrigger(): void {
    const { deletionTrigger } = this.objects;
    deletionTrigger.visibility = 0;
  }
}
