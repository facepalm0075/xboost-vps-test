-- AlterTable
ALTER TABLE "boostingOrders" ADD COLUMN     "isEnabled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "games" ADD COLUMN     "isEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "showName" TEXT NOT NULL DEFAULT 'name';
