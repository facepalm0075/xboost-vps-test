-- CreateTable
CREATE TABLE "games" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "orders" JSONB NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "games_name_key" ON "games"("name");
