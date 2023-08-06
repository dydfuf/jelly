/*
  Warnings:

  - Added the required column `userId` to the `Memory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAllDay` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `plan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_recurringScheduleId_fkey";

-- AlterTable
ALTER TABLE "Memory" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "isAllDay" BOOLEAN NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "recurringScheduleId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "plan" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "startDate" DROP NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Memory" ADD CONSTRAINT "Memory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_recurringScheduleId_fkey" FOREIGN KEY ("recurringScheduleId") REFERENCES "RecurringSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan" ADD CONSTRAINT "plan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
