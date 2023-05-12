
type GameGeometry = 'sphere' | 'box';

const MIN_GEOMETRIES_COUNT = 0;
const MAX_GEOMETRIES_COUNT = 5;

/**
 * Game config service.
 */
export class GameConfigService {

  /** Geometries count. */
  public readonly geometriesCount: Readonly<Record<GameGeometry, number>> = {
    box: MIN_GEOMETRIES_COUNT,
    sphere: MIN_GEOMETRIES_COUNT,
  }
}
