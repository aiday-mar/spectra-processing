import { DataXY } from 'cheminfo-types';

import { Zone } from '..';
import { normalize } from '../zones/normalize';

import { xyCheck } from './xyCheck';

/**
 * XyExtract zones from a XY data
 *
 * @param data - Object that contains property x (an ordered increasing array) and y (an array)
 * @param options - options
 * @returns - Array of points
 */
export function xyExtract(
  data: DataXY,
  options: { zones?: Zone[] } = {},
): DataXY {
  xyCheck(data);
  const { x, y } = data;
  let { zones } = options;

  zones = normalize(zones);

  if (
    x === undefined ||
    y === undefined ||
    !Array.isArray(zones) ||
    zones.length === 0
  ) {
    return data;
  }

  let newX = [];
  let newY = [];

  let currentZone = zones[0];
  let position = 0;
  loop: for (let i = 0; i < x.length; i++) {
    while (currentZone.to < x[i]) {
      position++;
      currentZone = zones[position];
      if (!currentZone) {
        i = x.length;
        break loop;
      }
    }
    if (x[i] >= currentZone.from) {
      newX.push(x[i]);
      newY.push(y[i]);
    }
  }
  return { x: newX, y: newY };
}
