/* eslint-disable no-param-reassign */
import { Texture, StandardMaterial } from '@babylonjs/core';

type LoadableTextures = 'ao' | 'diff' | 'nor' | 'spec';

/** Texture loading data. */
interface TextureLoadingData {

  /** Textures that will not be applied to the mesh. */
  readonly disabledTextures?: readonly LoadableTextures[];
}

const IMAGE_EXT = 'jpg';

/**
 * Creates the path to the file with the texture.
 * @param name Texture name.
 * @param type Texture type.
 */
function createPathToTexture(name: string, type: LoadableTextures): string {
  return `/textures/${name}/${name}_${type}.${IMAGE_EXT}`;
}

/**
 * Loads textures into the material.
 * @param material Material.
 * @param name Texture name.
 * @param loadingData Texture loading data.
 */
export function loadTexture(
  material: StandardMaterial,
  name: string,
  loadingData?: TextureLoadingData,
): readonly Texture[] {
  const disabled = loadingData?.disabledTextures ?? [];

  const diffuseTexture = new Texture(createPathToTexture(name, 'diff'));
  const bumpTexture = new Texture(createPathToTexture(name, 'nor'));
  const ambientTexture = new Texture(createPathToTexture(name, 'ao'));
  const specularTexture = new Texture(createPathToTexture(name, 'spec'));

  material.diffuseTexture = disabled.includes('diff') ? null : diffuseTexture;
  material.bumpTexture = disabled.includes('nor') ? null : bumpTexture;
  material.ambientTexture = disabled.includes('ao') ? null : ambientTexture;
  material.specularTexture = disabled.includes('spec') ? null : specularTexture;

  return [diffuseTexture, bumpTexture, ambientTexture, specularTexture];
}
