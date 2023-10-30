/*
  Warnings:

  - Added the required column `endpoint` to the `pushSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pushSubscription" ADD COLUMN     "endpoint" TEXT NOT NULL;
