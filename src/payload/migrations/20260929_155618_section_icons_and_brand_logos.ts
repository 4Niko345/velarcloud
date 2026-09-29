import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_highlights_icon" AS ENUM('crm', 'website', 'automation', 'messages', 'social', 'payments', 'ai', 'reports', 'check', 'gift', 'zap', 'layers', 'rocket', 'star', 'crown', 'gem', 'shield', 'clock', 'wallet', 'piggy', 'trending', 'calendar', 'headset', 'globe');
  CREATE TYPE "public"."enum_pages_blocks_features_items_brands" AS ENUM('google', 'googlecalendar', 'googlemeet', 'gmail', 'facebook', 'messenger', 'instagram', 'whatsapp', 'tiktok', 'youtube', 'x', 'stripe', 'paypal', 'shopify', 'wordpress', 'zoom', 'quickbooks');
  CREATE TYPE "public"."enum_pages_blocks_benefits_items_icon" AS ENUM('crm', 'website', 'automation', 'messages', 'social', 'payments', 'ai', 'reports', 'check', 'gift', 'zap', 'layers', 'rocket', 'star', 'crown', 'gem', 'shield', 'clock', 'wallet', 'piggy', 'trending', 'calendar', 'headset', 'globe');
  CREATE TYPE "public"."enum_pages_blocks_pricing_plans_icon" AS ENUM('crm', 'website', 'automation', 'messages', 'social', 'payments', 'ai', 'reports', 'check', 'gift', 'zap', 'layers', 'rocket', 'star', 'crown', 'gem', 'shield', 'clock', 'wallet', 'piggy', 'trending', 'calendar', 'headset', 'globe');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_highlights_icon" AS ENUM('crm', 'website', 'automation', 'messages', 'social', 'payments', 'ai', 'reports', 'check', 'gift', 'zap', 'layers', 'rocket', 'star', 'crown', 'gem', 'shield', 'clock', 'wallet', 'piggy', 'trending', 'calendar', 'headset', 'globe');
  CREATE TYPE "public"."enum__pages_v_blocks_features_items_brands" AS ENUM('google', 'googlecalendar', 'googlemeet', 'gmail', 'facebook', 'messenger', 'instagram', 'whatsapp', 'tiktok', 'youtube', 'x', 'stripe', 'paypal', 'shopify', 'wordpress', 'zoom', 'quickbooks');
  CREATE TYPE "public"."enum__pages_v_blocks_benefits_items_icon" AS ENUM('crm', 'website', 'automation', 'messages', 'social', 'payments', 'ai', 'reports', 'check', 'gift', 'zap', 'layers', 'rocket', 'star', 'crown', 'gem', 'shield', 'clock', 'wallet', 'piggy', 'trending', 'calendar', 'headset', 'globe');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_plans_icon" AS ENUM('crm', 'website', 'automation', 'messages', 'social', 'payments', 'ai', 'reports', 'check', 'gift', 'zap', 'layers', 'rocket', 'star', 'crown', 'gem', 'shield', 'clock', 'wallet', 'piggy', 'trending', 'calendar', 'headset', 'globe');
  ALTER TYPE "public"."enum_pages_blocks_features_items_icon" ADD VALUE 'check';
  ALTER TYPE "public"."enum_pages_blocks_features_items_icon" ADD VALUE 'gift';
  ALTER TYPE "public"."enum_pages_blocks_features_items_icon" ADD VALUE 'zap';
  ALTER TYPE "public"."enum_pages_blocks_features_items_icon" ADD VALUE 'layers';
  ALTER TYPE "public"."enum_pages_blocks_features_items_icon" ADD VALUE 'rocket';
  ALTER TYPE "public"."enum_pages_blocks_features_items_icon" ADD VALUE 'star';
  ALTER TYPE "public"."enum_pages_blocks_features_items_icon" ADD VALUE 'crown';
  ALTER TYPE "public"."enum_pages_blocks_features_items_icon" ADD VALUE 'gem';
  ALTER TYPE "public"."enum_pages_blocks_features_items_icon" ADD VALUE 'shield';
  ALTER TYPE "public"."enum_pages_blocks_features_items_icon" ADD VALUE 'clock';
  ALTER TYPE "public"."enum_pages_blocks_features_items_icon" ADD VALUE 'wallet';
  ALTER TYPE "public"."enum_pages_blocks_features_items_icon" ADD VALUE 'piggy';
  ALTER TYPE "public"."enum_pages_blocks_features_items_icon" ADD VALUE 'trending';
  ALTER TYPE "public"."enum_pages_blocks_features_items_icon" ADD VALUE 'calendar';
  ALTER TYPE "public"."enum_pages_blocks_features_items_icon" ADD VALUE 'headset';
  ALTER TYPE "public"."enum_pages_blocks_features_items_icon" ADD VALUE 'globe';
  ALTER TYPE "public"."enum__pages_v_blocks_features_items_icon" ADD VALUE 'check';
  ALTER TYPE "public"."enum__pages_v_blocks_features_items_icon" ADD VALUE 'gift';
  ALTER TYPE "public"."enum__pages_v_blocks_features_items_icon" ADD VALUE 'zap';
  ALTER TYPE "public"."enum__pages_v_blocks_features_items_icon" ADD VALUE 'layers';
  ALTER TYPE "public"."enum__pages_v_blocks_features_items_icon" ADD VALUE 'rocket';
  ALTER TYPE "public"."enum__pages_v_blocks_features_items_icon" ADD VALUE 'star';
  ALTER TYPE "public"."enum__pages_v_blocks_features_items_icon" ADD VALUE 'crown';
  ALTER TYPE "public"."enum__pages_v_blocks_features_items_icon" ADD VALUE 'gem';
  ALTER TYPE "public"."enum__pages_v_blocks_features_items_icon" ADD VALUE 'shield';
  ALTER TYPE "public"."enum__pages_v_blocks_features_items_icon" ADD VALUE 'clock';
  ALTER TYPE "public"."enum__pages_v_blocks_features_items_icon" ADD VALUE 'wallet';
  ALTER TYPE "public"."enum__pages_v_blocks_features_items_icon" ADD VALUE 'piggy';
  ALTER TYPE "public"."enum__pages_v_blocks_features_items_icon" ADD VALUE 'trending';
  ALTER TYPE "public"."enum__pages_v_blocks_features_items_icon" ADD VALUE 'calendar';
  ALTER TYPE "public"."enum__pages_v_blocks_features_items_icon" ADD VALUE 'headset';
  ALTER TYPE "public"."enum__pages_v_blocks_features_items_icon" ADD VALUE 'globe';
  CREATE TABLE "pages_blocks_features_items_brands" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_features_items_brands",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_features_items_brands" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_features_items_brands",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "pages_blocks_hero_highlights" ADD COLUMN "icon" "enum_pages_blocks_hero_highlights_icon" DEFAULT 'check';
  ALTER TABLE "pages_blocks_benefits_items" ADD COLUMN "icon" "enum_pages_blocks_benefits_items_icon";
  ALTER TABLE "pages_blocks_pricing_plans" ADD COLUMN "icon" "enum_pages_blocks_pricing_plans_icon";
  ALTER TABLE "_pages_v_blocks_hero_highlights" ADD COLUMN "icon" "enum__pages_v_blocks_hero_highlights_icon" DEFAULT 'check';
  ALTER TABLE "_pages_v_blocks_benefits_items" ADD COLUMN "icon" "enum__pages_v_blocks_benefits_items_icon";
  ALTER TABLE "_pages_v_blocks_pricing_plans" ADD COLUMN "icon" "enum__pages_v_blocks_pricing_plans_icon";
  ALTER TABLE "pages_blocks_features_items_brands" ADD CONSTRAINT "pages_blocks_features_items_brands_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_features_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_items_brands" ADD CONSTRAINT "_pages_v_blocks_features_items_brands_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_features_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_features_items_brands_order_idx" ON "pages_blocks_features_items_brands" USING btree ("order");
  CREATE INDEX "pages_blocks_features_items_brands_parent_idx" ON "pages_blocks_features_items_brands" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_features_items_brands_order_idx" ON "_pages_v_blocks_features_items_brands" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_features_items_brands_parent_idx" ON "_pages_v_blocks_features_items_brands" USING btree ("parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_features_items_brands" CASCADE;
  DROP TABLE "_pages_v_blocks_features_items_brands" CASCADE;
  ALTER TABLE "pages_blocks_features_items" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_features_items" ALTER COLUMN "icon" SET DEFAULT 'crm'::text;
  -- Hand-added: detach the column from the type and map icons added in up() back to "crm".
  ALTER TABLE "pages_blocks_features_items" ALTER COLUMN "icon" DROP DEFAULT;
  ALTER TABLE "pages_blocks_features_items" ALTER COLUMN "icon" SET DATA TYPE text;
  UPDATE "pages_blocks_features_items" SET "icon" = 'crm'
    WHERE "icon" NOT IN ('crm', 'website', 'automation', 'messages', 'social', 'payments', 'ai', 'reports');
  DROP TYPE "public"."enum_pages_blocks_features_items_icon";
  CREATE TYPE "public"."enum_pages_blocks_features_items_icon" AS ENUM('crm', 'website', 'automation', 'messages', 'social', 'payments', 'ai', 'reports');
  ALTER TABLE "pages_blocks_features_items" ALTER COLUMN "icon" SET DEFAULT 'crm'::"public"."enum_pages_blocks_features_items_icon";
  ALTER TABLE "pages_blocks_features_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_features_items_icon" USING "icon"::"public"."enum_pages_blocks_features_items_icon";
  ALTER TABLE "_pages_v_blocks_features_items" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_features_items" ALTER COLUMN "icon" SET DEFAULT 'crm'::text;
  ALTER TABLE "_pages_v_blocks_features_items" ALTER COLUMN "icon" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_features_items" ALTER COLUMN "icon" SET DATA TYPE text;
  UPDATE "_pages_v_blocks_features_items" SET "icon" = 'crm'
    WHERE "icon" NOT IN ('crm', 'website', 'automation', 'messages', 'social', 'payments', 'ai', 'reports');
  DROP TYPE "public"."enum__pages_v_blocks_features_items_icon";
  CREATE TYPE "public"."enum__pages_v_blocks_features_items_icon" AS ENUM('crm', 'website', 'automation', 'messages', 'social', 'payments', 'ai', 'reports');
  ALTER TABLE "_pages_v_blocks_features_items" ALTER COLUMN "icon" SET DEFAULT 'crm'::"public"."enum__pages_v_blocks_features_items_icon";
  ALTER TABLE "_pages_v_blocks_features_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__pages_v_blocks_features_items_icon" USING "icon"::"public"."enum__pages_v_blocks_features_items_icon";
  ALTER TABLE "pages_blocks_hero_highlights" DROP COLUMN "icon";
  ALTER TABLE "pages_blocks_benefits_items" DROP COLUMN "icon";
  ALTER TABLE "pages_blocks_pricing_plans" DROP COLUMN "icon";
  ALTER TABLE "_pages_v_blocks_hero_highlights" DROP COLUMN "icon";
  ALTER TABLE "_pages_v_blocks_benefits_items" DROP COLUMN "icon";
  ALTER TABLE "_pages_v_blocks_pricing_plans" DROP COLUMN "icon";
  DROP TYPE "public"."enum_pages_blocks_hero_highlights_icon";
  DROP TYPE "public"."enum_pages_blocks_features_items_brands";
  DROP TYPE "public"."enum_pages_blocks_benefits_items_icon";
  DROP TYPE "public"."enum_pages_blocks_pricing_plans_icon";
  DROP TYPE "public"."enum__pages_v_blocks_hero_highlights_icon";
  DROP TYPE "public"."enum__pages_v_blocks_features_items_brands";
  DROP TYPE "public"."enum__pages_v_blocks_benefits_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_plans_icon";`)
}
