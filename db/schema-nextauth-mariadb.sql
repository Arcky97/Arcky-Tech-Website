CREATE TABLE `users` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255),
  `email` VARCHAR(255) UNIQUE,
  `emailVerified` TIMESTAMP(3) NULL DEFAULT NULL,
  `image` VARCHAR(255),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `accounts` (
  `id` VARCHAR(255) NOT NULL PRIMARY KEY,
  `userId` VARCHAR(255) NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `provider` VARCHAR(255) NOT NULL,
  `providerAccountId` VARCHAR(255) NOT NULL,
  `refresh_token` TEXT, 
  `access_token` TEXT,
  `expires_at` INT, 
  `token_type` VARCHAR(255), 
  `scope` VARCHAR(255),
  `id_token` TEXT,
  `session_state` VARCHAR(255),
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  UNIQUE `provider_providerAccountId` (`provider`, `providerAccountId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `sessions` (
  `id` VARCHAR(255) NOT NULL PRIMARY KEY,
  `sessionToken` VARCHAR(255) NOT NULL UNIQUE,
  `userId` VARCHAR(255) NOT NULL,
  `expires` DATETIME NOT NULL,
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `verification_tokens` (
  `identifier` VARCHAR(255) NOT NULL,
  `token` VARCHAR(255) NOT NULL UNIQUE,
  `expires` DATETIME NOT NULL,
  PRIMARY KEY (`identifier`, `token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;