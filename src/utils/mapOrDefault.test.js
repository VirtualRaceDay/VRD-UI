import './mapOrDefault';

describe('mapOrDefault', () => {
  it('should return the default value if the given array is empty', () => {
    const array = [];
    const result = array.mapOrDefault('default', () => {});
    expect(result).toStrictEqual(['default']);
  });

  it('should return the mapped values if the given array is not empty', () => {
    const array = [1, 2, 3];
    const expected = [1, 4, 9];
    const result = array.mapOrDefault(0, (e) => e * e);
    expect(result).toStrictEqual(expected);
  });
});
