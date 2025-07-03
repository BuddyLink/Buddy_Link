/*
  Warnings:

  - You are about to drop the column `buddyId` on the `BuddyPair` table. All the data in the column will be lost.
  - You are about to drop the column `requestId` on the `BuddyPair` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BuddyPair" DROP CONSTRAINT "BuddyPair_buddyId_fkey";

-- DropForeignKey
ALTER TABLE "BuddyPair" DROP CONSTRAINT "BuddyPair_requestId_fkey";

-- DropIndex
DROP INDEX "BuddyPair_requestId_key";

-- AlterTable
ALTER TABLE "BuddyPair" DROP COLUMN "buddyId",
DROP COLUMN "requestId";
