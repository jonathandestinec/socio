/*
  Warnings:

  - You are about to drop the column `fullname` on the `Following` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `Following` table. All the data in the column will be lost.
  - You are about to drop the column `pinnedById` on the `Following` table. All the data in the column will be lost.
  - You are about to drop the column `pinnedUserId` on the `Following` table. All the data in the column will be lost.
  - You are about to drop the column `followers` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `following` on the `User` table. All the data in the column will be lost.
  - Added the required column `followerId` to the `Following` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingId` to the `Following` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Following" DROP COLUMN "fullname",
DROP COLUMN "picture",
DROP COLUMN "pinnedById",
DROP COLUMN "pinnedUserId",
ADD COLUMN     "followerId" TEXT NOT NULL,
ADD COLUMN     "followingId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "followers",
DROP COLUMN "following";

-- CreateTable
CREATE TABLE "Follower" (
    "id" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "Follower_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
