/*
  Warnings:

  - You are about to drop the `AccountToGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AccountToGroup" DROP CONSTRAINT "AccountToGroup_groupId_fkey";

-- DropForeignKey
ALTER TABLE "AccountToGroup" DROP CONSTRAINT "AccountToGroup_userId_fkey";

-- DropTable
DROP TABLE "AccountToGroup";

-- CreateTable
CREATE TABLE "UserToGroup" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "UserToGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserToGroup_userId_key" ON "UserToGroup"("userId");

-- AddForeignKey
ALTER TABLE "UserToGroup" ADD CONSTRAINT "UserToGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToGroup" ADD CONSTRAINT "UserToGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
