/*
  Warnings:

  - You are about to drop the column `orderQuantity` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `quantityChange` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the `Recipe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_userId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "orderQuantity",
DROP COLUMN "quantityChange",
DROP COLUMN "recipeId",
ADD COLUMN     "purchaseQuantity" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Recipe";
