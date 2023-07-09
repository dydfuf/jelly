/*
  Warnings:

  - You are about to drop the column `userHashCode` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "userHashCode";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userHashCode" TEXT;
