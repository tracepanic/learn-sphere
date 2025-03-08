export class BaseDto<T> {
  constructor(partial: Partial<T>) {
    if (!partial) return;

    // Only assign own properties, not inherited ones
    Object.assign(this, 
      Object.entries(partial)
        .filter(([key]) => Object.prototype.hasOwnProperty.call(this, key))
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
    );
  }
}
