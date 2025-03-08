export class BaseDto<T> {
  constructor(partial: Partial<T>) {
    if (!partial) return;

    Object.keys(partial as Record<string, unknown>).forEach((key) => {
      if (key in this) {
        const typeSafeThis = this as Record<string, unknown>;
        typeSafeThis[key] = (partial as Record<string, unknown>)[key];
      }
    });
  }
}
