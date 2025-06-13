-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_cardId_fkey";

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "cardId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE SET NULL ON UPDATE CASCADE;
