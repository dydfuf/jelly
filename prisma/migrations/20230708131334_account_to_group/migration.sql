/*
  Warnings:

  - The required column `id` was added to the `AccountToGroup` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "AccountToGroup_userId_groupId_key";

-- AlterTable
ALTER TABLE "AccountToGroup" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "AccountToGroup_pkey" PRIMARY KEY ("id");
