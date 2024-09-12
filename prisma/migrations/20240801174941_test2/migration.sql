/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `games` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `homeImgSize` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeImgSrc` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeImgStyle` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "games" ADD COLUMN     "homeImgSize" JSONB NOT NULL,
ADD COLUMN     "homeImgSrc" TEXT NOT NULL,
ADD COLUMN     "homeImgStyle" JSONB NOT NULL,
ADD COLUMN     "orderId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "bgSrc" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boostingOrders" (
    "id" TEXT NOT NULL,
    "orderedInId" TEXT,
    "img" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "pageImg" TEXT NOT NULL,
    "Data" JSONB NOT NULL,
    "extraOptions" JSONB NOT NULL,
    "extraOptions2" JSONB NOT NULL,

    CONSTRAINT "boostingOrders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "games_orderId_key" ON "games"("orderId");

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boostingOrders" ADD CONSTRAINT "boostingOrders_orderedInId_fkey" FOREIGN KEY ("orderedInId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
