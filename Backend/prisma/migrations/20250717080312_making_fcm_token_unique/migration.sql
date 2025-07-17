/*
  Warnings:

  - A unique constraint covering the columns `[fcmToken]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Token_fcmToken_key" ON "Token"("fcmToken");
