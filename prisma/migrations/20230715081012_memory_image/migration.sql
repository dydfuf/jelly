/*
  Warnings:

  - You are about to drop the column `imageListId` on the `Memory` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Memory` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ImageList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `location` to the `Memory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Memory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_imageListId_fkey";

-- DropForeignKey
ALTER TABLE "Memory" DROP CONSTRAINT "Memory_imageListId_fkey";

-- AlterTable
ALTER TABLE "Memory" DROP COLUMN "imageListId",
DROP COLUMN "name",
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "uploadedImageUrls" TEXT[];

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "ImageList";
