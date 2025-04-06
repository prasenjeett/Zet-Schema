export * from './types';
export * from './schemas';
export * from './errors';
export * from './utils';

import { createZet } from './zetschema';
export const z = createZet();
export default z;