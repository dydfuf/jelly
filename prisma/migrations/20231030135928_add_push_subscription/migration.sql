-- CreateTable
CREATE TABLE "pushSubscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subscription" TEXT NOT NULL,

    CONSTRAINT "pushSubscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pushSubscription" ADD CONSTRAINT "pushSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
