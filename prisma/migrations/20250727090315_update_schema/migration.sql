-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "isLiked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT;
