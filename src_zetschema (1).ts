import { ZetString, ZetNumber } from './schemas/primitives';
import { ZetObject } from './schemas/object';
import { ZetArray } from './schemas/array';
import { ZetType } from './schemas/base';

export function createZet() {
  return {
    string: () => new ZetString(),
    number: () => new ZetNumber(),
    object: <T extends Record<string, ZetType<any>>>(shape: T) => new ZetObject(shape),
    array: <T extends ZetType<any>>(type: T) => new ZetArray(type),
    // Add other schema types...
  };
}