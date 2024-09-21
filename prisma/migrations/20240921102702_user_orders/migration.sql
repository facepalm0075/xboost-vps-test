-- CreateTable
CREATE TABLE "userOrders" (
    "id" TEXT NOT NULL,
    "gameName" TEXT NOT NULL,
    "boostType" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "boostDetails" JSONB NOT NULL,
    "userId" TEXT,

    CONSTRAINT "userOrders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userOrders" ADD CONSTRAINT "userOrders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
