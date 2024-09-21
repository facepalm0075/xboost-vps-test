/*
  Warnings:

  - You are about to drop the column `userId` on the `userOrders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "userOrders" DROP CONSTRAINT "userOrders_userId_fkey";

-- AlterTable
ALTER TABLE "userOrders" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT;

-- AddForeignKey
ALTER TABLE "userOrders" ADD CONSTRAINT "userOrders_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
