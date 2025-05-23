/*
  Warnings:

  - Added the required column `name` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "inCart" BOOLEAN NOT NULL DEFAULT false;
