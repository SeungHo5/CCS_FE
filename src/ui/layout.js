// @ui/layout.js
import { Dimensions } from 'react-native';

const getAxisSize = (axis) => {
  const { width, height } = Dimensions.get('window');
  return axis === 'height' ? height : width;
};

/**
 * Convert a number or percentage string to device pixels along the chosen axis.
 * Accepts:
 *  - number
 *  - "12" (numeric string)
 *  - "40%" (percentage of screen width/height)
 *  - "12px" (px suffix)
 * Returns 0 for any invalid input. Never returns NaN.
 * @param {number|string} value
 * @param {'width'|'height'} [axis='width']
 * @returns {number}
 */
export function toDP(value, axis = 'width') {
  if (value == null) return 0;

  // number
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === 'string') {
    const s = value.trim();
    if (!s) return 0;

    // percentage: e.g. "40%"
    const mPerc = s.match(/^(-?\d+(?:\.\d+)?)%$/);
    if (mPerc) {
      const ratio = parseFloat(mPerc[1]) / 100;
      const size = getAxisSize(axis);
      const out = size * ratio;
      return Number.isFinite(out) ? Math.round(out) : 0;
    }

    // px suffix: e.g. "12px"
    const mPx = s.match(/^(-?\d+(?:\.\d+)?)px$/i);
    if (mPx) {
      const out = parseFloat(mPx[1]);
      return Number.isFinite(out) ? Math.round(out) : 0;
    }

    // plain numeric string: e.g. "12"
    const n = Number(s);
    return Number.isFinite(n) ? n : 0;
  }

  return 0;
}

/** viewport width percentage to dp */
export const vw = (p) => toDP(`${p}%`, 'width');
/** viewport height percentage to dp */
export const vh = (p) => toDP(`${p}%`, 'height');
