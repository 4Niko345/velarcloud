import * as migration_20260928_134421_initial from './20260928_134421_initial';
import * as migration_20260929_144306_localization_and_sections from './20260929_144306_localization_and_sections';

export const migrations = [
  {
    up: migration_20260928_134421_initial.up,
    down: migration_20260928_134421_initial.down,
    name: '20260928_134421_initial',
  },
  {
    up: migration_20260929_144306_localization_and_sections.up,
    down: migration_20260929_144306_localization_and_sections.down,
    name: '20260929_144306_localization_and_sections'
  },
];
