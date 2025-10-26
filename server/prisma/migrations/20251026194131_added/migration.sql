/*
  Warnings:

  - A unique constraint covering the columns `[pendingEmail]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "emailToken" TEXT,
ADD COLUMN     "pendingEmail" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_pendingEmail_key" ON "public"."users"("pendingEmail");
