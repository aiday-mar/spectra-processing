import { xySetYValue } from '../xySetYValue';

describe('xySetYValue', () => {
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const y = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0];

  it('All', () => {
    let expected = {
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0],
    };
    let result = xySetYValue({ x, y });
    result.x = Array.from(result.x);
    result.y = Array.from(result.y);
    expect(result).toStrictEqual(expected);
  });

  it('one zone', () => {
    let expected = {
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [0, 0, 0, 3, 4, 5, 4, 3, 2, 1, 0],
    };
    let result = xySetYValue({ x, y }, { zones: [{ from: -1, to: 2 }] });
    result.x = Array.from(result.x);
    result.y = Array.from(result.y);
    expect(result).toStrictEqual(expected);
  });

  it('two zones', () => {
    let expected = {
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [0, 0, 0, 3, 4, 0, 0, 0, 2, 1, 0],
    };
    let result = xySetYValue(
      { x, y },
      {
        zones: [
          { from: -1, to: 2 },
          { from: 5, to: 7 },
        ],
      },
    );
    result.x = Array.from(result.x);
    result.y = Array.from(result.y);
    expect(result).toStrictEqual(expected);
  });

  it('three zones', () => {
    let expected = {
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0],
    };
    let result = xySetYValue(
      { x, y },
      {
        zones: [
          { from: 2, to: 4 },
          { from: 5, to: 7 },
          { from: 9, to: 20 },
        ],
      },
    );
    result.x = Array.from(result.x);
    result.y = Array.from(result.y);
    expect(result).toStrictEqual(expected);
  });

  it('three zones value 1', () => {
    let expected = {
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [0, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
    };
    let result = xySetYValue(
      { x, y },
      {
        zones: [
          { from: 2, to: 4 },
          { from: 5, to: 7 },
          { from: 9, to: 20 },
        ],
        value: 1,
      },
    );
    result.x = Array.from(result.x);
    result.y = Array.from(result.y);
    expect(result).toStrictEqual(expected);
  });
});
