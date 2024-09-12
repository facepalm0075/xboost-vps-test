-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_orderId_fkey";

-- AlterTable
ALTER TABLE "games" ALTER COLUMN "orderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
