/*
  Warnings:

  - Added the required column `createdAt` to the `Task_Act` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task_Act" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;
