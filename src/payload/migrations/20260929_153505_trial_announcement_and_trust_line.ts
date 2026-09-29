import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_announcement_kind" AS ENUM('trial', 'booking', 'custom');
  CREATE TABLE "pages_blocks_hero_trust_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_trust_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero_trust_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_trust_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "site_settings" ADD COLUMN "announcement_enabled" boolean DEFAULT false;
  ALTER TABLE "site_settings" ADD COLUMN "announcement_kind" "enum_site_settings_announcement_kind" DEFAULT 'trial' NOT NULL;
  ALTER TABLE "site_settings_locales" ADD COLUMN "announcement_text" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "announcement_label" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "announcement_url" varchar;
  ALTER TABLE "pages_blocks_hero_trust_items" ADD CONSTRAINT "pages_blocks_hero_trust_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_trust_items_locales" ADD CONSTRAINT "pages_blocks_hero_trust_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_trust_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_trust_items" ADD CONSTRAINT "_pages_v_blocks_hero_trust_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_trust_items_locales" ADD CONSTRAINT "_pages_v_blocks_hero_trust_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_trust_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_trust_items_order_idx" ON "pages_blocks_hero_trust_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_trust_items_parent_id_idx" ON "pages_blocks_hero_trust_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_trust_items_locales_locale_parent_id_uniqu" ON "pages_blocks_hero_trust_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_trust_items_order_idx" ON "_pages_v_blocks_hero_trust_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_trust_items_parent_id_idx" ON "_pages_v_blocks_hero_trust_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_trust_items_locales_locale_parent_id_un" ON "_pages_v_blocks_hero_trust_items_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_trust_items" CASCADE;
  DROP TABLE "pages_blocks_hero_trust_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_trust_items" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_trust_items_locales" CASCADE;
  ALTER TABLE "site_settings" DROP COLUMN "announcement_enabled";
  ALTER TABLE "site_settings" DROP COLUMN "announcement_kind";
  ALTER TABLE "site_settings_locales" DROP COLUMN "announcement_text";
  ALTER TABLE "site_settings_locales" DROP COLUMN "announcement_label";
  ALTER TABLE "site_settings_locales" DROP COLUMN "announcement_url";
  DROP TYPE "public"."enum_site_settings_announcement_kind";`)
}
