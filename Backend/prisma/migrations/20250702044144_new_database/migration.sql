/*
  Warnings:

  - You are about to drop the column `destinationId` on the `BuddyPair` table. All the data in the column will be lost.
  - Added the required column `destinationPairId` to the `BuddyPair` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BuddyPair" DROP CONSTRAINT "BuddyPair_destinationId_fkey";

-- AlterTable
ALTER TABLE "BuddyPair" DROP COLUMN "destinationId",
ADD COLUMN     "destinationPairId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "BuddyPair" ADD CONSTRAINT "BuddyPair_destinationPairId_fkey" FOREIGN KEY ("destinationPairId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
