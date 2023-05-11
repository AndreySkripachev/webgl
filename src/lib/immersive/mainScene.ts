import {
  CubeTexture,
  Engine,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
  AbstractMesh,
  PhysicsImpostor,
  SceneLoader,
  CannonJSPlugin,
} from '@babylonjs/core';

import '@babylonjs/loaders/glTF';
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
          height: GROUND_SIZE,
        }
      ),
    }

    this.createGround();
    this.createEnv();
    this.initDeletionTrigger();
    this.initCar();
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
      PhysicsImpostor.PlaneImpostor,
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

    groundFront.position.y -= 5;
  }

  private initDeletionTrigger(): void {
    const { deletionTrigger } = this.objects;
    deletionTrigger.visibility = 0;
  }

  private async initCar(): Promise<void> {
    const { meshes: [car] } = await SceneLoader.ImportMeshAsync('car', '/models/car/', 'car.glb', this.scene);
    const { meshes: [wheel] } = await SceneLoader.ImportMeshAsync('wheel', '/models/wheel/', 'wheel.glb');

    const CAR_SIZE: Readonly<Record<'x' | 'z', number>> = {
      x: 2.5,
      z: 1.5,
    };

    const WHEEL_SIZE: Readonly<Record<'x' | 'z', number>> = {
      x: 1,
      z: 0.5,
    };

    const WHEEL_POSITION_Z = CAR_SIZE.z + WHEEL_SIZE.z;
    const WHEEL_POSITION_X = CAR_SIZE.x * 0.6;
    const CAR_MASS = 500;
    const WHEEL_MASS = 50;

    const wheelFL = wheel.clone('wheelFL', null) as AbstractMesh;
    const wheelFR = wheel.clone('wheelFR', null) as AbstractMesh;
    const wheelBL = wheel.clone('wheelBL', null) as AbstractMesh;
    const wheelBR = wheel.clone('wheelBR', null) as AbstractMesh;

    wheelFL.position.z = WHEEL_POSITION_Z;
    wheelFL.position.x = WHEEL_POSITION_X;

    wheelFR.position.z = -WHEEL_POSITION_Z;
    wheelFR.position.x = WHEEL_POSITION_X;
    wheelFR.rotate(new Vector3(0, 1, 0), Math.PI);

    wheelBL.position.z = WHEEL_POSITION_Z;
    wheelBL.position.x = -WHEEL_POSITION_X;

    wheelBR.position.z = -WHEEL_POSITION_Z;
    wheelBR.position.x = -WHEEL_POSITION_X;
    wheelBR.rotate(new Vector3(0, 1, 0), Math.PI);

    this.scene.removeMesh(wheel, true);

    const createWheelPhysicsImpostor = (mesh: AbstractMesh) =>
      new PhysicsImpostor(
        mesh,
        PhysicsImpostor.CylinderImpostor,
        { mass: WHEEL_MASS },
      );


    car.physicsImpostor = new PhysicsImpostor(
      car,
      PhysicsImpostor.BoxImpostor,
      { mass: CAR_MASS },
    );

    wheelBL.physicsImpostor = createWheelPhysicsImpostor(wheelBL);
    wheelBR.physicsImpostor = createWheelPhysicsImpostor(wheelBR);
    wheelFL.physicsImpostor = createWheelPhysicsImpostor(wheelFL);
    wheelFR.physicsImpostor = createWheelPhysicsImpostor(wheelFR);
  }
}
