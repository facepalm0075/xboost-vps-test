/*
  Warnings:

  - The primary key for the `userOrders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `userOrders` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(11)`.

*/
-- AlterTable
ALTER TABLE "userOrders" DROP CONSTRAINT "userOrders_pkey",
ALTER COLUMN "id" SET DEFAULT nanoid(),
ALTER COLUMN "id" SET DATA TYPE VARCHAR(11),
ADD CONSTRAINT "userOrders_pkey" PRIMARY KEY ("id");
