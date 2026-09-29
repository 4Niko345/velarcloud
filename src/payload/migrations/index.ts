import * as migration_20260928_134421_initial from './20260928_134421_initial';
import * as migration_20260929_144306_localization_and_sections from './20260929_144306_localization_and_sections';
import * as migration_20260929_153505_trial_announcement_and_trust_line from './20260929_153505_trial_announcement_and_trust_line';
import * as migration_20260929_155618_section_icons_and_brand_logos from './20260929_155618_section_icons_and_brand_logos';

export const migrations = [
  {
    up: migration_20260928_134421_initial.up,
    down: migration_20260928_134421_initial.down,
    name: '20260928_134421_initial',
  },
  {
    up: migration_20260929_144306_localization_and_sections.up,
    down: migration_20260929_144306_localization_and_sections.down,
    name: '20260929_144306_localization_and_sections',
  },
  {
    up: migration_20260929_153505_trial_announcement_and_trust_line.up,
    down: migration_20260929_153505_trial_announcement_and_trust_line.down,
    name: '20260929_153505_trial_announcement_and_trust_line',
  },
  {
    up: migration_20260929_155618_section_icons_and_brand_logos.up,
    down: migration_20260929_155618_section_icons_and_brand_logos.down,
    name: '20260929_155618_section_icons_and_brand_logos'
  },
];
