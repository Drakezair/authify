/*
  Warnings:

  - A unique constraint covering the columns `[api_key]` on the table `Application` will be added. If there are existing duplicate values, this will fail.
  - The required column `api_key` was added to the `Application` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "api_key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Application_api_key_key" ON "Application"("api_key");
