-- AlterTable
ALTER TABLE "ApplicationUser" ADD COLUMN     "confirmed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "confirmed" BOOLEAN NOT NULL DEFAULT false;
