import * as migration_20260928_134421_initial from './20260928_134421_initial';

export const migrations = [
  {
    up: migration_20260928_134421_initial.up,
    down: migration_20260928_134421_initial.down,
    name: '20260928_134421_initial'
  },
];
