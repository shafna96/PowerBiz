-- CreateTable
CREATE TABLE `UserGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_group_id` VARCHAR(191) NOT NULL,
    `user_group_name` VARCHAR(191) NOT NULL,
    `companyId` INTEGER NOT NULL,

    UNIQUE INDEX `UserGroup_user_group_id_key`(`user_group_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Module` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `module_description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Navigation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `navigation_id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `masterId` INTEGER NOT NULL,
    `level_no` INTEGER NOT NULL,
    `short_order` INTEGER NOT NULL,
    `page_url` VARCHAR(191) NOT NULL,
    `page_icon` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `moduleId` INTEGER NOT NULL,
    `is_basic` BOOLEAN NOT NULL,

    UNIQUE INDEX `Navigation_navigation_id_key`(`navigation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserGroupNavigation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userGroupId` INTEGER NOT NULL,
    `navigationId` INTEGER NOT NULL,
    `is_view` BOOLEAN NOT NULL,
    `is_edit` BOOLEAN NOT NULL,
    `is_delete` BOOLEAN NOT NULL,
    `is_create` BOOLEAN NOT NULL,
    `is_print` BOOLEAN NOT NULL,
    `companyId` INTEGER NOT NULL,
    `is_sub_exist` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserGroupSegmentRestriction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userGroupId` INTEGER NOT NULL,
    `companyId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Template` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `navigationId` INTEGER NOT NULL,
    `page_url` VARCHAR(191) NOT NULL,
    `is_default` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserGroup` ADD CONSTRAINT `UserGroup_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Navigation` ADD CONSTRAINT `Navigation_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `Module`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGroupNavigation` ADD CONSTRAINT `UserGroupNavigation_userGroupId_fkey` FOREIGN KEY (`userGroupId`) REFERENCES `UserGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGroupNavigation` ADD CONSTRAINT `UserGroupNavigation_navigationId_fkey` FOREIGN KEY (`navigationId`) REFERENCES `Navigation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGroupNavigation` ADD CONSTRAINT `UserGroupNavigation_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGroupSegmentRestriction` ADD CONSTRAINT `UserGroupSegmentRestriction_userGroupId_fkey` FOREIGN KEY (`userGroupId`) REFERENCES `UserGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGroupSegmentRestriction` ADD CONSTRAINT `UserGroupSegmentRestriction_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Template` ADD CONSTRAINT `Template_navigationId_fkey` FOREIGN KEY (`navigationId`) REFERENCES `Navigation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
