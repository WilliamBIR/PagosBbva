/*
  Warnings:

  - You are about to alter the column `fecha` on the `pagos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `pagos` MODIFY `fecha` VARCHAR(191) NOT NULL;
