if (typeof Array.prototype.mapOrDefault !== 'function') {
  Array.prototype.mapOrDefault = function(defaultValue, callback, thisArg) {
    if (this === null) throw new TypeError('mapOrDefault called on null array');

    // Setup the default return value - map returns an array, so we should too
    const retVal = (defaultValue && typeof defaultValue !== 'function') ?
      [defaultValue] :
      [];

    return this.length !== 0 ? this.map(callback, thisArg) : retVal;
  }
}
