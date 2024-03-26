/*
  Warnings:

  - A unique constraint covering the columns `[project_id]` on the table `users_on_classes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `project_id` to the `users_on_classes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users_on_classes` ADD COLUMN `project_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_on_classes_project_id_key` ON `users_on_classes`(`project_id`);

-- AddForeignKey
ALTER TABLE `users_on_classes` ADD CONSTRAINT `users_on_classes_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
