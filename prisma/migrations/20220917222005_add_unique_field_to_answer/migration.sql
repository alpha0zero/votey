/*
  Warnings:

  - Added the required column `id` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Answer_answer_key` ON `answer`;

-- AlterTable
ALTER TABLE `answer` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
