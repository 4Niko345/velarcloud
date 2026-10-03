import * as migration_20260928_134421_initial from './20260928_134421_initial';
import * as migration_20260929_144306_localization_and_sections from './20260929_144306_localization_and_sections';
import * as migration_20260929_153505_trial_announcement_and_trust_line from './20260929_153505_trial_announcement_and_trust_line';
import * as migration_20260929_155618_section_icons_and_brand_logos from './20260929_155618_section_icons_and_brand_logos';
import * as migration_20260930_154311_testimonials_and_pricing_billing from './20260930_154311_testimonials_and_pricing_billing';
import * as migration_20261001_101907_subpages_posts_contact_localized_slugs from './20261001_101907_subpages_posts_contact_localized_slugs';
import * as migration_20261003_141104_forms_and_email_templates from './20261003_141104_forms_and_email_templates';

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
    name: '20260929_155618_section_icons_and_brand_logos',
  },
  {
    up: migration_20260930_154311_testimonials_and_pricing_billing.up,
    down: migration_20260930_154311_testimonials_and_pricing_billing.down,
    name: '20260930_154311_testimonials_and_pricing_billing',
  },
  {
    up: migration_20261001_101907_subpages_posts_contact_localized_slugs.up,
    down: migration_20261001_101907_subpages_posts_contact_localized_slugs.down,
    name: '20261001_101907_subpages_posts_contact_localized_slugs',
  },
  {
    up: migration_20261003_141104_forms_and_email_templates.up,
    down: migration_20261003_141104_forms_and_email_templates.down,
    name: '20261003_141104_forms_and_email_templates'
  },
];
