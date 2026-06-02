DROP TABLE IF EXISTS `oauth_accounts`;--> statement-breakpoint
DROP TABLE IF EXISTS `password_reset_tokens`;--> statement-breakpoint
DROP TABLE IF EXISTS `sessions`;--> statement-breakpoint
DROP TABLE IF EXISTS `is_email_valid`;--> statement-breakpoint
ALTER TABLE `short_link` MODIFY COLUMN `updated_at` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `short_link` MODIFY COLUMN `user_id` int NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `password` varchar(255) NOT NULL;