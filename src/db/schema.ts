import { relations } from 'drizzle-orm';
import { pgTable, serial, text, timestamp, uuid, boolean, numeric, bigint, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const apps = pgTable('apps', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  packageName: text('package_name').notNull(),
  category: text('category').notNull(),
  shortDescription: text('short_description').notNull(),
  description: text('description').notNull(),
  features: text('features').array().notNull(),
  keywords: text('keywords').array().notNull(),
  minAndroid: text('min_android').notNull(),
  targetAndroid: text('target_android').notNull(),
  permissions: text('permissions').array().notNull(),
  iconUrl: text('icon_url').notNull(),
  bannerUrl: text('banner_url'),
  thumbnailUrl: text('thumbnail_url'),
  screenshots: text('screenshots').array().notNull(),
  rating: numeric('rating', { precision: 3, scale: 1 }).default('5.0').notNull(),
  downloads: bigint('downloads', { mode: 'number' }).default(0).notNull(),
  latestVersion: text('latest_version').notNull(),
  apkSize: text('apk_size').notNull(),
  apkUrl: text('apk_url').notNull(),
  featured: boolean('featured').default(false).notNull(),
  published: boolean('published').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const banners = pgTable('banners', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  subtitle: text('subtitle').notNull(),
  badgeText: text('badge_text'),
  linkUrl: text('link_url'),
  imageUrl: text('image_url').notNull(),
  displayOrder: integer('display_order').notNull(),
  active: boolean('active').default(true).notNull(),
});

export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  icon: text('icon').notNull(),
  displayOrder: integer('display_order').notNull(),
  enabled: boolean('enabled').default(true).notNull(),
});
