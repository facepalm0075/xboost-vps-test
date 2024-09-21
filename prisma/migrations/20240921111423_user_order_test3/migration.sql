/*
  Warnings:

  - You are about to drop the column `userEmail` on the `userOrders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "userOrders" DROP CONSTRAINT "userOrders_userEmail_fkey";

-- AlterTable
ALTER TABLE "userOrders" DROP COLUMN "userEmail",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "userOrders" ADD CONSTRAINT "userOrders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
