/*
  Warnings:

  - You are about to drop the column `answer` on the `vote` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `vote` DROP COLUMN `answer`;

-- CreateTable
CREATE TABLE `Answer` (
    `answer` VARCHAR(191) NOT NULL,
    `votes` INTEGER NOT NULL,
    `voteId` INTEGER NULL,

    UNIQUE INDEX `Answer_answer_key`(`answer`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_voteId_fkey` FOREIGN KEY (`voteId`) REFERENCES `Vote`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
