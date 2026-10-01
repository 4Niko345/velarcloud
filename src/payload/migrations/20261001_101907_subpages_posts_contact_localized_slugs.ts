import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_contact_links_kind" AS ENUM('trial', 'booking', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_contact_links_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_links_kind" AS ENUM('trial', 'booking', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_links_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('fi', 'en');
  CREATE TABLE "pages_blocks_contact_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_pages_blocks_contact_links_kind" DEFAULT 'trial',
  	"appearance" "enum_pages_blocks_contact_links_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_contact_links_locales" (
  	"label" varchar,
  	"url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"show_email" boolean DEFAULT true,
  	"form_height" numeric DEFAULT 760,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"form_url" varchar,
  	"form_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__pages_v_blocks_contact_links_kind" DEFAULT 'trial',
  	"appearance" "enum__pages_v_blocks_contact_links_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_links_locales" (
  	"label" varchar,
  	"url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"show_email" boolean DEFAULT true,
  	"form_height" numeric DEFAULT 760,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"form_url" varchar,
  	"form_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"cover_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"category" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_cover_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__posts_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_posts_v_locales" (
  	"version_title" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_category" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DROP INDEX "pages_slug_idx";
  DROP INDEX "_pages_v_version_version_slug_idx";
  ALTER TABLE "pages_blocks_features_items" ADD COLUMN "image_id" integer;
  ALTER TABLE "pages_locales" ADD COLUMN "generate_slug" boolean DEFAULT true;
  ALTER TABLE "pages_locales" ADD COLUMN "slug" varchar;
  ALTER TABLE "_pages_v_blocks_features_items" ADD COLUMN "image_id" integer;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_generate_slug" boolean DEFAULT true;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_slug" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "site_settings_nav_locales" ADD COLUMN "href" varchar;
  ALTER TABLE "pages_blocks_contact_links" ADD CONSTRAINT "pages_blocks_contact_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_links_locales" ADD CONSTRAINT "pages_blocks_contact_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_locales" ADD CONSTRAINT "pages_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_links" ADD CONSTRAINT "_pages_v_blocks_contact_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_links_locales" ADD CONSTRAINT "_pages_v_blocks_contact_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_locales" ADD CONSTRAINT "_pages_v_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_contact_links_order_idx" ON "pages_blocks_contact_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_links_parent_id_idx" ON "pages_blocks_contact_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_links_locales_locale_parent_id_unique" ON "pages_blocks_contact_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_order_idx" ON "pages_blocks_contact" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_parent_id_idx" ON "pages_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_path_idx" ON "pages_blocks_contact" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_image_idx" ON "pages_blocks_contact" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_locales_locale_parent_id_unique" ON "pages_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_links_order_idx" ON "_pages_v_blocks_contact_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_links_parent_id_idx" ON "_pages_v_blocks_contact_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_links_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_contact_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_order_idx" ON "_pages_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_parent_id_idx" ON "_pages_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_path_idx" ON "_pages_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_image_idx" ON "_pages_v_blocks_contact" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_locales_locale_parent_id_unique" ON "_pages_v_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_cover_image_idx" ON "posts" USING btree ("cover_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_cover_image_idx" ON "_posts_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v_locales" USING btree ("version_slug","_locale");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_features_items" ADD CONSTRAINT "pages_blocks_features_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_items" ADD CONSTRAINT "_pages_v_blocks_features_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_features_items_image_idx" ON "pages_blocks_features_items" USING btree ("image_id");
  -- Hand-added: carry existing slugs and menu links into every language (same value in fi and en).
  INSERT INTO "pages_locales" ("_locale", "_parent_id")
    SELECT l."code"::"_locales", p."id" FROM "pages" p CROSS JOIN (VALUES ('fi'), ('en')) AS l("code")
    WHERE NOT EXISTS (SELECT 1 FROM "pages_locales" x WHERE x."_parent_id" = p."id" AND x."_locale" = l."code"::"_locales");
  UPDATE "pages_locales" l SET "slug" = p."slug", "generate_slug" = p."generate_slug" FROM "pages" p WHERE l."_parent_id" = p."id";
  INSERT INTO "_pages_v_locales" ("_locale", "_parent_id")
    SELECT l."code"::"_locales", v."id" FROM "_pages_v" v CROSS JOIN (VALUES ('fi'), ('en')) AS l("code")
    WHERE NOT EXISTS (SELECT 1 FROM "_pages_v_locales" x WHERE x."_parent_id" = v."id" AND x."_locale" = l."code"::"_locales");
  UPDATE "_pages_v_locales" l SET "version_slug" = v."version_slug", "version_generate_slug" = v."version_generate_slug" FROM "_pages_v" v WHERE l."_parent_id" = v."id";
  UPDATE "site_settings_nav_locales" l SET "href" = n."href" FROM "site_settings_nav" n WHERE l."_parent_id" = n."id";
  UPDATE "site_settings_nav_locales" SET "href" = '/' WHERE "href" IS NULL;
  ALTER TABLE "site_settings_nav_locales" ALTER COLUMN "href" SET NOT NULL;
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages_locales" USING btree ("slug","_locale");
  CREATE INDEX "_pages_v_blocks_features_items_image_idx" ON "_pages_v_blocks_features_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v_locales" USING btree ("version_slug","_locale");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  ALTER TABLE "pages" DROP COLUMN "generate_slug";
  ALTER TABLE "pages" DROP COLUMN "slug";
  ALTER TABLE "_pages_v" DROP COLUMN "version_generate_slug";
  ALTER TABLE "_pages_v" DROP COLUMN "version_slug";
  ALTER TABLE "site_settings_nav" DROP COLUMN "href";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_contact_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_contact_links" CASCADE;
  DROP TABLE "pages_blocks_contact_links_locales" CASCADE;
  DROP TABLE "pages_blocks_contact" CASCADE;
  DROP TABLE "pages_blocks_contact_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_links" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_locales" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  ALTER TABLE "pages_blocks_features_items" DROP CONSTRAINT "pages_blocks_features_items_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_features_items" DROP CONSTRAINT "_pages_v_blocks_features_items_image_id_media_id_fk";
  
  -- Hand-edited: IF EXISTS, because DROP TABLE "posts" CASCADE above already removed it.
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_posts_fk";
  
  DROP INDEX "pages_blocks_features_items_image_idx";
  DROP INDEX "pages_slug_idx";
  DROP INDEX "_pages_v_blocks_features_items_image_idx";
  DROP INDEX "_pages_v_version_version_slug_idx";
  DROP INDEX "payload_locked_documents_rels_posts_id_idx";
  ALTER TABLE "pages" ADD COLUMN "generate_slug" boolean DEFAULT true;
  ALTER TABLE "pages" ADD COLUMN "slug" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_generate_slug" boolean DEFAULT true;
  ALTER TABLE "_pages_v" ADD COLUMN "version_slug" varchar;
  ALTER TABLE "site_settings_nav" ADD COLUMN "href" varchar;
  -- Hand-added: restore the single slug and menu link from the Finnish values.
  UPDATE "pages" p SET "slug" = l."slug", "generate_slug" = l."generate_slug" FROM "pages_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'fi';
  UPDATE "_pages_v" v SET "version_slug" = l."version_slug", "version_generate_slug" = l."version_generate_slug" FROM "_pages_v_locales" l WHERE l."_parent_id" = v."id" AND l."_locale" = 'fi';
  UPDATE "site_settings_nav" n SET "href" = l."href" FROM "site_settings_nav_locales" l WHERE l."_parent_id" = n."id" AND l."_locale" = 'fi';
  UPDATE "site_settings_nav" SET "href" = '/' WHERE "href" IS NULL;
  ALTER TABLE "site_settings_nav" ALTER COLUMN "href" SET NOT NULL;
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  ALTER TABLE "pages_blocks_features_items" DROP COLUMN "image_id";
  ALTER TABLE "pages_locales" DROP COLUMN "generate_slug";
  ALTER TABLE "pages_locales" DROP COLUMN "slug";
  ALTER TABLE "_pages_v_blocks_features_items" DROP COLUMN "image_id";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_generate_slug";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_slug";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "posts_id";
  ALTER TABLE "site_settings_nav_locales" DROP COLUMN "href";
  DROP TYPE "public"."enum_pages_blocks_contact_links_kind";
  DROP TYPE "public"."enum_pages_blocks_contact_links_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_contact_links_kind";
  DROP TYPE "public"."enum__pages_v_blocks_contact_links_appearance";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_published_locale";`)
}
