-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'PAIRED', 'DECLINED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profilePicture" TEXT,
    "preferredContact" TEXT,
    "walkCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuddyRequest" (
    "id" SERIAL NOT NULL,
    "requesterId" INTEGER NOT NULL,
    "destination" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "verificationCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BuddyRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuddyPair" (
    "id" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,
    "buddyId" INTEGER NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "confirmedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BuddyPair_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BuddyPair_requestId_key" ON "BuddyPair"("requestId");

-- AddForeignKey
ALTER TABLE "BuddyRequest" ADD CONSTRAINT "BuddyRequest_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuddyPair" ADD CONSTRAINT "BuddyPair_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "BuddyRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuddyPair" ADD CONSTRAINT "BuddyPair_buddyId_fkey" FOREIGN KEY ("buddyId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
