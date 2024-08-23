/*
  Warnings:

  - You are about to drop the column `followingId` on the `Follower` table. All the data in the column will be lost.
  - You are about to drop the column `followerId` on the `Following` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Follower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Following` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_followingId_fkey";

-- DropForeignKey
ALTER TABLE "Following" DROP CONSTRAINT "Following_followerId_fkey";

-- AlterTable
ALTER TABLE "Follower" DROP COLUMN "followingId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Following" DROP COLUMN "followerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
