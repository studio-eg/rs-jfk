import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`header\` ADD \`logo_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`header\` ADD \`logo_image_alt\` text DEFAULT 'Logo der Realschule John-F.-Kennedy-Platz';`)
  await db.run(sql`CREATE INDEX \`header_logo_image_idx\` ON \`header\` (\`logo_image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_eyebrow\` text DEFAULT 'Realschule' NOT NULL,
  	\`logo_text\` text DEFAULT 'John-F.-Kennedy-Platz' NOT NULL,
  	\`secondary_button_label\` text NOT NULL,
  	\`secondary_button_href\` text NOT NULL,
  	\`secondary_button_external\` integer DEFAULT true,
  	\`primary_button_label\` text NOT NULL,
  	\`primary_button_href\` text NOT NULL,
  	\`primary_button_external\` integer DEFAULT true,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header\`("id", "logo_eyebrow", "logo_text", "secondary_button_label", "secondary_button_href", "secondary_button_external", "primary_button_label", "primary_button_href", "primary_button_external", "updated_at", "created_at") SELECT "id", "logo_eyebrow", "logo_text", "secondary_button_label", "secondary_button_href", "secondary_button_external", "primary_button_label", "primary_button_href", "primary_button_external", "updated_at", "created_at" FROM \`header\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`ALTER TABLE \`__new_header\` RENAME TO \`header\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
}
