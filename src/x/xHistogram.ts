import { DoubleArray, DataXY } from 'cheminfo-types';

import { createXArray } from '../utils/createXArray';

import { xAbsolute } from './xAbsolute';
import { xCheck } from './xCheck';
import { xMaxValue } from './xMaxValue';
import { xMinValue } from './xMinValue';

/**
 * Calculates an histogram of defined number of slots
 *
 * @param array - Array containing values
 * @param options - options
 * @returns - result of the histogram
 */
export function xHistogram(
  array: DoubleArray,
  options: {
    /**
     * Center the X value. We will enlarge the first and
     * @default true
     * */
    centerX?: boolean;
    /**
     * Previously existing histogram to continue to fill
     * @default {x:[],y:[]}
     * */
    histogram?: DataXY;
    /**
     * Number of slots
     * @default 256
     * */
    nbSlots?: number;
    /**
     * We can first apply a log on x axis
     * */
    logBaseX?: number;
    /**
     * We can apply a log on the resulting histogram
     */
    logBaseY?: number;
    /**
     * Take the absolute value
     */
    absolute?: boolean;
    /**
     * Maximal value to calculate used to calculate slot size
     * @default maxValue
     * */
    max?: number;
    /**
     * Minimum value to calculate used to calculate slot size
     * @default minValue
     * */
    min?: number;
  } = {},
) {
  xCheck(array);
  let histogram = options.histogram;
  const {
    centerX = true,
    nbSlots = histogram === undefined ? 256 : histogram.x.length,
    logBaseX,
    logBaseY,
    absolute = false,
  } = options;

  if (absolute) {
    array = xAbsolute(array);
  }
  if (logBaseX) {
    array = array.slice();
    const logOfBase = Math.log10(logBaseX);
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.log10(array[i]) / logOfBase;
    }
  }

  const { min = xMinValue(array), max = xMaxValue(array) } = options;
  const slotSize = (max - min) / (nbSlots + Number.EPSILON);
  const y = histogram === undefined ? new Float64Array(nbSlots) : histogram.y;
  const x =
    histogram === undefined
      ? createXArray({
          from: min + (centerX ? slotSize / 2 : 0),
          to: max - (centerX ? slotSize / 2 : 0),
          length: nbSlots,
        })
      : histogram.x;

  array.forEach((element) => {
    const index = Math.max(
      Math.min(((element - min - Number.EPSILON) / slotSize) >> 0, nbSlots - 1),
      0,
    );
    y[index]++;
  });

  if (logBaseY) {
    const logOfBase = Math.log10(logBaseY);
    for (let i = 0; i < y.length; i++) {
      y[i] = Math.log10(y[i] + 1) / logOfBase;
    }
  }

  return { x, y };
}
