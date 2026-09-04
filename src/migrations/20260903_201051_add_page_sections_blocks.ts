import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`tag\` text NOT NULL,
  	\`published_date\` text NOT NULL,
  	\`date_label\` text,
  	\`excerpt\` text NOT NULL,
  	\`body\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`image_alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_image_idx\` ON \`posts\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_text_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`image_alt\` text NOT NULL,
  	\`image_position\` text DEFAULT 'right' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_image_order_idx\` ON \`pages_blocks_text_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_image_parent_id_idx\` ON \`pages_blocks_text_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_image_path_idx\` ON \`pages_blocks_text_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_image_image_idx\` ON \`pages_blocks_text_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_banner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`text\` text NOT NULL,
  	\`button_label\` text NOT NULL,
  	\`button_href\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_banner_order_idx\` ON \`pages_blocks_cta_banner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_banner_parent_id_idx\` ON \`pages_blocks_cta_banner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_banner_path_idx\` ON \`pages_blocks_cta_banner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text NOT NULL,
  	\`author\` text,
  	\`role\` text,
  	\`photo_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_quote_order_idx\` ON \`pages_blocks_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_quote_parent_id_idx\` ON \`pages_blocks_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_quote_path_idx\` ON \`pages_blocks_quote\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_quote_photo_idx\` ON \`pages_blocks_quote\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_items_order_idx\` ON \`pages_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_items_parent_id_idx\` ON \`pages_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_order_idx\` ON \`pages_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_parent_id_idx\` ON \`pages_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_path_idx\` ON \`pages_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`alt\` text NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_images_order_idx\` ON \`pages_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_images_parent_id_idx\` ON \`pages_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_images_image_idx\` ON \`pages_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_order_idx\` ON \`pages_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_parent_id_idx\` ON \`pages_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_path_idx\` ON \`pages_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_items_order_idx\` ON \`pages_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_items_parent_id_idx\` ON \`pages_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_order_idx\` ON \`pages_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_parent_id_idx\` ON \`pages_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_path_idx\` ON \`pages_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_team_grid_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`email\` text,
  	\`photo_id\` integer,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_team_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_grid_members_order_idx\` ON \`pages_blocks_team_grid_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_grid_members_parent_id_idx\` ON \`pages_blocks_team_grid_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_grid_members_photo_idx\` ON \`pages_blocks_team_grid_members\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_team_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_grid_order_idx\` ON \`pages_blocks_team_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_grid_parent_id_idx\` ON \`pages_blocks_team_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_grid_path_idx\` ON \`pages_blocks_team_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_order_idx\` ON \`pages_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_parent_id_idx\` ON \`pages_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_path_idx\` ON \`pages_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`hero_eyebrow\` text,
  	\`hero_lead\` text,
  	\`hero_image_id\` integer,
  	\`hero_image_alt\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_image_idx\` ON \`pages\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`posts_id\` integer,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`home_quick_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	\`cta_label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	\`external\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_quick_links_order_idx\` ON \`home_quick_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_quick_links_parent_id_idx\` ON \`home_quick_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_text_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`image_alt\` text NOT NULL,
  	\`image_position\` text DEFAULT 'right' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_text_image_order_idx\` ON \`home_blocks_text_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_text_image_parent_id_idx\` ON \`home_blocks_text_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_text_image_path_idx\` ON \`home_blocks_text_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_text_image_image_idx\` ON \`home_blocks_text_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_cta_banner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`text\` text NOT NULL,
  	\`button_label\` text NOT NULL,
  	\`button_href\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_cta_banner_order_idx\` ON \`home_blocks_cta_banner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_cta_banner_parent_id_idx\` ON \`home_blocks_cta_banner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_cta_banner_path_idx\` ON \`home_blocks_cta_banner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text NOT NULL,
  	\`author\` text,
  	\`role\` text,
  	\`photo_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_quote_order_idx\` ON \`home_blocks_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_quote_parent_id_idx\` ON \`home_blocks_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_quote_path_idx\` ON \`home_blocks_quote\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_quote_photo_idx\` ON \`home_blocks_quote\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_stats_items_order_idx\` ON \`home_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_stats_items_parent_id_idx\` ON \`home_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_stats_order_idx\` ON \`home_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_stats_parent_id_idx\` ON \`home_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_stats_path_idx\` ON \`home_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`alt\` text NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_gallery_images_order_idx\` ON \`home_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_gallery_images_parent_id_idx\` ON \`home_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_gallery_images_image_idx\` ON \`home_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_gallery_order_idx\` ON \`home_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_gallery_parent_id_idx\` ON \`home_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_gallery_path_idx\` ON \`home_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_faq_items_order_idx\` ON \`home_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_faq_items_parent_id_idx\` ON \`home_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_faq_order_idx\` ON \`home_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_faq_parent_id_idx\` ON \`home_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_faq_path_idx\` ON \`home_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_team_grid_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`email\` text,
  	\`photo_id\` integer,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_blocks_team_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_team_grid_members_order_idx\` ON \`home_blocks_team_grid_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_team_grid_members_parent_id_idx\` ON \`home_blocks_team_grid_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_team_grid_members_photo_idx\` ON \`home_blocks_team_grid_members\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_team_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_team_grid_order_idx\` ON \`home_blocks_team_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_team_grid_parent_id_idx\` ON \`home_blocks_team_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_team_grid_path_idx\` ON \`home_blocks_team_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_rich_text_order_idx\` ON \`home_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_rich_text_parent_id_idx\` ON \`home_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_rich_text_path_idx\` ON \`home_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_eyebrow\` text NOT NULL,
  	\`hero_title\` text NOT NULL,
  	\`hero_subtitle\` text NOT NULL,
  	\`hero_image_id\` integer NOT NULL,
  	\`hero_image_alt\` text NOT NULL,
  	\`leitbild_quote\` text NOT NULL,
  	\`cta_title\` text NOT NULL,
  	\`cta_text\` text NOT NULL,
  	\`cta_button_label\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`home_hero_image_idx\` ON \`home\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_rels_order_idx\` ON \`home_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`home_rels_parent_idx\` ON \`home_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_rels_path_idx\` ON \`home_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`home_rels_posts_id_idx\` ON \`home_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`schulprofil_leitziele\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`schulprofil\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`schulprofil_leitziele_order_idx\` ON \`schulprofil_leitziele\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_leitziele_parent_id_idx\` ON \`schulprofil_leitziele\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`schulprofil_ausstattung\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	\`icon\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`schulprofil\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`schulprofil_ausstattung_order_idx\` ON \`schulprofil_ausstattung\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_ausstattung_parent_id_idx\` ON \`schulprofil_ausstattung\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`schulprofil_chronik\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`year\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`schulprofil\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`schulprofil_chronik_order_idx\` ON \`schulprofil_chronik\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_chronik_parent_id_idx\` ON \`schulprofil_chronik\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`schulprofil_blocks_text_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`image_alt\` text NOT NULL,
  	\`image_position\` text DEFAULT 'right' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`schulprofil\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_text_image_order_idx\` ON \`schulprofil_blocks_text_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_text_image_parent_id_idx\` ON \`schulprofil_blocks_text_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_text_image_path_idx\` ON \`schulprofil_blocks_text_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_text_image_image_idx\` ON \`schulprofil_blocks_text_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`schulprofil_blocks_cta_banner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`text\` text NOT NULL,
  	\`button_label\` text NOT NULL,
  	\`button_href\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`schulprofil\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_cta_banner_order_idx\` ON \`schulprofil_blocks_cta_banner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_cta_banner_parent_id_idx\` ON \`schulprofil_blocks_cta_banner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_cta_banner_path_idx\` ON \`schulprofil_blocks_cta_banner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`schulprofil_blocks_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text NOT NULL,
  	\`author\` text,
  	\`role\` text,
  	\`photo_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`schulprofil\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_quote_order_idx\` ON \`schulprofil_blocks_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_quote_parent_id_idx\` ON \`schulprofil_blocks_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_quote_path_idx\` ON \`schulprofil_blocks_quote\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_quote_photo_idx\` ON \`schulprofil_blocks_quote\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`schulprofil_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`schulprofil_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_stats_items_order_idx\` ON \`schulprofil_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_stats_items_parent_id_idx\` ON \`schulprofil_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`schulprofil_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`schulprofil\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_stats_order_idx\` ON \`schulprofil_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_stats_parent_id_idx\` ON \`schulprofil_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_stats_path_idx\` ON \`schulprofil_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`schulprofil_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`alt\` text NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`schulprofil_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_gallery_images_order_idx\` ON \`schulprofil_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_gallery_images_parent_id_idx\` ON \`schulprofil_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_gallery_images_image_idx\` ON \`schulprofil_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`schulprofil_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`schulprofil\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_gallery_order_idx\` ON \`schulprofil_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_gallery_parent_id_idx\` ON \`schulprofil_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_gallery_path_idx\` ON \`schulprofil_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`schulprofil_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`schulprofil_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_faq_items_order_idx\` ON \`schulprofil_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_faq_items_parent_id_idx\` ON \`schulprofil_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`schulprofil_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`schulprofil\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_faq_order_idx\` ON \`schulprofil_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_faq_parent_id_idx\` ON \`schulprofil_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_faq_path_idx\` ON \`schulprofil_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`schulprofil_blocks_team_grid_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`email\` text,
  	\`photo_id\` integer,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`schulprofil_blocks_team_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_team_grid_members_order_idx\` ON \`schulprofil_blocks_team_grid_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_team_grid_members_parent_id_idx\` ON \`schulprofil_blocks_team_grid_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_team_grid_members_photo_idx\` ON \`schulprofil_blocks_team_grid_members\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`schulprofil_blocks_team_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`schulprofil\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_team_grid_order_idx\` ON \`schulprofil_blocks_team_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_team_grid_parent_id_idx\` ON \`schulprofil_blocks_team_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_team_grid_path_idx\` ON \`schulprofil_blocks_team_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`schulprofil_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`schulprofil\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_rich_text_order_idx\` ON \`schulprofil_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_rich_text_parent_id_idx\` ON \`schulprofil_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`schulprofil_blocks_rich_text_path_idx\` ON \`schulprofil_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`schulprofil\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_eyebrow\` text NOT NULL,
  	\`hero_lead\` text NOT NULL,
  	\`hero_image_id\` integer NOT NULL,
  	\`hero_image_alt\` text NOT NULL,
  	\`leitbild_text\` text NOT NULL,
  	\`leitziele_intro\` text NOT NULL,
  	\`lage_intro\` text NOT NULL,
  	\`chronik_title\` text NOT NULL,
  	\`chronik_intro\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`schulprofil_hero_image_idx\` ON \`schulprofil\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE TABLE \`angebot_fachbereiche\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`fields\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`angebot\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`angebot_fachbereiche_order_idx\` ON \`angebot_fachbereiche\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`angebot_fachbereiche_parent_id_idx\` ON \`angebot_fachbereiche\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`angebot_fachbereiche_image_idx\` ON \`angebot_fachbereiche\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`angebot_profile\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`angebot\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`angebot_profile_order_idx\` ON \`angebot_profile\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`angebot_profile_parent_id_idx\` ON \`angebot_profile\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`angebot_ags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`angebot\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`angebot_ags_order_idx\` ON \`angebot_ags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`angebot_ags_parent_id_idx\` ON \`angebot_ags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`angebot_gewaltpraevention\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`stage\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`angebot\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`angebot_gewaltpraevention_order_idx\` ON \`angebot_gewaltpraevention\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`angebot_gewaltpraevention_parent_id_idx\` ON \`angebot_gewaltpraevention\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`angebot_blocks_text_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`image_alt\` text NOT NULL,
  	\`image_position\` text DEFAULT 'right' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`angebot\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`angebot_blocks_text_image_order_idx\` ON \`angebot_blocks_text_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_text_image_parent_id_idx\` ON \`angebot_blocks_text_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_text_image_path_idx\` ON \`angebot_blocks_text_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_text_image_image_idx\` ON \`angebot_blocks_text_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`angebot_blocks_cta_banner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`text\` text NOT NULL,
  	\`button_label\` text NOT NULL,
  	\`button_href\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`angebot\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`angebot_blocks_cta_banner_order_idx\` ON \`angebot_blocks_cta_banner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_cta_banner_parent_id_idx\` ON \`angebot_blocks_cta_banner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_cta_banner_path_idx\` ON \`angebot_blocks_cta_banner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`angebot_blocks_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text NOT NULL,
  	\`author\` text,
  	\`role\` text,
  	\`photo_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`angebot\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`angebot_blocks_quote_order_idx\` ON \`angebot_blocks_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_quote_parent_id_idx\` ON \`angebot_blocks_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_quote_path_idx\` ON \`angebot_blocks_quote\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_quote_photo_idx\` ON \`angebot_blocks_quote\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`angebot_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`angebot_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`angebot_blocks_stats_items_order_idx\` ON \`angebot_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_stats_items_parent_id_idx\` ON \`angebot_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`angebot_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`angebot\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`angebot_blocks_stats_order_idx\` ON \`angebot_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_stats_parent_id_idx\` ON \`angebot_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_stats_path_idx\` ON \`angebot_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`angebot_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`alt\` text NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`angebot_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`angebot_blocks_gallery_images_order_idx\` ON \`angebot_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_gallery_images_parent_id_idx\` ON \`angebot_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_gallery_images_image_idx\` ON \`angebot_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`angebot_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`angebot\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`angebot_blocks_gallery_order_idx\` ON \`angebot_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_gallery_parent_id_idx\` ON \`angebot_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_gallery_path_idx\` ON \`angebot_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`angebot_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`angebot_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`angebot_blocks_faq_items_order_idx\` ON \`angebot_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_faq_items_parent_id_idx\` ON \`angebot_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`angebot_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`angebot\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`angebot_blocks_faq_order_idx\` ON \`angebot_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_faq_parent_id_idx\` ON \`angebot_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_faq_path_idx\` ON \`angebot_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`angebot_blocks_team_grid_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`email\` text,
  	\`photo_id\` integer,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`angebot_blocks_team_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`angebot_blocks_team_grid_members_order_idx\` ON \`angebot_blocks_team_grid_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_team_grid_members_parent_id_idx\` ON \`angebot_blocks_team_grid_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_team_grid_members_photo_idx\` ON \`angebot_blocks_team_grid_members\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`angebot_blocks_team_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`angebot\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`angebot_blocks_team_grid_order_idx\` ON \`angebot_blocks_team_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_team_grid_parent_id_idx\` ON \`angebot_blocks_team_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_team_grid_path_idx\` ON \`angebot_blocks_team_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`angebot_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`angebot\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`angebot_blocks_rich_text_order_idx\` ON \`angebot_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_rich_text_parent_id_idx\` ON \`angebot_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`angebot_blocks_rich_text_path_idx\` ON \`angebot_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`angebot\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_eyebrow\` text NOT NULL,
  	\`hero_title\` text NOT NULL,
  	\`hero_lead\` text NOT NULL,
  	\`hero_image_id\` integer NOT NULL,
  	\`hero_image_alt\` text NOT NULL,
  	\`fachbereiche_intro\` text NOT NULL,
  	\`wahlpflicht_title\` text NOT NULL,
  	\`wahlpflicht_text\` text NOT NULL,
  	\`profile_title\` text NOT NULL,
  	\`profile_intro\` text NOT NULL,
  	\`ag_intro\` text NOT NULL,
  	\`berufsorientierung_text\` text NOT NULL,
  	\`gewaltpraevention_intro\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`angebot_hero_image_idx\` ON \`angebot\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE TABLE \`organisatorisches_mitbringen\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`organisatorisches\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`organisatorisches_mitbringen_order_idx\` ON \`organisatorisches_mitbringen\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_mitbringen_parent_id_idx\` ON \`organisatorisches_mitbringen\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`organisatorisches_abschluesse\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`level\` text NOT NULL,
  	\`title\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`organisatorisches\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`organisatorisches_abschluesse_order_idx\` ON \`organisatorisches_abschluesse\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_abschluesse_parent_id_idx\` ON \`organisatorisches_abschluesse\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`organisatorisches_infoblaetter\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`datei_id\` integer NOT NULL,
  	FOREIGN KEY (\`datei_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`organisatorisches\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`organisatorisches_infoblaetter_order_idx\` ON \`organisatorisches_infoblaetter\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_infoblaetter_parent_id_idx\` ON \`organisatorisches_infoblaetter\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_infoblaetter_datei_idx\` ON \`organisatorisches_infoblaetter\` (\`datei_id\`);`)
  await db.run(sql`CREATE TABLE \`organisatorisches_schulbuecher_dokumente\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`klasse\` text NOT NULL,
  	\`datei_id\` integer NOT NULL,
  	\`datei_sopaed_id\` integer,
  	FOREIGN KEY (\`datei_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`datei_sopaed_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`organisatorisches\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`organisatorisches_schulbuecher_dokumente_order_idx\` ON \`organisatorisches_schulbuecher_dokumente\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_schulbuecher_dokumente_parent_id_idx\` ON \`organisatorisches_schulbuecher_dokumente\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_schulbuecher_dokumente_datei_idx\` ON \`organisatorisches_schulbuecher_dokumente\` (\`datei_id\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_schulbuecher_dokumente_datei_sopaed_idx\` ON \`organisatorisches_schulbuecher_dokumente\` (\`datei_sopaed_id\`);`)
  await db.run(sql`CREATE TABLE \`organisatorisches_blocks_text_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`image_alt\` text NOT NULL,
  	\`image_position\` text DEFAULT 'right' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`organisatorisches\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_text_image_order_idx\` ON \`organisatorisches_blocks_text_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_text_image_parent_id_idx\` ON \`organisatorisches_blocks_text_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_text_image_path_idx\` ON \`organisatorisches_blocks_text_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_text_image_image_idx\` ON \`organisatorisches_blocks_text_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`organisatorisches_blocks_cta_banner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`text\` text NOT NULL,
  	\`button_label\` text NOT NULL,
  	\`button_href\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`organisatorisches\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_cta_banner_order_idx\` ON \`organisatorisches_blocks_cta_banner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_cta_banner_parent_id_idx\` ON \`organisatorisches_blocks_cta_banner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_cta_banner_path_idx\` ON \`organisatorisches_blocks_cta_banner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`organisatorisches_blocks_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text NOT NULL,
  	\`author\` text,
  	\`role\` text,
  	\`photo_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`organisatorisches\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_quote_order_idx\` ON \`organisatorisches_blocks_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_quote_parent_id_idx\` ON \`organisatorisches_blocks_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_quote_path_idx\` ON \`organisatorisches_blocks_quote\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_quote_photo_idx\` ON \`organisatorisches_blocks_quote\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`organisatorisches_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`organisatorisches_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_stats_items_order_idx\` ON \`organisatorisches_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_stats_items_parent_id_idx\` ON \`organisatorisches_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`organisatorisches_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`organisatorisches\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_stats_order_idx\` ON \`organisatorisches_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_stats_parent_id_idx\` ON \`organisatorisches_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_stats_path_idx\` ON \`organisatorisches_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`organisatorisches_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`alt\` text NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`organisatorisches_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_gallery_images_order_idx\` ON \`organisatorisches_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_gallery_images_parent_id_idx\` ON \`organisatorisches_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_gallery_images_image_idx\` ON \`organisatorisches_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`organisatorisches_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`organisatorisches\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_gallery_order_idx\` ON \`organisatorisches_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_gallery_parent_id_idx\` ON \`organisatorisches_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_gallery_path_idx\` ON \`organisatorisches_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`organisatorisches_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`organisatorisches_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_faq_items_order_idx\` ON \`organisatorisches_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_faq_items_parent_id_idx\` ON \`organisatorisches_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`organisatorisches_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`organisatorisches\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_faq_order_idx\` ON \`organisatorisches_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_faq_parent_id_idx\` ON \`organisatorisches_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_faq_path_idx\` ON \`organisatorisches_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`organisatorisches_blocks_team_grid_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`email\` text,
  	\`photo_id\` integer,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`organisatorisches_blocks_team_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_team_grid_members_order_idx\` ON \`organisatorisches_blocks_team_grid_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_team_grid_members_parent_id_idx\` ON \`organisatorisches_blocks_team_grid_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_team_grid_members_photo_idx\` ON \`organisatorisches_blocks_team_grid_members\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`organisatorisches_blocks_team_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`organisatorisches\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_team_grid_order_idx\` ON \`organisatorisches_blocks_team_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_team_grid_parent_id_idx\` ON \`organisatorisches_blocks_team_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_team_grid_path_idx\` ON \`organisatorisches_blocks_team_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`organisatorisches_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`organisatorisches\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_rich_text_order_idx\` ON \`organisatorisches_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_rich_text_parent_id_idx\` ON \`organisatorisches_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`organisatorisches_blocks_rich_text_path_idx\` ON \`organisatorisches_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`organisatorisches\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_lead\` text NOT NULL,
  	\`hero_image_id\` integer NOT NULL,
  	\`hero_image_alt\` text NOT NULL,
  	\`anmeldung_kl5_text\` text NOT NULL,
  	\`anmeldung_kl6bis10_text\` text NOT NULL,
  	\`schulbuchausleihe_text\` text NOT NULL,
  	\`abschluesse_intro\` text NOT NULL,
  	\`formulare_text\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`organisatorisches_hero_image_idx\` ON \`organisatorisches\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE TABLE \`personen_schulleitung_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text NOT NULL,
  	\`email\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`personen\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`personen_schulleitung_members_order_idx\` ON \`personen_schulleitung_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`personen_schulleitung_members_parent_id_idx\` ON \`personen_schulleitung_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`personen_gremien\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`personen\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`personen_gremien_order_idx\` ON \`personen_gremien\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`personen_gremien_parent_id_idx\` ON \`personen_gremien\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`personen_gremien_image_idx\` ON \`personen_gremien\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`personen_blocks_text_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`image_alt\` text NOT NULL,
  	\`image_position\` text DEFAULT 'right' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`personen\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`personen_blocks_text_image_order_idx\` ON \`personen_blocks_text_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_text_image_parent_id_idx\` ON \`personen_blocks_text_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_text_image_path_idx\` ON \`personen_blocks_text_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_text_image_image_idx\` ON \`personen_blocks_text_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`personen_blocks_cta_banner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`text\` text NOT NULL,
  	\`button_label\` text NOT NULL,
  	\`button_href\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`personen\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`personen_blocks_cta_banner_order_idx\` ON \`personen_blocks_cta_banner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_cta_banner_parent_id_idx\` ON \`personen_blocks_cta_banner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_cta_banner_path_idx\` ON \`personen_blocks_cta_banner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`personen_blocks_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text NOT NULL,
  	\`author\` text,
  	\`role\` text,
  	\`photo_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`personen\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`personen_blocks_quote_order_idx\` ON \`personen_blocks_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_quote_parent_id_idx\` ON \`personen_blocks_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_quote_path_idx\` ON \`personen_blocks_quote\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_quote_photo_idx\` ON \`personen_blocks_quote\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`personen_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`personen_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`personen_blocks_stats_items_order_idx\` ON \`personen_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_stats_items_parent_id_idx\` ON \`personen_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`personen_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`personen\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`personen_blocks_stats_order_idx\` ON \`personen_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_stats_parent_id_idx\` ON \`personen_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_stats_path_idx\` ON \`personen_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`personen_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`alt\` text NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`personen_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`personen_blocks_gallery_images_order_idx\` ON \`personen_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_gallery_images_parent_id_idx\` ON \`personen_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_gallery_images_image_idx\` ON \`personen_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`personen_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`personen\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`personen_blocks_gallery_order_idx\` ON \`personen_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_gallery_parent_id_idx\` ON \`personen_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_gallery_path_idx\` ON \`personen_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`personen_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`personen_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`personen_blocks_faq_items_order_idx\` ON \`personen_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_faq_items_parent_id_idx\` ON \`personen_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`personen_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`personen\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`personen_blocks_faq_order_idx\` ON \`personen_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_faq_parent_id_idx\` ON \`personen_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_faq_path_idx\` ON \`personen_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`personen_blocks_team_grid_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`email\` text,
  	\`photo_id\` integer,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`personen_blocks_team_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`personen_blocks_team_grid_members_order_idx\` ON \`personen_blocks_team_grid_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_team_grid_members_parent_id_idx\` ON \`personen_blocks_team_grid_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_team_grid_members_photo_idx\` ON \`personen_blocks_team_grid_members\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`personen_blocks_team_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`personen\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`personen_blocks_team_grid_order_idx\` ON \`personen_blocks_team_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_team_grid_parent_id_idx\` ON \`personen_blocks_team_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_team_grid_path_idx\` ON \`personen_blocks_team_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`personen_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`personen\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`personen_blocks_rich_text_order_idx\` ON \`personen_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_rich_text_parent_id_idx\` ON \`personen_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`personen_blocks_rich_text_path_idx\` ON \`personen_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`personen\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_eyebrow\` text NOT NULL,
  	\`hero_lead\` text NOT NULL,
  	\`schulleitung_photo_id\` integer NOT NULL,
  	\`schulleitung_photo_alt\` text NOT NULL,
  	\`schulleitung_intro\` text NOT NULL,
  	\`schulleitung_note\` text NOT NULL,
  	\`closing_note\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`schulleitung_photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`personen_schulleitung_photo_idx\` ON \`personen\` (\`schulleitung_photo_id\`);`)
  await db.run(sql`CREATE TABLE \`kontakt_blocks_text_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`image_alt\` text NOT NULL,
  	\`image_position\` text DEFAULT 'right' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`kontakt\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_text_image_order_idx\` ON \`kontakt_blocks_text_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_text_image_parent_id_idx\` ON \`kontakt_blocks_text_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_text_image_path_idx\` ON \`kontakt_blocks_text_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_text_image_image_idx\` ON \`kontakt_blocks_text_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`kontakt_blocks_cta_banner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`text\` text NOT NULL,
  	\`button_label\` text NOT NULL,
  	\`button_href\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`kontakt\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_cta_banner_order_idx\` ON \`kontakt_blocks_cta_banner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_cta_banner_parent_id_idx\` ON \`kontakt_blocks_cta_banner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_cta_banner_path_idx\` ON \`kontakt_blocks_cta_banner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`kontakt_blocks_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text NOT NULL,
  	\`author\` text,
  	\`role\` text,
  	\`photo_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`kontakt\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_quote_order_idx\` ON \`kontakt_blocks_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_quote_parent_id_idx\` ON \`kontakt_blocks_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_quote_path_idx\` ON \`kontakt_blocks_quote\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_quote_photo_idx\` ON \`kontakt_blocks_quote\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`kontakt_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`kontakt_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_stats_items_order_idx\` ON \`kontakt_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_stats_items_parent_id_idx\` ON \`kontakt_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`kontakt_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`kontakt\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_stats_order_idx\` ON \`kontakt_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_stats_parent_id_idx\` ON \`kontakt_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_stats_path_idx\` ON \`kontakt_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`kontakt_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`alt\` text NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`kontakt_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_gallery_images_order_idx\` ON \`kontakt_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_gallery_images_parent_id_idx\` ON \`kontakt_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_gallery_images_image_idx\` ON \`kontakt_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`kontakt_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`kontakt\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_gallery_order_idx\` ON \`kontakt_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_gallery_parent_id_idx\` ON \`kontakt_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_gallery_path_idx\` ON \`kontakt_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`kontakt_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`kontakt_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_faq_items_order_idx\` ON \`kontakt_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_faq_items_parent_id_idx\` ON \`kontakt_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`kontakt_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`kontakt\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_faq_order_idx\` ON \`kontakt_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_faq_parent_id_idx\` ON \`kontakt_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_faq_path_idx\` ON \`kontakt_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`kontakt_blocks_team_grid_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`email\` text,
  	\`photo_id\` integer,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`kontakt_blocks_team_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_team_grid_members_order_idx\` ON \`kontakt_blocks_team_grid_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_team_grid_members_parent_id_idx\` ON \`kontakt_blocks_team_grid_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_team_grid_members_photo_idx\` ON \`kontakt_blocks_team_grid_members\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`kontakt_blocks_team_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`kontakt\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_team_grid_order_idx\` ON \`kontakt_blocks_team_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_team_grid_parent_id_idx\` ON \`kontakt_blocks_team_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_team_grid_path_idx\` ON \`kontakt_blocks_team_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`kontakt_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`kontakt\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_rich_text_order_idx\` ON \`kontakt_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_rich_text_parent_id_idx\` ON \`kontakt_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`kontakt_blocks_rich_text_path_idx\` ON \`kontakt_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`kontakt\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`school_name\` text NOT NULL,
  	\`address_line1\` text NOT NULL,
  	\`address_line2\` text NOT NULL,
  	\`phone\` text NOT NULL,
  	\`phone_href\` text NOT NULL,
  	\`fax\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`map_query\` text NOT NULL,
  	\`sprechzeiten_title\` text NOT NULL,
  	\`sprechzeiten_text\` text NOT NULL,
  	\`hero_eyebrow\` text NOT NULL,
  	\`hero_lead\` text NOT NULL,
  	\`hero_image_id\` integer NOT NULL,
  	\`hero_image_alt\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`kontakt_hero_image_idx\` ON \`kontakt\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE TABLE \`impressum_sections_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`impressum_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`impressum_sections_paragraphs_order_idx\` ON \`impressum_sections_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`impressum_sections_paragraphs_parent_id_idx\` ON \`impressum_sections_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`impressum_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`impressum\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`impressum_sections_order_idx\` ON \`impressum_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`impressum_sections_parent_id_idx\` ON \`impressum_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`impressum_blocks_text_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`image_alt\` text NOT NULL,
  	\`image_position\` text DEFAULT 'right' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`impressum\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`impressum_blocks_text_image_order_idx\` ON \`impressum_blocks_text_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_text_image_parent_id_idx\` ON \`impressum_blocks_text_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_text_image_path_idx\` ON \`impressum_blocks_text_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_text_image_image_idx\` ON \`impressum_blocks_text_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`impressum_blocks_cta_banner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`text\` text NOT NULL,
  	\`button_label\` text NOT NULL,
  	\`button_href\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`impressum\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`impressum_blocks_cta_banner_order_idx\` ON \`impressum_blocks_cta_banner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_cta_banner_parent_id_idx\` ON \`impressum_blocks_cta_banner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_cta_banner_path_idx\` ON \`impressum_blocks_cta_banner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`impressum_blocks_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text NOT NULL,
  	\`author\` text,
  	\`role\` text,
  	\`photo_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`impressum\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`impressum_blocks_quote_order_idx\` ON \`impressum_blocks_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_quote_parent_id_idx\` ON \`impressum_blocks_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_quote_path_idx\` ON \`impressum_blocks_quote\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_quote_photo_idx\` ON \`impressum_blocks_quote\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`impressum_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`impressum_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`impressum_blocks_stats_items_order_idx\` ON \`impressum_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_stats_items_parent_id_idx\` ON \`impressum_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`impressum_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`impressum\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`impressum_blocks_stats_order_idx\` ON \`impressum_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_stats_parent_id_idx\` ON \`impressum_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_stats_path_idx\` ON \`impressum_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`impressum_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`alt\` text NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`impressum_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`impressum_blocks_gallery_images_order_idx\` ON \`impressum_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_gallery_images_parent_id_idx\` ON \`impressum_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_gallery_images_image_idx\` ON \`impressum_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`impressum_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`impressum\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`impressum_blocks_gallery_order_idx\` ON \`impressum_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_gallery_parent_id_idx\` ON \`impressum_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_gallery_path_idx\` ON \`impressum_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`impressum_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`impressum_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`impressum_blocks_faq_items_order_idx\` ON \`impressum_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_faq_items_parent_id_idx\` ON \`impressum_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`impressum_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`impressum\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`impressum_blocks_faq_order_idx\` ON \`impressum_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_faq_parent_id_idx\` ON \`impressum_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_faq_path_idx\` ON \`impressum_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`impressum_blocks_team_grid_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`email\` text,
  	\`photo_id\` integer,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`impressum_blocks_team_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`impressum_blocks_team_grid_members_order_idx\` ON \`impressum_blocks_team_grid_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_team_grid_members_parent_id_idx\` ON \`impressum_blocks_team_grid_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_team_grid_members_photo_idx\` ON \`impressum_blocks_team_grid_members\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`impressum_blocks_team_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`impressum\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`impressum_blocks_team_grid_order_idx\` ON \`impressum_blocks_team_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_team_grid_parent_id_idx\` ON \`impressum_blocks_team_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_team_grid_path_idx\` ON \`impressum_blocks_team_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`impressum_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`impressum\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`impressum_blocks_rich_text_order_idx\` ON \`impressum_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_rich_text_parent_id_idx\` ON \`impressum_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`impressum_blocks_rich_text_path_idx\` ON \`impressum_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`impressum\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`datenschutz_sections_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`datenschutz_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`datenschutz_sections_paragraphs_order_idx\` ON \`datenschutz_sections_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_sections_paragraphs_parent_id_idx\` ON \`datenschutz_sections_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`datenschutz_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`datenschutz\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`datenschutz_sections_order_idx\` ON \`datenschutz_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_sections_parent_id_idx\` ON \`datenschutz_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`datenschutz_rechte\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`datenschutz\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`datenschutz_rechte_order_idx\` ON \`datenschutz_rechte\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_rechte_parent_id_idx\` ON \`datenschutz_rechte\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`datenschutz_blocks_text_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`image_alt\` text NOT NULL,
  	\`image_position\` text DEFAULT 'right' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`datenschutz\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_text_image_order_idx\` ON \`datenschutz_blocks_text_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_text_image_parent_id_idx\` ON \`datenschutz_blocks_text_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_text_image_path_idx\` ON \`datenschutz_blocks_text_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_text_image_image_idx\` ON \`datenschutz_blocks_text_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`datenschutz_blocks_cta_banner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`text\` text NOT NULL,
  	\`button_label\` text NOT NULL,
  	\`button_href\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`datenschutz\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_cta_banner_order_idx\` ON \`datenschutz_blocks_cta_banner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_cta_banner_parent_id_idx\` ON \`datenschutz_blocks_cta_banner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_cta_banner_path_idx\` ON \`datenschutz_blocks_cta_banner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`datenschutz_blocks_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text NOT NULL,
  	\`author\` text,
  	\`role\` text,
  	\`photo_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`datenschutz\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_quote_order_idx\` ON \`datenschutz_blocks_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_quote_parent_id_idx\` ON \`datenschutz_blocks_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_quote_path_idx\` ON \`datenschutz_blocks_quote\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_quote_photo_idx\` ON \`datenschutz_blocks_quote\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`datenschutz_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`datenschutz_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_stats_items_order_idx\` ON \`datenschutz_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_stats_items_parent_id_idx\` ON \`datenschutz_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`datenschutz_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`datenschutz\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_stats_order_idx\` ON \`datenschutz_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_stats_parent_id_idx\` ON \`datenschutz_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_stats_path_idx\` ON \`datenschutz_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`datenschutz_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`alt\` text NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`datenschutz_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_gallery_images_order_idx\` ON \`datenschutz_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_gallery_images_parent_id_idx\` ON \`datenschutz_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_gallery_images_image_idx\` ON \`datenschutz_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`datenschutz_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`datenschutz\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_gallery_order_idx\` ON \`datenschutz_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_gallery_parent_id_idx\` ON \`datenschutz_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_gallery_path_idx\` ON \`datenschutz_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`datenschutz_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`datenschutz_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_faq_items_order_idx\` ON \`datenschutz_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_faq_items_parent_id_idx\` ON \`datenschutz_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`datenschutz_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`datenschutz\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_faq_order_idx\` ON \`datenschutz_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_faq_parent_id_idx\` ON \`datenschutz_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_faq_path_idx\` ON \`datenschutz_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`datenschutz_blocks_team_grid_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`email\` text,
  	\`photo_id\` integer,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`datenschutz_blocks_team_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_team_grid_members_order_idx\` ON \`datenschutz_blocks_team_grid_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_team_grid_members_parent_id_idx\` ON \`datenschutz_blocks_team_grid_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_team_grid_members_photo_idx\` ON \`datenschutz_blocks_team_grid_members\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`datenschutz_blocks_team_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`datenschutz\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_team_grid_order_idx\` ON \`datenschutz_blocks_team_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_team_grid_parent_id_idx\` ON \`datenschutz_blocks_team_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_team_grid_path_idx\` ON \`datenschutz_blocks_team_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`datenschutz_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`datenschutz\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_rich_text_order_idx\` ON \`datenschutz_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_rich_text_parent_id_idx\` ON \`datenschutz_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_blocks_rich_text_path_idx\` ON \`datenschutz_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`datenschutz\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`aufsichtsbehoerde_text\` text NOT NULL,
  	\`aufsichtsbehoerde_email\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_text_image\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_banner\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_quote\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_team_grid_members\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_team_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`home_quick_links\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_text_image\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_cta_banner\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_quote\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_team_grid_members\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_team_grid\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`home\`;`)
  await db.run(sql`DROP TABLE \`home_rels\`;`)
  await db.run(sql`DROP TABLE \`schulprofil_leitziele\`;`)
  await db.run(sql`DROP TABLE \`schulprofil_ausstattung\`;`)
  await db.run(sql`DROP TABLE \`schulprofil_chronik\`;`)
  await db.run(sql`DROP TABLE \`schulprofil_blocks_text_image\`;`)
  await db.run(sql`DROP TABLE \`schulprofil_blocks_cta_banner\`;`)
  await db.run(sql`DROP TABLE \`schulprofil_blocks_quote\`;`)
  await db.run(sql`DROP TABLE \`schulprofil_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`schulprofil_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`schulprofil_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`schulprofil_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`schulprofil_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`schulprofil_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`schulprofil_blocks_team_grid_members\`;`)
  await db.run(sql`DROP TABLE \`schulprofil_blocks_team_grid\`;`)
  await db.run(sql`DROP TABLE \`schulprofil_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`schulprofil\`;`)
  await db.run(sql`DROP TABLE \`angebot_fachbereiche\`;`)
  await db.run(sql`DROP TABLE \`angebot_profile\`;`)
  await db.run(sql`DROP TABLE \`angebot_ags\`;`)
  await db.run(sql`DROP TABLE \`angebot_gewaltpraevention\`;`)
  await db.run(sql`DROP TABLE \`angebot_blocks_text_image\`;`)
  await db.run(sql`DROP TABLE \`angebot_blocks_cta_banner\`;`)
  await db.run(sql`DROP TABLE \`angebot_blocks_quote\`;`)
  await db.run(sql`DROP TABLE \`angebot_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`angebot_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`angebot_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`angebot_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`angebot_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`angebot_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`angebot_blocks_team_grid_members\`;`)
  await db.run(sql`DROP TABLE \`angebot_blocks_team_grid\`;`)
  await db.run(sql`DROP TABLE \`angebot_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`angebot\`;`)
  await db.run(sql`DROP TABLE \`organisatorisches_mitbringen\`;`)
  await db.run(sql`DROP TABLE \`organisatorisches_abschluesse\`;`)
  await db.run(sql`DROP TABLE \`organisatorisches_infoblaetter\`;`)
  await db.run(sql`DROP TABLE \`organisatorisches_schulbuecher_dokumente\`;`)
  await db.run(sql`DROP TABLE \`organisatorisches_blocks_text_image\`;`)
  await db.run(sql`DROP TABLE \`organisatorisches_blocks_cta_banner\`;`)
  await db.run(sql`DROP TABLE \`organisatorisches_blocks_quote\`;`)
  await db.run(sql`DROP TABLE \`organisatorisches_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`organisatorisches_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`organisatorisches_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`organisatorisches_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`organisatorisches_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`organisatorisches_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`organisatorisches_blocks_team_grid_members\`;`)
  await db.run(sql`DROP TABLE \`organisatorisches_blocks_team_grid\`;`)
  await db.run(sql`DROP TABLE \`organisatorisches_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`organisatorisches\`;`)
  await db.run(sql`DROP TABLE \`personen_schulleitung_members\`;`)
  await db.run(sql`DROP TABLE \`personen_gremien\`;`)
  await db.run(sql`DROP TABLE \`personen_blocks_text_image\`;`)
  await db.run(sql`DROP TABLE \`personen_blocks_cta_banner\`;`)
  await db.run(sql`DROP TABLE \`personen_blocks_quote\`;`)
  await db.run(sql`DROP TABLE \`personen_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`personen_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`personen_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`personen_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`personen_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`personen_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`personen_blocks_team_grid_members\`;`)
  await db.run(sql`DROP TABLE \`personen_blocks_team_grid\`;`)
  await db.run(sql`DROP TABLE \`personen_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`personen\`;`)
  await db.run(sql`DROP TABLE \`kontakt_blocks_text_image\`;`)
  await db.run(sql`DROP TABLE \`kontakt_blocks_cta_banner\`;`)
  await db.run(sql`DROP TABLE \`kontakt_blocks_quote\`;`)
  await db.run(sql`DROP TABLE \`kontakt_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`kontakt_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`kontakt_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`kontakt_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`kontakt_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`kontakt_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`kontakt_blocks_team_grid_members\`;`)
  await db.run(sql`DROP TABLE \`kontakt_blocks_team_grid\`;`)
  await db.run(sql`DROP TABLE \`kontakt_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`kontakt\`;`)
  await db.run(sql`DROP TABLE \`impressum_sections_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`impressum_sections\`;`)
  await db.run(sql`DROP TABLE \`impressum_blocks_text_image\`;`)
  await db.run(sql`DROP TABLE \`impressum_blocks_cta_banner\`;`)
  await db.run(sql`DROP TABLE \`impressum_blocks_quote\`;`)
  await db.run(sql`DROP TABLE \`impressum_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`impressum_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`impressum_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`impressum_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`impressum_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`impressum_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`impressum_blocks_team_grid_members\`;`)
  await db.run(sql`DROP TABLE \`impressum_blocks_team_grid\`;`)
  await db.run(sql`DROP TABLE \`impressum_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`impressum\`;`)
  await db.run(sql`DROP TABLE \`datenschutz_sections_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`datenschutz_sections\`;`)
  await db.run(sql`DROP TABLE \`datenschutz_rechte\`;`)
  await db.run(sql`DROP TABLE \`datenschutz_blocks_text_image\`;`)
  await db.run(sql`DROP TABLE \`datenschutz_blocks_cta_banner\`;`)
  await db.run(sql`DROP TABLE \`datenschutz_blocks_quote\`;`)
  await db.run(sql`DROP TABLE \`datenschutz_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`datenschutz_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`datenschutz_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`datenschutz_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`datenschutz_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`datenschutz_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`datenschutz_blocks_team_grid_members\`;`)
  await db.run(sql`DROP TABLE \`datenschutz_blocks_team_grid\`;`)
  await db.run(sql`DROP TABLE \`datenschutz_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`datenschutz\`;`)
}
