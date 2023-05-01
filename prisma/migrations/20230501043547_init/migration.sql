/*
  Warnings:

  - You are about to drop the `Content` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_postId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "content" JSONB NOT NULL DEFAULT '{"title": " New Post "}';

-- DropTable
DROP TABLE "Content";
