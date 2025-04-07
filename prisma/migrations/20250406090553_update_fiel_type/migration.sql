-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shopId` INTEGER NOT NULL,
    `printerId` INTEGER NULL,
    `name` VARCHAR(255) NOT NULL,
    `createdBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENTbunx_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `printerId`(`printerId`),
    UNIQUE INDEX `check_categories_duplicate_values`(`shopId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `currencies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `createdBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `check_currencies_duplicate_values`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shopId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `tel` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `prId` INTEGER NULL,
    `drId` INTEGER NULL,
    `villId` INTEGER NULL,
    `score` INTEGER NULL,
    `createdBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `customers_shopId_index`(`shopId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `limitUser` INTEGER NULL,
    `limitBill` INTEGER NULL,
    `limitDay` INTEGER NULL,
    `price` INTEGER NOT NULL DEFAULT 0,
    `createdBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_plan_transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `odpId` INTEGER NOT NULL,
    `shopId` INTEGER NOT NULL,
    `planId` INTEGER NOT NULL,
    `pgId` INTEGER NOT NULL,
    `currId` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `paymentStt` ENUM('pending', 'success', 'cancel') NULL DEFAULT 'pending',
    `createdBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `order_plan_ts_currId_index`(`currId`),
    INDEX `order_plan_ts_odpId_index`(`odpId`),
    INDEX `order_plan_ts_pgId_index`(`pgId`),
    INDEX `order_plan_ts_planId_index`(`planId`),
    INDEX `order_plan_ts_shopId_index`(`shopId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_plans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shopId` INTEGER NOT NULL,
    `planId` INTEGER NOT NULL,
    `start` DATETIME(3) NOT NULL,
    `end` DATETIME(3) NOT NULL,
    `createdBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `order_plans_planId_index`(`planId`),
    INDEX `order_plans_shopId_index`(`shopId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_gateways` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `permission` VARCHAR(255) NOT NULL,
    `displayName` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `permission`(`permission`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `printers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shopId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `interface` ENUM('USB', 'Ethernet', 'Blutooh') NOT NULL DEFAULT 'USB',
    `paperSize` INTEGER NOT NULL DEFAULT 58,
    `ip` VARCHAR(255) NULL,
    `port` INTEGER NULL,
    `createdBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `check_printer_duplicate_values`(`shopId`, `name`, `interface`, `paperSize`, `ip`, `port`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shopId` INTEGER NOT NULL,
    `catId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `barcode` VARCHAR(255) NULL,
    `cost` INTEGER NULL,
    `qty` INTEGER NULL DEFAULT 0,
    `price` INTEGER NOT NULL,
    `unit` ENUM('wight', 'entch') NULL,
    `isSet` BOOLEAN NULL DEFAULT false,
    `isCF` BOOLEAN NULL DEFAULT false,
    `hasStock` BOOLEAN NULL DEFAULT false,
    `pic` VARCHAR(255) NULL,
    `createdBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `products_catId_index`(`catId`),
    INDEX `products_shopId_index`(`shopId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promotions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shopId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `code` VARCHAR(255) NULL,
    `discount` INTEGER NOT NULL,
    `limitAmount` INTEGER NULL,
    `useAmount` INTEGER NULL DEFAULT 0,
    `start` DATETIME(0) NULL,
    `end` DATETIME(0) NULL,
    `createdBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `check_promotion_duplicate_values`(`shopId`, `name`, `code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rate` INTEGER NOT NULL,
    `currId` INTEGER NOT NULL,
    `shopId` INTEGER NOT NULL,
    `createdBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `rates_currId_index`(`currId`),
    INDEX `rates_shopId_index`(`shopId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shops` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` INTEGER NOT NULL,
    `currId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `tel` VARCHAR(255) NULL,
    `provinceId` INTEGER NOT NULL,
    `districtId` INTEGER NOT NULL,
    `villageId` INTEGER NOT NULL,
    `vatType` ENUM('IN', 'EXC') NULL,
    `vat` INTEGER NULL DEFAULT 0,
    `shopType` ENUM('shops', 'restaurant') NOT NULL DEFAULT 'shops',
    `status` ENUM('pending', 'verified', 'stop') NOT NULL DEFAULT 'pending',
    `pic` VARCHAR(255) NULL,
    `createdBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `shops_currId_index`(`currId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `table_zones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shopId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `createdBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `check_duplicate_zone_values`(`shopId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tables` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shopId` INTEGER NOT NULL,
    `zoneId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `createdBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `tables_zoneId_index`(`zoneId`),
    UNIQUE INDEX `table_check_duplicate_values`(`shopId`, `zoneId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shopId` INTEGER NOT NULL,
    `tsId` INTEGER NOT NULL,
    `proId` INTEGER NOT NULL,
    `qty` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `subTotal` INTEGER NOT NULL,
    `discount` INTEGER NULL,
    `disVal` INTEGER NULL,
    `total` INTEGER NOT NULL,
    `printStt` ENUM('pending', 'complete') NULL,
    `paymentStt` ENUM('pending', 'success', 'cancel') NULL,
    `comment` VARCHAR(255) NULL,
    `createdBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `ts_details_proId_index`(`proId`),
    INDEX `ts_details_shopId_index`(`shopId`),
    INDEX `ts_details_tsId_index`(`tsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction_payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tsId` INTEGER NOT NULL,
    `currId` INTEGER NOT NULL,
    `pgId` INTEGER NOT NULL,
    `rate` INTEGER NULL,
    `total` INTEGER NOT NULL,
    `createdBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `ts_payments_currId_index`(`currId`),
    INDEX `ts_payments_pgId_index`(`pgId`),
    INDEX `ts_payments_tsId_index`(`tsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shopId` INTEGER NOT NULL,
    `pgId` INTEGER NOT NULL,
    `tableId` INTEGER NOT NULL,
    `cusId` INTEGER NULL,
    `promoId` INTEGER NULL,
    `billNumber` VARCHAR(255) NOT NULL,
    `subTotal` INTEGER NOT NULL,
    `discount` INTEGER NULL,
    `disVal` INTEGER NULL,
    `sercharge` INTEGER NULL,
    `serVal` INTEGER NULL,
    `vat` INTEGER NULL,
    `vatVal` INTEGER NULL,
    `total` INTEGER NOT NULL,
    `moneyRecv` INTEGER NULL,
    `moneyChg` INTEGER NULL,
    `people` INTEGER NULL,
    `printStt` ENUM('pending', 'complete') NULL DEFAULT 'pending',
    `paymentStt` ENUM('pending', 'success', 'cancel') NULL DEFAULT 'pending',
    `tsType` ENUM('income', 'expen') NOT NULL,
    `comment` VARCHAR(255) NULL,
    `createdBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `ts_pgId_index`(`pgId`),
    INDEX `ts_promoId_index`(`promoId`),
    INDEX `ts_shopId_index`(`shopId`),
    INDEX `ts_tableId_index`(`tableId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` INTEGER NOT NULL,
    `permisId` INTEGER NOT NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `user_permissions_permisId_index`(`permisId`),
    INDEX `user_permissions_uid_index`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `language` (
    `lang_id` INTEGER NOT NULL AUTO_INCREMENT,
    `language` VARCHAR(255) NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`lang_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`shopId`) REFERENCES `shops`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categories_ibfk_2` FOREIGN KEY (`printerId`) REFERENCES `printers`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`shopId`) REFERENCES `shops`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `order_plan_transactions` ADD CONSTRAINT `order_plan_transactions_ibfk_1` FOREIGN KEY (`odpId`) REFERENCES `order_plans`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `order_plan_transactions` ADD CONSTRAINT `order_plan_transactions_ibfk_2` FOREIGN KEY (`shopId`) REFERENCES `shops`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `order_plan_transactions` ADD CONSTRAINT `order_plan_transactions_ibfk_3` FOREIGN KEY (`planId`) REFERENCES `plans`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `order_plan_transactions` ADD CONSTRAINT `order_plan_transactions_ibfk_4` FOREIGN KEY (`pgId`) REFERENCES `payment_gateways`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `order_plan_transactions` ADD CONSTRAINT `order_plan_transactions_ibfk_5` FOREIGN KEY (`currId`) REFERENCES `currencies`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `order_plans` ADD CONSTRAINT `order_plans_ibfk_1` FOREIGN KEY (`shopId`) REFERENCES `shops`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `order_plans` ADD CONSTRAINT `order_plans_ibfk_2` FOREIGN KEY (`planId`) REFERENCES `plans`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `printers` ADD CONSTRAINT `printers_ibfk_1` FOREIGN KEY (`shopId`) REFERENCES `shops`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`shopId`) REFERENCES `shops`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`catId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `promotions` ADD CONSTRAINT `promotions_ibfk_1` FOREIGN KEY (`shopId`) REFERENCES `shops`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rates` ADD CONSTRAINT `rates_ibfk_1` FOREIGN KEY (`currId`) REFERENCES `currencies`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rates` ADD CONSTRAINT `rates_ibfk_2` FOREIGN KEY (`shopId`) REFERENCES `shops`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `shops` ADD CONSTRAINT `shops_ibfk_1` FOREIGN KEY (`currId`) REFERENCES `currencies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `table_zones` ADD CONSTRAINT `table_zones_ibfk_1` FOREIGN KEY (`shopId`) REFERENCES `shops`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tables` ADD CONSTRAINT `tables_ibfk_1` FOREIGN KEY (`shopId`) REFERENCES `shops`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tables` ADD CONSTRAINT `tables_ibfk_2` FOREIGN KEY (`zoneId`) REFERENCES `table_zones`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `transaction_details` ADD CONSTRAINT `transaction_details_ibfk_1` FOREIGN KEY (`shopId`) REFERENCES `shops`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `transaction_details` ADD CONSTRAINT `transaction_details_ibfk_2` FOREIGN KEY (`tsId`) REFERENCES `transactions`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `transaction_details` ADD CONSTRAINT `transaction_details_ibfk_3` FOREIGN KEY (`proId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `transaction_payments` ADD CONSTRAINT `transaction_payments_ibfk_1` FOREIGN KEY (`tsId`) REFERENCES `transactions`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `transaction_payments` ADD CONSTRAINT `transaction_payments_ibfk_2` FOREIGN KEY (`currId`) REFERENCES `currencies`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `transaction_payments` ADD CONSTRAINT `transaction_payments_ibfk_3` FOREIGN KEY (`pgId`) REFERENCES `payment_gateways`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`shopId`) REFERENCES `shops`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`pgId`) REFERENCES `payment_gateways`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`tableId`) REFERENCES `tables`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_ibfk_4` FOREIGN KEY (`promoId`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_permissions` ADD CONSTRAINT `user_permissions_ibfk_2` FOREIGN KEY (`permisId`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
