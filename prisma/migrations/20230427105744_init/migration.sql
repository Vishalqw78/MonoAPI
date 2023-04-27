/*
  Warnings:

  - Made the column `postId` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postId` on table `Content` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_postId_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "postId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Content" ALTER COLUMN "postId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userimg" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
