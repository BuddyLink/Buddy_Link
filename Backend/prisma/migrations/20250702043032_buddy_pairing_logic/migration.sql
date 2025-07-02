/*
  Warnings:

  - You are about to drop the column `destination` on the `BuddyRequest` table. All the data in the column will be lost.
  - You are about to drop the column `verificationCode` on the `BuddyRequest` table. All the data in the column will be lost.
  - Added the required column `classification` to the `BuddyPair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `BuddyPair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationId` to the `BuddyPair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `BuddyPair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `major` to the `BuddyPair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `BuddyPair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferredContact` to the `BuddyPair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePic` to the `BuddyPair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `BuddyPair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `BuddyPair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walkCount` to the `BuddyPair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `BuddyRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationId` to the `BuddyRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meetingPointId` to the `BuddyRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BuddyPair" ADD COLUMN     "classification" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "destinationId" INTEGER NOT NULL,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "locationId" INTEGER NOT NULL,
ADD COLUMN     "major" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "preferredContact" TEXT NOT NULL,
ADD COLUMN     "profilePic" TEXT NOT NULL,
ADD COLUMN     "surname" TEXT NOT NULL,
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "walkCount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "BuddyRequest" DROP COLUMN "destination",
DROP COLUMN "verificationCode",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "destinationId" INTEGER NOT NULL,
ADD COLUMN     "meetingPointId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "BuddyRequest" ADD CONSTRAINT "BuddyRequest_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuddyRequest" ADD CONSTRAINT "BuddyRequest_meetingPointId_fkey" FOREIGN KEY ("meetingPointId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuddyPair" ADD CONSTRAINT "BuddyPair_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuddyPair" ADD CONSTRAINT "BuddyPair_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
