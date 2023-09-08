/*
  Warnings:

  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `customer`;

-- DropTable
DROP TABLE `item`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_id` VARCHAR(191) NOT NULL,
    `company_name` VARCHAR(191) NOT NULL,
    `created_user` VARCHAR(191) NOT NULL,
    `created_user_id` VARCHAR(191) NOT NULL,
    `created_date_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_pc_id` VARCHAR(191) NOT NULL,
    `modified_pc_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Company_company_id_key`(`company_id`),
    UNIQUE INDEX `Company_company_name_key`(`company_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
