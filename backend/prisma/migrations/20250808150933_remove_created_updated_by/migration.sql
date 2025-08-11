/*
  Warnings:

  - You are about to drop the column `createdById` on the `initiatives` table. All the data in the column will be lost.
  - You are about to drop the column `updatedById` on the `initiatives` table. All the data in the column will be lost.
  - Made the column `theme` on table `initiatives` required. This step will fail if there are existing NULL values in that column.
  - Made the column `context` on table `initiatives` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deliverable` on table `initiatives` required. This step will fail if there are existing NULL values in that column.
  - Made the column `evaluationCriteria` on table `initiatives` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "initiatives" DROP CONSTRAINT "initiatives_createdById_fkey";

-- DropForeignKey
ALTER TABLE "initiatives" DROP CONSTRAINT "initiatives_updatedById_fkey";

-- AlterTable
ALTER TABLE "initiatives" DROP COLUMN "createdById",
DROP COLUMN "updatedById",
ALTER COLUMN "theme" SET NOT NULL,
ALTER COLUMN "context" SET NOT NULL,
ALTER COLUMN "deliverable" SET NOT NULL,
ALTER COLUMN "evaluationCriteria" SET NOT NULL;
