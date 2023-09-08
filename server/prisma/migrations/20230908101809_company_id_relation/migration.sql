/*
  Warnings:

  - You are about to drop the column `company_id` on the `user` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `display_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_img` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `company_id`,
    ADD COLUMN `companyId` VARCHAR(191) NOT NULL,
    ADD COLUMN `display_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_img` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`company_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
