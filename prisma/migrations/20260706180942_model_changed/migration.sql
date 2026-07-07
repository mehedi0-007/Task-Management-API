/*
  Warnings:

  - A unique constraint covering the columns `[columnName,boardId,order]` on the table `Columns` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Columns_columnName_boardId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Columns_columnName_boardId_order_key" ON "Columns"("columnName", "boardId", "order");
